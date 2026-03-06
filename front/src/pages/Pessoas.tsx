import { useEffect, useState } from "react";
import PageContainer from "../components/shared/PageContainer";
import { type TotaisPorPessoa, type Pessoa } from "../@types/api/pessoa";
import { recuperarPessoas, recuperarTotaisPorPessoa } from "../services/pessoaService";
import styled from "styled-components";
import PageBtn from "../components/shared/PageBtn";
import ListContainer from "../components/shared/ListContainer";
import PessoaLi from "../components/pessoa/PessoaLi";
import PessoaHeader from "../components/pessoa/PessoaHeader";
import PessoaAddForm from "../components/pessoa/PessoaAddForm";
import PessoaUpdateForm from "../components/pessoa/PessoaUpdateForm";
import TotaisPessoaHeader from "../components/pessoa/TotaisPessoaHeader";
import TotaisPessoaLi from "../components/pessoa/TotaisPessoaLi";
import TotaisFooter from "../components/shared/TotaisFooter";

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
    gap: 1rem;
`

const Pessoas = () => {
    const [pessoas, setPessoas] = useState<Pessoa[]>([]);
    const [totaisPorPessoa, setTotaisPorPessoa] = useState<TotaisPorPessoa>();
    const [popUp, setPopUp] = useState<'adicionar' | 'editar'>();
    const [targetPessoa, setTargetPessoa] = useState<Pessoa>();
    const [listOption, setListOption] = useState<'pessoas' | 'totais'>('pessoas');
    const [isFetching, setIsFetching] = useState<boolean>(false);

    useEffect(() => {
        setIsFetching(true);
        recuperarPessoas()
            .then(data => setPessoas(data))
            .catch(err => console.log(err))
            .finally(() => setIsFetching(false));
    }, []);

    return (
        <PageContainer title="Pessoas">
            <Wrapper>
                <BtnsWrapper>
                    <PageBtn width="20%" variant="outlined" text="Pessoas" onClick={() => {
                        setIsFetching(true);
                        recuperarPessoas()
                            .then(data => setPessoas(data))
                            .catch(err => console.log(err))
                            .finally(() => {
                                setIsFetching(false);
                                setListOption('pessoas');
                            });
                    }}/>
                    <PageBtn width="20%" variant="outlined" text="Totais por pessoa" onClick={() => {
                        setIsFetching(true);
                        recuperarTotaisPorPessoa()
                            .then(data => setTotaisPorPessoa(data))
                            .catch(err => console.log(err))
                            .finally(() => {
                                setIsFetching(false);
                                setListOption('totais');
                            });
                    }}/>
                    <PageBtn width="20%" variant="colored" text="Adicionar" onClick={() => setPopUp('adicionar')}/>
                </BtnsWrapper>
                {popUp === 'adicionar' && <PessoaAddForm setPessoas={setPessoas} setPopUp={setPopUp} setListOption={setListOption}/>}
                {popUp === 'editar' && <PessoaUpdateForm pessoa={targetPessoa} setTargetPessoa={setTargetPessoa} setPessoas={setPessoas} setPopUp={setPopUp}/>}
                <ListContainer>
                    {isFetching && <>...</>}
                    {!isFetching && listOption === 'pessoas' && 
                    <>
                        <PessoaHeader />
                        {(pessoas.map((p, index) => <PessoaLi pessoa={p} setTargetPessoa={setTargetPessoa} setPessoas={setPessoas} setPopUp={setPopUp} key={index}/>))}
                    </>}
                    {!isFetching && listOption === 'totais' && totaisPorPessoa &&
                    <>
                        <TotaisPessoaHeader />
                        {(totaisPorPessoa.totaisPessoas.map((t, index) => <TotaisPessoaLi totais={t} key={index}/>))}
                        <TotaisFooter receitas={totaisPorPessoa.receitasTotais} despesas={totaisPorPessoa.despesasTotais} saldo={totaisPorPessoa.saldoTotal}/>
                    </>}
                </ListContainer>
            </Wrapper>
        </PageContainer>
    )
}

export default Pessoas;