import type { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 3rem;
    border-top: solid 1px ${({theme}) => theme.colors.surface};
    border-bottom: solid 1px ${({theme}) => theme.colors.surface};
    transition: background-color 0.3s ease-out;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-family: ${({theme}) => theme.fonts.default };
    color: ${({theme}) => theme.colors.text};
    &:hover {
        background-color: ${({theme}) => theme.colors.surface};
    }
`

interface NavBtnProps {
    text : 'Pessoas' | 'Categorias' | 'Transações'
}

const NavBtn : FunctionComponent<NavBtnProps> = ({ text }) => {
    const navigate = useNavigate();

    let route = text.toLowerCase();
    if(text === 'Transações') route = 'transacoes';

    return (
        <Container onClick={() => navigate(`/${route}`)}>
            {text}
        </Container>
    )
}

export default NavBtn;