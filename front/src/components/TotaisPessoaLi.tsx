import type { FunctionComponent } from "react";
import type { TotaisPessoa } from "../@types/api/pessoa"
import styled from "styled-components";

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
    justify-content: center;
    align-items: center;
    overflow: scroll;
    font-family: ${({theme}) => theme.fonts.default};
    color: ${({theme}) => theme.colors.text};
    white-space: nowrap;
`

interface TotaisPessoaLiProps {
    totais: TotaisPessoa
}

const TotaisPessoaLi : FunctionComponent<TotaisPessoaLiProps> = ({ totais }) => {
    return (
        <Container>
            {/* <Wrapper style={{justifyContent: 'start'}}>{totais.id}</Wrapper> */}
            <Wrapper>{totais.nome}</Wrapper>
            <Wrapper>{totais.idade}</Wrapper>
            <Wrapper>{totais.receitas}</Wrapper>
            <Wrapper>{totais.despesas}</Wrapper>
            <Wrapper>{totais.saldo}</Wrapper>
        </Container>
    )
};

export default TotaisPessoaLi;