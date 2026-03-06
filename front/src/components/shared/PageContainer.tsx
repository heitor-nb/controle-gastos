import type { FunctionComponent, ReactNode } from "react";
import styled from "styled-components";

const Container = styled.div`
    padding: 1rem 2rem;
    width: 80%;
    height: 100%;
    border-radius: 0 0.5rem 0.5rem 0;
    background: linear-gradient(150deg, rgba(255, 255, 255, 0) 50%, rgba(173, 255, 47, 0.5) 100%);
    display: flex;
    flex-direction: column;
`
const Title = styled.h2`
    width: 100%;
    height: 2rem;
    display: flex;
    justify-content: start;
    font-family: ${({theme}) => theme.fonts.default};
    color: ${({theme}) => theme.colors.text};
    font-weight: 700;
    font-size: 2rem;
`

interface PageContainerProps {
    title: 'Pessoas' | 'Categorias' | 'Transações',
    children: ReactNode
};

const PageContainer : FunctionComponent<PageContainerProps> = ({ title, children }) => {
    return (
        <Container>
            <Title>{title}</Title>
            {children}
        </Container>
    )
}

export default PageContainer;
