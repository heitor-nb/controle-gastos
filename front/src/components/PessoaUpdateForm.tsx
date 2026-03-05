import { useState, type FunctionComponent } from "react";
import styled from "styled-components";
import FormTitle from "./FormTitle";
import FormInput from "./FormInput";
import PageBtn from "./PageBtn";
import { IoMdClose } from "react-icons/io";
import type { Pessoa } from "../@types/api/pessoa";
import { editarPessoa } from "../services/pessoaService";

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

interface PessoaUpdateFormProps {
    pessoa: Pessoa | undefined,
    setTargetPessoa: React.Dispatch<React.SetStateAction<Pessoa | undefined>>,
    setPessoas: React.Dispatch<React.SetStateAction<Pessoa[]>>,
    setPopUp: React.Dispatch<React.SetStateAction<"adicionar" | "editar" | undefined>>
}

const PessoaUpdateForm : FunctionComponent<PessoaUpdateFormProps> = ({ pessoa, setTargetPessoa, setPessoas, setPopUp }) => {
    const [nome, setNome] = useState<string>(pessoa?.nome ?? '');
    const [idade, setIdade] = useState<string>(pessoa?.idade.toString() ?? '');
    const [warningMessage, setWarningMessage] = useState<string>();
    const [isFetching, setIsFetching] = useState<boolean>(false);

    return pessoa && (
        <Container>
            <IoMdClose className="close-btn" onClick={() => setPopUp(undefined)}/>
            <FormTitle text="Editar pessoa"/>
            <FormInput label="Nome" value={nome} placeholder={pessoa.nome} onChange={(e) => setNome(e.target.value)} disabled={isFetching}/>
            <FormInput label="Idade" value={idade} placeholder={pessoa.idade.toString()} onChange={(e) => {
                const value = e.target.value;
                setIdade(value);
                const parsedValue = parseInt(value);
                if(Number.isNaN(parsedValue) || parsedValue <= 0){
                    setWarningMessage("A idade deve ser um inteiro maior que 0.");
                    return;
                }
                setWarningMessage(undefined);
            }} warningMessage={warningMessage} disabled={isFetching}/>
            <PageBtn width="80%" variant="colored" fontWeight={700} text="Editar" onClick={() => {
                if(!!warningMessage || isFetching) return;
                setIsFetching(true);
                editarPessoa({ id: pessoa.id, nome: nome, idade: Number(idade) })
                    .then((pessoa) => setPessoas(prev => prev.map(p => {
                        if(p.id === pessoa.id) return pessoa;
                        return p;
                    })))
                    .catch(err => console.log(err))
                    .finally(() => {;
                        setIsFetching(false)
                        setTargetPessoa(undefined)
                        setPopUp(undefined);
                    });
            }} disabled={!!warningMessage || isFetching}/>
        </Container>
    )
}

export default PessoaUpdateForm;