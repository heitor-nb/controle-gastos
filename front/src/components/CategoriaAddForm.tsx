import { useState, type FunctionComponent } from "react";
import styled from "styled-components";
import FormTitle from "./FormTitle";
import FormInput from "./FormInput";
import PageBtn from "./PageBtn";
import { IoMdClose } from "react-icons/io";
import type { Categoria } from "../@types/api/categoria";
import FormSelect from "./FormSelect";
import { criarCategoria } from "../services/categoriaService";

const Container = styled.div`
    position: absolute;
    top: 12.5%;
    left: 25%;
    width: 50%;
    height: 75%;
    border: solid 1px ${({theme}) => theme.colors.surface};
    border-radius: 1rem;
    background: ${({theme}) => theme.colors.background};
    box-shadow: 0px 0px 25px 0px rgba(0,0,0,0.2);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8%;

    .close-btn {
        width: 1.2rem;
        height: 1.2rem;
        position: absolute;
        top: 5%;
        right: 5%;
        border-radius: 50%;
        transition: background-color 0.3s ease-out;
        color: ${({theme}) => theme.colors.text};
        cursor: pointer;

        &:hover {
            background-color: ${({theme}) => theme.colors.surface};
        }
    }
`

interface CategoriaAddFormProps {
    setCategorias: React.Dispatch<React.SetStateAction<Categoria[]>>,
    setPopUp: React.Dispatch<React.SetStateAction<"adicionar" | undefined>>,
    setListOption: React.Dispatch<React.SetStateAction<"categorias" | "totais">>
}

const CategoriaAddForm : FunctionComponent<CategoriaAddFormProps> = ({ setCategorias, setPopUp, setListOption }) => {
    const [descricao, setDescricao] = useState<string>('');
    const [finalidade, setFinalidade] = useState<'receita' | 'despesa' | 'ambos'>('receita');
    const [isFetching, setIsFetching] = useState<boolean>(false);

    return (
        <Container>
            <IoMdClose className="close-btn" onClick={() => setPopUp(undefined)}/>
            <FormTitle text="Adicionar categoria"/>
            <FormInput label="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} disabled={isFetching}/>
            <FormSelect label="Finalidade" values={['receita', 'despesa', 'ambos']} onChange={(e) => {
                switch(e.target.value){
                    case 'receita':
                        setFinalidade('receita');
                        break;
                    case 'despesa':
                        setFinalidade('despesa');
                        break;
                    case 'ambos':
                        setFinalidade('ambos');
                        break;
                    default:
                        console.log("Erro ao setar finalidade.");
                }
            }} disabled={isFetching}/>
            <PageBtn width="80%" variant="colored" fontWeight={700} text="Adicionar" onClick={() => {
                if(isFetching) return;
                setIsFetching(true);
                criarCategoria({ descricao, finalidade })
                    .then((categoria) => setCategorias(prev => [categoria, ...prev]))
                    .catch(err => console.log(err))
                    .finally(() => {
                        setDescricao('');
                        setFinalidade('receita');
                        setIsFetching(false);
                        setListOption('categorias');
                    });
            }} disabled={isFetching}/>
        </Container>
    )
}

export default CategoriaAddForm;