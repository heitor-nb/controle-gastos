import type { FunctionComponent } from "react";
import styled, { useTheme } from "styled-components";

interface BtnProps {
    $width: string,
    $variant: 'colored' | 'outlined',
    $fontWeight?: number
}

const Btn = styled.div<BtnProps>`
    width: ${({$width}) => $width};
    height: 3rem;
    border: ${({$variant, theme}) => $variant === 'outlined' ? `solid 1px ${theme.colors.surface}` : 'none'};
    border-radius: 0.5rem;
    background: ${({$variant, theme}) => $variant === 'outlined' ? theme.colors.background : theme.colors.primary};
    transition: background-color 0.3s ease-out;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-family: ${({theme}) => theme.fonts.default};
    font-weight: ${({$fontWeight}) => $fontWeight ?? 400};
    font-size: 0.8rem;
    color: ${({theme}) => theme.colors.text};

    &:hover{
        background: ${({$variant, theme}) => $variant === 'outlined' ? theme.colors.surface : theme.colors.text};
        color: ${({$variant, theme}) => $variant === 'outlined' ? theme.colors.text : theme.colors.primary};
    }
`

interface PageBtnProps {
    width: string,
    variant: 'colored' | 'outlined',
    fontWeight?: number,
    text: string,
    onClick: () => void,
    disabled?: boolean
}

const PageBtn : FunctionComponent<PageBtnProps> = ({ width, variant, fontWeight, text, onClick, disabled }) => {
    const theme = useTheme();

    const disabledStyle = {
        background: theme.colors.surface,
        color: theme.colors.text,
        cursor: 'not-allowed'
    };

    return (
        <Btn $width={width} $variant={variant} $fontWeight={fontWeight} style={disabled ? disabledStyle : undefined} onClick={onClick}>
            {text}
        </Btn>
    )
}

export default PageBtn;