import { useEffect, useState, type FunctionComponent } from "react";
import styled from "styled-components";
import FormTitle from "../shared/FormTitle";
import FormInput from "../shared/FormInput";
import PageBtn from "../shared/PageBtn";
import { IoMdClose } from "react-icons/io";
import type { Categoria } from "../../@types/api/categoria";
import FormSelect from "../shared/FormSelect";
import type { Transacao } from "../../@types/api/transacao";
import { type Pessoa } from "../../@types/api/pessoa";
import { recuperarPessoas } from "../../services/pessoaService";
import { criarTransacao } from "../../services/transacaoService";
import { recuperarCategorias } from "../../services/categoriaService";
import FormErrorMessage from "../shared/FormErrorMessage";

const Container = styled.div`
    position: absolute;
    top: 12.5%;
    left: 25%;
    padding: 8% 0;
    width: 50%;
    height: 75%;
    border: solid 1px ${({theme}) => theme.colors.surface};
    border-radius: 1rem;
    background: ${({theme}) => theme.colors.background};
    box-shadow: 0px 0px 25px 0px rgba(0,0,0,0.2);
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    gap: 8%;
    overflow: scroll;

    .close-btn {
        width: 1.2rem;
        height: 1.2rem;
        position: absolute;
        top: 5%;
        right: 5%;
        border-radius: 50%;
        transition: background-color 0.3s ease-out;
        color: ${({theme}) => theme.colors.text};
        cursor: pointer;

        &:hover {
            background-color: ${({theme}) => theme.colors.surface};
        }
    }
`

interface TransacaoAddFormProps {
    setTransacoes: React.Dispatch<React.SetStateAction<Transacao[]>>,
    setPopUp: React.Dispatch<React.SetStateAction<"adicionar" | undefined>>,
}

const TransacaoAddForm : FunctionComponent<TransacaoAddFormProps> = ({ setTransacoes, setPopUp }) => {
    const [descricao, setDescricao] = useState<string>('');
    const [tipo, setTipo] = useState<'receita' | 'despesa'>('receita');
    const [valor, setValor] = useState<string>('');
    const [categoriaId, setCategoriaId] = useState<string>('');
    const [pessoaId, setPessoaId] = useState<string>('');
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [pessoas, setPessoas] = useState<Pessoa[]>([]);
    const [descricaoWarningMessage, setDescricaoWarningMessage] = useState<string>();
    const [valorWarningMessage, setValorWarningMessage] = useState<string>();
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>();

    const disabledCondition = !!descricaoWarningMessage || !!valorWarningMessage || isFetching || descricao === '' || valor === '' || categoriaId === '' || pessoaId === '';

    useEffect(() => {
        setIsFetching(true);
        try {
            recuperarCategorias().then(data => {
                setCategorias(data);
                setCategoriaId(data.length > 0 ? data[0].id : '');
            });
            recuperarPessoas().then(data => {
                setPessoas(data);
                setPessoaId(data.length > 0 ? data[0].id : '');
            });
        } catch(err) {
            console.log(err)
        } finally {
            setIsFetching(false);
        }
    }, []);

    return (
        <Container>
            <IoMdClose className="close-btn" onClick={() => setPopUp(undefined)}/>
            <FormTitle text="Adicionar transação"/>
            <FormInput label="Descrição" value={descricao} onChange={(e) => {
                const value = e.target.value;
                setDescricao(value);
                if(value === ''){
                    setDescricaoWarningMessage('A descrição não pode ser vazia.');
                    return;
                }
                setDescricaoWarningMessage(undefined);
            }} warningMessage={descricaoWarningMessage} disabled={isFetching}/>
            <FormSelect label="Tipo" values={[{ value: 'receita' }, { value: 'despesa' }]} onChange={(e) => {
                switch(e.target.value){
                    case 'receita':
                        setTipo('receita');
                        break;
                    case 'despesa':
                        setTipo('despesa');
                        break;
                    default:
                        console.log("Erro ao setar tipo.");
                }
            }} disabled={isFetching}/>
            <FormInput label="Valor" value={valor} onChange={(e) => {
                const value = e.target.value;
                setValor(value);
                const parsedValue = parseInt(value);
                if(Number.isNaN(parsedValue) || parsedValue <= 0){
                    setValorWarningMessage("O valor deve ser um número maior que 0.");
                    return;
                }
                setValorWarningMessage(undefined);
            }} warningMessage={valorWarningMessage} disabled={isFetching}/>
            <FormSelect label="Pessoa" values={pessoas.map(p => { return { value: p.nome, displayValue: `${p.nome} - ${p.idade} anos` }})} onChange={(e) => {
                const pessoa = pessoas.find(p => p.nome === e.target.value);
                if(!pessoa){
                    console.log("Erro ao setar pessoa.")
                    return;
                }
                setPessoaId(pessoa.id);
            }} disabled={isFetching}/>
            <FormSelect label="Categoria" values={categorias.map(c => { return { value: c.descricao, displayValue: `${c.descricao} - ${c.finalidade}` }})} onChange={(e) => {
                const categoria = categorias.find(c => c.descricao === e.target.value);
                if(!categoria){
                    console.log("Erro ao setar categoria.")
                    return;
                }
                setCategoriaId(categoria.id);
            }} disabled={isFetching}/>
            <FormErrorMessage message={errorMessage}/>
            <PageBtn width="80%" variant="colored" fontWeight={700} text="Adicionar" onClick={() => {
                if(disabledCondition) return;
                setIsFetching(true);
                criarTransacao({ descricao, valor: Number(valor), tipo, categoriaId, pessoaId })
                    .then((transacao) => {
                        setErrorMessage(undefined);
                        setTransacoes(prev => [transacao, ...prev]);
                    })
                    .catch(err => setErrorMessage(err.message))
                    .finally(() => {
                        setDescricao('');
                        setValor('');
                        setIsFetching(false);
                    });
            }} disabled={disabledCondition}/>
        </Container>
    )
}

export default TransacaoAddForm;