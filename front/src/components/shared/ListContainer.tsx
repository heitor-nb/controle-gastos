import type { FunctionComponent, ReactNode } from "react";
import styled from "styled-components";

const Container = styled.div`
    display: relative;
    width: 100%;
    height: calc(100% - 4.5rem);
    border: solid 1px ${({theme}) => theme.colors.surface};
    border-radius: 0.5rem;
    background: ${({theme}) => theme.colors.background};
    display: flex;
    flex-direction: column;
    overflow: scroll;
` 

interface ListContainerProps {
    children: ReactNode
}

const ListContainer : FunctionComponent<ListContainerProps> = ({ children }) => {
    return (
        <Container>
            {children}
        </Container>
    )
}

export default ListContainer;