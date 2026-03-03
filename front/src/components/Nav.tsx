import styled from "styled-components";
import NavBtn from "./NavBtn";

const Container = styled.div`
    padding-top: 3rem;
    width: 20%;
    height: 100%;
    border-right: solid 2px ${({theme}) => theme.colors.surface};
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Nav = () => {
    return (
        <Container>
            <NavBtn text="Pessoas" />
            <NavBtn text="Categorias" />
            <NavBtn text="Transações" />
        </Container>
    )
}

export default Nav;