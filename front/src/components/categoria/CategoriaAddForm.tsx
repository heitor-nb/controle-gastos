import { useState, type FunctionComponent } from "react";
import styled from "styled-components";
import FormTitle from "../shared/FormTitle";
import FormInput from "../shared/FormInput";
import PageBtn from "../shared/PageBtn";
import { IoMdClose } from "react-icons/io";
import type { Categoria } from "../../@types/api/categoria";
import FormSelect from "../shared/FormSelect";
import { criarCategoria } from "../../services/categoriaService";
import FormErrorMessage from "../shared/FormErrorMessage";

const Container = styled.div`
    position: absolute;
    top: 12.5%;
    left: 25%;
    width: 50%;
    height: 75%;
    border: solid 1px ${({theme}) => theme.colors.surface};
    border-radius: 1rem;
    background: ${({theme}) => theme.colors.background};
    box-shadow: 0px 0px 25px 0px rgba(0,0,0,0.2);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8%;

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

interface CategoriaAddFormProps {
    setCategorias: React.Dispatch<React.SetStateAction<Categoria[]>>,
    setPopUp: React.Dispatch<React.SetStateAction<"adicionar" | undefined>>,
    setListOption: React.Dispatch<React.SetStateAction<"categorias" | "totais">>
}

const CategoriaAddForm : FunctionComponent<CategoriaAddFormProps> = ({ setCategorias, setPopUp, setListOption }) => {
    const [descricao, setDescricao] = useState<string>('');
    const [finalidade, setFinalidade] = useState<'receita' | 'despesa' | 'ambos'>('receita');
    const [descricaoWarningMessage, setDescricaoWarningMessage] = useState<string>();
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>();

    const disabledCondition = !!descricaoWarningMessage || isFetching || descricao === ''; 

    return (
        <Container>
            <IoMdClose className="close-btn" onClick={() => setPopUp(undefined)}/>
            <FormTitle text="Adicionar categoria"/>
            <FormInput label="Descrição" value={descricao} onChange={(e) => {
                const value = e.target.value;
                setDescricao(value);
                if(value === ''){
                    setDescricaoWarningMessage('A descrição não pode ser vazia.');
                    return;
                }
                setDescricaoWarningMessage(undefined);
            }} warningMessage={descricaoWarningMessage} disabled={isFetching}/>
            <FormSelect label="Finalidade" values={[{ value: 'receita' }, { value: 'despesa' }, { value: 'ambos' }]} onChange={(e) => {
                switch(e.target.value){
                    case 'receita':
                        setFinalidade('receita');
                        break;
                    case 'despesa':
                        setFinalidade('despesa');
                        break;
                    case 'ambos':
                        setFinalidade('ambos');
                        break;
                    default:
                        console.log("Erro ao setar finalidade.");
                }
            }} disabled={isFetching}/>
            <FormErrorMessage message={errorMessage}/>
            <PageBtn width="80%" variant="colored" fontWeight={700} text="Adicionar" onClick={() => {
                if(disabledCondition) return;
                setIsFetching(true);
                criarCategoria({ descricao, finalidade })
                    .then((categoria) => {
                        setErrorMessage(undefined);
                        setCategorias(prev => [categoria, ...prev]);
                    })
                    .catch(err => setErrorMessage(err.message))
                    .finally(() => {
                        setDescricao('');
                        setIsFetching(false);
                        setListOption('categorias');
                    });
            }} disabled={disabledCondition}/>
        </Container>
    )
}

export default CategoriaAddForm;