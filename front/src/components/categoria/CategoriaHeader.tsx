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

interface CategoriaHeaderProps {
    labels: string[]
}

const CategoriaHeader : FunctionComponent<CategoriaHeaderProps> = ({ labels }) => {
    return (
        <Container>
            {(labels.map((l, index) => <Info key={index}>{l}</Info>))}
        </Container>
    )
};

export default CategoriaHeader;