import type { FunctionComponent } from "react";
import styled, { useTheme } from "styled-components";

const Container = styled.div`
    position: relative;
    width: 80%;
    font-family: ${({theme}) => theme.fonts.default};
    color: ${({theme}) => theme.colors.text};
`

const Warning = styled.div`
    position: absolute;
    top: 0.2rem;
    right: 0.5rem;
    font-size: 0.6rem;
    font-weight: 700;
    color: red;
`

const Label = styled.label`
    position: absolute;
    top: 0;
    left: 0.5rem;
    font-size: 0.8rem;
    font-weight: 700;
`

const Input = styled.input`
    margin-top: 1.2rem;
    padding-left: 0.5rem;
    width: 100%;
    min-height: 3rem;
    border: solid 1px ${({theme}) => theme.colors.text};
    border-radius: 0.5rem;
    transition: border-color 0.1s ease-out;
    text-align: start;

    &:focus {
        outline: none;
        border-color: ${({theme}) => theme.colors.primary};
    }
`

interface FormInputProps {
    label: string,
    value: string | number | readonly string[] | undefined,
    placeholder?: string,
    onChange: React.ChangeEventHandler<HTMLInputElement, HTMLInputElement> | undefined,
    warningMessage?: string | undefined,
    disabled: boolean
}

const FormInput : FunctionComponent<FormInputProps> = ({ label, value, placeholder, onChange, warningMessage, disabled }) => {
    const theme = useTheme();

    const disabledStyle = {
        borderColor: theme.colors.surface,
        background: theme.colors.surface
    }

    return (
        <Container>
            <Warning>{warningMessage}</Warning>
            <Label htmlFor="name-input">{label}</Label>
            <Input style={disabled ? disabledStyle : undefined} id="name-input" value={value} placeholder={placeholder} disabled={disabled} onChange={onChange}/>
        </Container>
    )
}

export default FormInput;