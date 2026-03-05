import type { FunctionComponent } from "react"
import styled from "styled-components"

const Title = styled.h3`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: ${({theme}) => theme.fonts.default};
    font-weight: 700;
    font-size: 1.5rem;
    color: ${({theme}) => theme.colors.text};
`

interface FormTitleProps {
    text : string
}

const FormTitle : FunctionComponent<FormTitleProps> = ({ text }) => {
    return (
        <Title>
            {text}
        </Title>
    )
}

export default FormTitle;