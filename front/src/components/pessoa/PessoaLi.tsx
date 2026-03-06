import { useState, type FunctionComponent } from "react"
import type { Pessoa } from "../../@types/api/pessoa"
import styled from "styled-components";
import { FiEdit2, FiTrash } from "react-icons/fi";
import { deletarPessoa } from "../../services/pessoaService";

const Container = styled.div`
    padding: 0 1.5rem;
    width: 100%;
    min-height: 3rem;
    border-bottom: solid 1px ${({theme}) => theme.colors.surface};
    display: flex;
    gap: 3rem;
`

const Wrapper = styled.div`
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    overflow: scroll;
    font-family: ${({theme}) => theme.fonts.default};
    color: ${({theme}) => theme.colors.text};
    white-space: nowrap;

    .btn {
        cursor: pointer;
    }
`

interface PessoaLiProps {
    pessoa: Pessoa,
    setTargetPessoa: React.Dispatch<React.SetStateAction<Pessoa | undefined>>,
    setPessoas: React.Dispatch<React.SetStateAction<Pessoa[]>>,
    setPopUp: React.Dispatch<React.SetStateAction<"adicionar" | "editar" | undefined>>
}

const PessoaLi : FunctionComponent<PessoaLiProps> = ({ pessoa, setTargetPessoa, setPessoas, setPopUp }) => {
    const [isFetching, setIsFetching] = useState<boolean>(false);

    return (
        <Container>
            <Wrapper style={{justifyContent: 'start'}}>{pessoa.id}</Wrapper>
            <Wrapper>{pessoa.nome}</Wrapper>
            <Wrapper>{pessoa.idade}</Wrapper>
            <Wrapper>{pessoa.criadoEm.substring(0, 10)}</Wrapper>
            <Wrapper style={{justifyContent: 'space-evenly'}}>
                <FiEdit2 className="btn" onClick={() => {
                    setTargetPessoa(pessoa);
                    setPopUp('editar');
                }}/>
                <FiTrash className="btn" onClick={() => {
                    if(isFetching) return;
                    deletarPessoa(pessoa.id)
                        .then(() => setPessoas(prev => prev.filter(p => p.id != pessoa.id)))
                        .catch(err => console.log(err))
                        .finally(() => setIsFetching(false));
                }}/>
            </Wrapper>
        </Container>
    )
};

export default PessoaLi;