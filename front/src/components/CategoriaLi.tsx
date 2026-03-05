import { type FunctionComponent } from "react"
import styled from "styled-components";
import type { Categoria, TotaisCategoria } from "../@types/api/categoria";

const Container = styled.div`
    padding: 0 1.5rem;
    width: 100%;
    min-height: 3rem;
    border-bottom: solid 1px ${({theme}) => theme.colors.surface};
    display: flex;
    gap: 3rem;
`

const Wrapper = styled.div`
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: scroll;
    font-family: ${({theme}) => theme.fonts.default};
    color: ${({theme}) => theme.colors.text};
    white-space: nowrap;
`

interface CategoriaLiProps {
    categoria?: Categoria,
    totais?: TotaisCategoria
}

const CategoriaLi : FunctionComponent<CategoriaLiProps> = ({ categoria, totais }) => {
    if(categoria) return (
        <Container>
            <Wrapper style={{justifyContent: 'start'}}>{categoria.id}</Wrapper>
            <Wrapper>{categoria.descricao}</Wrapper>
            <Wrapper>{categoria.finalidade}</Wrapper>
            <Wrapper>{categoria.criadoEm.substring(0, 10)}</Wrapper>
        </Container>
    )
    return totais && (
        <Container>
            <Wrapper>{totais.descricao}</Wrapper>
            <Wrapper>{totais.finalidade}</Wrapper>
            <Wrapper>{totais.receitas}</Wrapper>
            <Wrapper>{totais.despesas}</Wrapper>
            <Wrapper>{totais.saldo}</Wrapper>
        </Container>
    )
};

export default CategoriaLi;