import type { FunctionComponent } from "react";
import styled from "styled-components";

const Container = styled.div`
    padding: 0 1.5rem;
    width: 68rem;
    min-height: 3rem;
    border-bottom: solid 1px ${({theme}) => theme.colors.surface};
    display: flex;
    gap: 1.5rem;
`

const Info = styled.div`
    min-width: 8rem;
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

const TransacaoHeader : FunctionComponent = () => {
    return (
        <Container>
            <Info>ID</Info>
            <Info>Descrição</Info>
            <Info>Tipo</Info>
            <Info>Valor</Info>
            <Info>Criado em</Info>
            <Info>Categoria</Info>
            <Info>Pessoa</Info>
        </Container>
    )
};

export default TransacaoHeader;