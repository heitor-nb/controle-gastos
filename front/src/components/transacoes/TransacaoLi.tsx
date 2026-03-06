import { type FunctionComponent } from "react"
import styled from "styled-components";
import type { Transacao } from "../../@types/api/transacao";

const Container = styled.div`
    padding: 0 1.5rem;
    width: 68rem;
    min-height: 3rem;
    border-bottom: solid 1px ${({theme}) => theme.colors.surface};
    display: flex;
    gap: 1.5rem;
`

const Wrapper = styled.div`
    min-width: 8rem;
    height: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    overflow: scroll;
    font-family: ${({theme}) => theme.fonts.default};
    color: ${({theme}) => theme.colors.text};
    white-space: nowrap;
`

interface TransacaoLiProps {
    transacao: Transacao
}

const TransacaoLi : FunctionComponent<TransacaoLiProps> = ({ transacao }) => {
    return (
        <Container>
            <Wrapper style={{justifyContent: 'start'}}>{transacao.id}</Wrapper>
            <Wrapper>{transacao.descricao}</Wrapper>
            <Wrapper>{transacao.tipo}</Wrapper>
            <Wrapper>{transacao.valor}</Wrapper>
            <Wrapper>{transacao.criadoEm.substring(0, 10)}</Wrapper>
            <Wrapper>{transacao.categoria}</Wrapper>
            <Wrapper>{transacao.pessoa}</Wrapper>
        </Container>
    )
};

export default TransacaoLi;