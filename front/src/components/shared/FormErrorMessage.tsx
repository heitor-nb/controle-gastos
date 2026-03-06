import type { FunctionComponent } from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 80%;
    min-height: 0.6rem;
    font-family: ${({theme}) => theme.fonts.default};
    color: ${({theme}) => theme.colors.text};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.6rem;
    font-weight: 700;
    color: red;
    text-align: start;
`

interface FormErrorMessageProps {
    message?: string
}

const FormErrorMessage : FunctionComponent<FormErrorMessageProps> = ({ message }) => {
    return (
        <Container>{message}</Container>
    )
}

export default FormErrorMessage;