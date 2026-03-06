import { useState, type FunctionComponent } from "react";
import styled from "styled-components";
import FormTitle from "../shared/FormTitle";
import FormInput from "../shared/FormInput";
import PageBtn from "../shared/PageBtn";
import { IoMdClose } from "react-icons/io";
import { criarPessoa } from "../../services/pessoaService";
import type { Pessoa } from "../../@types/api/pessoa";
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

interface PessoaAddFormProps {
    setPessoas: React.Dispatch<React.SetStateAction<Pessoa[]>>,
    setPopUp: React.Dispatch<React.SetStateAction<"adicionar" | "editar" | undefined>>,
    setListOption: React.Dispatch<React.SetStateAction<"pessoas" | "totais">>
}

const PessoaAddForm : FunctionComponent<PessoaAddFormProps> = ({ setPessoas, setPopUp, setListOption }) => {
    const [nome, setNome] = useState<string>('');
    const [idade, setIdade] = useState<string>('');
    const [nomeWarningMessage, setNomeWarningMessage] = useState<string>();
    const [idadeWarningMessage, setIdadeWarningMessage] = useState<string>();
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>();

    const disabledCondition = !!nomeWarningMessage || !!idadeWarningMessage || isFetching || nome === '' || idade === ''; 

    return (
        <Container>
            <IoMdClose className="close-btn" onClick={() => setPopUp(undefined)}/>
            <FormTitle text="Adicionar pessoa"/>
            <FormInput label="Nome" value={nome} onChange={(e) => {
                const value = e.target.value;
                setNome(value);
                if(value === ''){
                    setNomeWarningMessage('O nome não pode ser vazio.');
                    return;
                }
                setNomeWarningMessage(undefined);
            }} warningMessage={nomeWarningMessage} disabled={isFetching}/>
            <FormInput label="Idade" value={idade} onChange={(e) => {
                const value = e.target.value;
                setIdade(value);
                const parsedValue = parseInt(value);
                if(Number.isNaN(parsedValue) || parsedValue <= 0 || parsedValue > 100){
                    setIdadeWarningMessage("A idade deve ser um inteiro entre 1 e 100.");
                    return;
                }
                setIdadeWarningMessage(undefined);
            }} warningMessage={idadeWarningMessage} disabled={isFetching}/>
            <FormErrorMessage message={errorMessage}/>
            <PageBtn width="80%" variant="colored" fontWeight={700} text="Adicionar" onClick={() => {
                if(disabledCondition) return;
                setIsFetching(true);
                criarPessoa({ nome: nome, idade: Number(idade) })
                    .then((pessoa) => {
                        setErrorMessage(undefined);
                        setPessoas(prev => [pessoa, ...prev]);
                    })
                    .catch(err => setErrorMessage(err.message))
                    .finally(() => {
                        setNome('');
                        setIdade('');
                        setIsFetching(false);
                        setListOption('pessoas');
                    });
            }} disabled={disabledCondition}/>
        </Container>
    )
}

export default PessoaAddForm;