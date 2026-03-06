import { useEffect, useState } from "react";
import PageContainer from "../components/shared/PageContainer";
import styled from "styled-components";
import PageBtn from "../components/shared/PageBtn";
import ListContainer from "../components/shared/ListContainer";
import type { Transacao } from "../@types/api/transacao";
import { recuperarTransacoes } from "../services/transacaoService";
import TransacaoHeader from "../components/transacoes/TransacaoHeader";
import TransacaoLi from "../components/transacoes/TransacaoLi";
import TransacaoAddForm from "../components/transacoes/TransacaoAddForm";
import { IoReloadCircle } from "react-icons/io5";

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: calc(100% - 2rem);
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`

const BtnsWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 1.5rem;

    .reload-btn {
        transition: color 0.2s ease-out;
        font-size: 2rem;
        color: ${({theme}) => theme.colors.text};
        cursor: pointer;

        &:hover {
            color: ${({theme}) => theme.colors.primary};
        }
    }
`

const Transacoes = () => {
    const [transacoes, setTransacoes] = useState<Transacao[]>([]);
    const [popUp, setPopUp] = useState<'adicionar'>();
    const [isFetching, setIsFetching] = useState<boolean>(false);

    useEffect(() => {
        setIsFetching(true);
        recuperarTransacoes()
            .then(data => setTransacoes(data))
            .catch(err => console.log(err))
            .finally(() => setIsFetching(false));
    }, []);

    return (
        <PageContainer title="Transações">
            <Wrapper>
                <BtnsWrapper>
                    <IoReloadCircle className="reload-btn" onClick={() => {
                        setIsFetching(true);
                        recuperarTransacoes()
                            .then(data => setTransacoes(data))
                            .catch(err => console.log(err))
                            .finally(() => setIsFetching(false));
                    }}/>
                    <PageBtn width="20%" variant="colored" text="Adicionar" onClick={() => setPopUp('adicionar')}/>
                </BtnsWrapper>
                {popUp === 'adicionar' && <TransacaoAddForm setTransacoes={setTransacoes} setPopUp={setPopUp}/>}
                <ListContainer>
                    {isFetching && <>...</>}
                    {!isFetching && 
                    <>
                        <TransacaoHeader />
                        {(transacoes.map((t, index) => <TransacaoLi transacao={t} key={index}/>))}
                    </>}
                </ListContainer>
            </Wrapper>
        </PageContainer>
    )
}

export default Transacoes;