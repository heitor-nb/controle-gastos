import { useEffect, useState } from "react";
import PageContainer from "../components/PageContainer";
import { type TotaisPorPessoa, type Pessoa } from "../@types/api/pessoa";
import { recuperarPessoas } from "../services/pessoaService";
import styled from "styled-components";
import PageBtn from "../components/PageBtn";
import ListContainer from "../components/ListContainer";
import PessoaLi from "../components/PessoaLi";
import PessoaHeader from "../components/PessoaHeader";
import PessoaAddForm from "../components/PessoaAddForm";
import PessoaUpdateForm from "../components/PessoaUpdateForm";

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
                    <PageBtn width="20%" variant="outlined" text="Pessoas" onClick={() => recuperarPessoas().then(data => setPessoas(data)).catch(err => console.log(err))}/>
                    <PageBtn width="20%" variant="outlined" text="Totais por pessoa" onClick={() => console.log("Totais por pessoa.")}/>
                    <PageBtn width="20%" variant="colored" text="Adicionar" onClick={() => setPopUp('adicionar')}/>
                </BtnsWrapper>
                {popUp === 'adicionar' && <PessoaAddForm setPessoas={setPessoas} setPopUp={setPopUp}/>}
                {popUp === 'editar' && <PessoaUpdateForm pessoa={targetPessoa} setTargetPessoa={setTargetPessoa} setPessoas={setPessoas} setPopUp={setPopUp}/>}
                <ListContainer>
                    {isFetching && <div>Loading</div>}
                    {!isFetching && listOption === 'pessoas' && 
                    <>
                        <PessoaHeader />
                        {(pessoas.map((p, index) => <PessoaLi pessoa={p} setTargetPessoa={setTargetPessoa} setPessoas={setPessoas} setPopUp={setPopUp} key={index}/>))}
                    </>}
                </ListContainer>
            </Wrapper>
        </PageContainer>
    )
}

export default Pessoas;