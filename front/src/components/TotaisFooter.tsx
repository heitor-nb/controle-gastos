import type { FunctionComponent } from "react";
import styled from "styled-components";

const Container = styled.div`
    padding: 0 1.5rem;
    width: 100%;
    min-height: 3rem;
    background: ${({theme}) => theme.colors.surface};
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
    font-weight: 700;
    color: ${({theme}) => theme.colors.text};
    white-space: nowrap;
`

interface TotaisFooterProps {
    receitas: number,
    despesas: number,
    saldo: number
}

const TotaisFooter : FunctionComponent<TotaisFooterProps> = ({ receitas, despesas, saldo }) => {
    const labelStyle = { fontStyle: "italic" };

    return (
        <Container>
            <Wrapper></Wrapper>
            <Wrapper style={labelStyle}>Total</Wrapper>
            <Wrapper>{receitas}</Wrapper>
            <Wrapper>{despesas}</Wrapper>
            <Wrapper>{saldo}</Wrapper>
        </Container>
    )
};

export default TotaisFooter;