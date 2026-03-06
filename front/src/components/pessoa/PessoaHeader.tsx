import type { FunctionComponent } from "react";
import styled from "styled-components";

const Container = styled.div`
    padding: 0 1.5rem;
    width: 100%;
    min-height: 3rem;
    border-bottom: solid 1px ${({theme}) => theme.colors.surface};
    display: flex;
    gap: 3rem;
`

const Info = styled.div`
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    overflow: scroll;
    font-family: ${({theme}) => theme.fonts.default};
    font-size: 0.8rem;
    font-weight: 700;
    color: ${({theme}) => theme.colors.text};
    white-space: nowrap;
`

const PessoaHeader : FunctionComponent = () => {
    return (
        <Container>
            <Info>ID</Info>
            <Info>Nome</Info>
            <Info>Idade</Info>
            <Info>Criado em</Info>
            <Info></Info>
        </Container>
    )
};

export default PessoaHeader;