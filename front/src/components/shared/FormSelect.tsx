import type { FunctionComponent } from "react";
import styled, { useTheme } from "styled-components";

const Container = styled.div`
    position: relative;
    width: 80%;
    font-family: ${({theme}) => theme.fonts.default};
    color: ${({theme}) => theme.colors.text};
`

const Label = styled.label`
    position: absolute;
    top: 0;
    left: 0.5rem;
    font-size: 0.8rem;
    font-weight: 700;
`

const Select = styled.select`
    margin-top: 1.2rem;
    width: 100%;
    min-height: 2rem;
    border: solid 1px ${({theme}) => theme.colors.text};
    border-radius: 0.5rem;
    background: ${({theme}) => theme.colors.surface};
    font-size: 0.8rem;
`

interface OptionValue {
    value: string,
    displayValue?: string
};

interface FormSelectProps {
    label: string,
    values: OptionValue[]
    onChange: React.ChangeEventHandler<HTMLSelectElement, HTMLSelectElement> | undefined,
    disabled: boolean
}

const FormSelect : FunctionComponent<FormSelectProps> = ({ label, values, onChange, disabled }) => {
    const theme = useTheme();

    const disabledStyle = { borderColor: theme.colors.surface }

    return (
        <Container>
            <Label>{label}</Label>
            <Select style={disabled ? disabledStyle : undefined} onChange={onChange} disabled={disabled}>
                {(values.map((v, index) => <option value={v.value} key={index}>{v.displayValue ?? v.value}</option>))}
            </Select>
        </Container>
    )
}

export default FormSelect;