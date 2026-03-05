import { useState, type FunctionComponent } from "react";
import styled from "styled-components";
import FormTitle from "./FormTitle";
import FormInput from "./FormInput";
import PageBtn from "./PageBtn";
import { IoMdClose } from "react-icons/io";
import { criarPessoa } from "../services/pessoaService";
import type { Pessoa } from "../@types/api/pessoa";

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

interface PessoaAddFormProps {
    setPessoas: React.Dispatch<React.SetStateAction<Pessoa[]>>,
    setPopUp: React.Dispatch<React.SetStateAction<"adicionar" | "editar" | undefined>>,
    setListOption: React.Dispatch<React.SetStateAction<"pessoas" | "totais">>
}

const PessoaAddForm : FunctionComponent<PessoaAddFormProps> = ({ setPessoas, setPopUp, setListOption }) => {
    const [nome, setNome] = useState<string>('');
    const [idade, setIdade] = useState<string>('');
    const [warningMessage, setWarningMessage] = useState<string>();
    const [isFetching, setIsFetching] = useState<boolean>(false);

    return (
        <Container>
            <IoMdClose className="close-btn" onClick={() => setPopUp(undefined)}/>
            <FormTitle text="Adicionar pessoa"/>
            <FormInput label="Nome" value={nome} onChange={(e) => setNome(e.target.value)} disabled={isFetching}/>
            <FormInput label="Idade" value={idade} onChange={(e) => {
                const value = e.target.value;
                setIdade(value);
                const parsedValue = parseInt(value);
                if(Number.isNaN(parsedValue) || parsedValue <= 0){
                    setWarningMessage("A idade deve ser um inteiro maior que 0.");
                    return;
                }
                setWarningMessage(undefined);
            }} warningMessage={warningMessage} disabled={isFetching}/>
            <PageBtn width="80%" variant="colored" fontWeight={700} text="Adicionar" onClick={() => {
                if(!!warningMessage || isFetching) return;
                setIsFetching(true);
                criarPessoa({ nome: nome, idade: Number(idade) })
                    .then((pessoa) => setPessoas(prev => [pessoa, ...prev]))
                    .catch(err => console.log(err))
                    .finally(() => {
                        setNome('');
                        setIdade('');
                        setIsFetching(false);
                        setListOption('pessoas');
                    });
            }} disabled={!!warningMessage || isFetching}/>
        </Container>
    )
}

export default PessoaAddForm;