import type { FunctionComponent } from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 80%;
    height: 100%;
    border-radius: 0 0.5rem 0.5rem 0;
    background: linear-gradient(150deg, rgba(255, 255, 255, 0) 50%, rgba(173, 255, 47, 0.5) 100%);
`
const Title = styled.h2`
    padding: 1rem 2rem;
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: start;
    align-items: bottom;
    font-family: ${({theme}) => theme.fonts.default };
    color: ${({theme}) => theme.colors.text};
    font-weight: 700;
    font-size: 2rem;
`

interface PageContainerProps {
    title: 'Pessoas' | 'Categorias' | 'Transações'
};

const PageContainer : FunctionComponent<PageContainerProps> = ({ title }) => {
    return (
        <Container>
            <Title>{title}</Title>
        </Container>
    )
}

export default PageContainer;
