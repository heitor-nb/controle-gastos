import { useEffect, useState } from "react";
import PageContainer from "../components/shared/PageContainer";
import styled from "styled-components";
import PageBtn from "../components/shared/PageBtn";
import ListContainer from "../components/shared/ListContainer";
import type { Categoria, TotaisPorCategoria } from "../@types/api/categoria";
import { recuperarCategorias, recuperarTotaisPorCategoria } from "../services/categoriaService";
import TotaisFooter from "../components/shared/TotaisFooter";
import CategoriaAddForm from "../components/categoria/CategoriaAddForm";
import CategoriaHeader from "../components/categoria/CategoriaHeader";
import CategoriaLi from "../components/categoria/CategoriaLi";

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

const Categorias = () => {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [totaisPorCategoria, setTotaisPorCategoria] = useState<TotaisPorCategoria>();
    const [popUp, setPopUp] = useState<'adicionar'>();
    const [listOption, setListOption] = useState<'categorias' | 'totais'>('categorias');
    const [isFetching, setIsFetching] = useState<boolean>(false);

    useEffect(() => {
        setIsFetching(true);
        recuperarCategorias()
            .then(data => setCategorias(data))
            .catch(err => console.log(err))
            .finally(() => setIsFetching(false));
    }, []);

    return (
        <PageContainer title="Categorias">
            <Wrapper>
                <BtnsWrapper>
                    <PageBtn width="20%" variant="outlined" text="Categorias" onClick={() => {
                        setIsFetching(true);
                        recuperarCategorias()
                            .then(data => setCategorias(data))
                            .catch(err => console.log(err))
                            .finally(() => {
                                setIsFetching(false);
                                setListOption('categorias');
                            });
                    }}/>
                    <PageBtn width="20%" variant="outlined" text="Totais por categoria" onClick={() => {
                        setIsFetching(true);
                        recuperarTotaisPorCategoria()
                            .then(data => setTotaisPorCategoria(data))
                            .catch(err => console.log(err))
                            .finally(() => {
                                setIsFetching(false);
                                setListOption('totais');
                            });
                    }}/>
                    <PageBtn width="20%" variant="colored" text="Adicionar" onClick={() => setPopUp('adicionar')}/>
                </BtnsWrapper>
                {popUp === 'adicionar' && <CategoriaAddForm setCategorias={setCategorias} setPopUp={setPopUp} setListOption={setListOption}/>}
                <ListContainer>
                    {isFetching && <div>Loading</div>}
                    {!isFetching && listOption === 'categorias' && 
                    <>
                        <CategoriaHeader labels={['ID', 'Descrição', 'Finalidade', 'Criado em']}/>
                        {(categorias.map((c, index) => <CategoriaLi categoria={c} key={index}/>))}
                    </>}
                    {!isFetching && listOption === 'totais' && totaisPorCategoria &&
                    <>
                        <CategoriaHeader labels={['Descrição', 'Finalidade', 'Receitas', 'Despesas', 'Saldo']}/>
                        {(totaisPorCategoria.totaisCategorias.map((t, index) => <CategoriaLi totais={t} key={index}/>))}
                        <TotaisFooter receitas={totaisPorCategoria.receitasTotais} despesas={totaisPorCategoria.despesasTotais} saldo={totaisPorCategoria.saldoTotal}/>
                    </>}
                </ListContainer>
            </Wrapper>
        </PageContainer>
    )
}

export default Categorias;