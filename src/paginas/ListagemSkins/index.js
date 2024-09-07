import { useEffect } from "react";
import DadosApi from "../../componentes/DadosApi";
import Footer from "../../componentes/Footer";
import Header from "../../componentes/Header";
import Main from "../../componentes/Main";
import MenuFiltros from "../../componentes/MenuFiltros";

function ListagemSkins(props) {
    useEffect(() => { document.title = "CS SKINS | Skins"; }, []);

    return (
        <>
            <Header linkAtivo="skins"/>
            <MenuFiltros 
                inputNome={props.inputNome} setInputNome={props.setInputNome}
                setQtdItens={props.setQtdItens} setNome={props.setNome}
                idCategoria={props.idCategoria} setCategoria={props.setCategoria}
                ordenacao={props.ordenacao} setOrdenacao={props.setOrdenacao}
                resetarQtdItens={props.resetarQtdItens} resetarPesquisa={props.resetarPesquisa}
            />
            <Main>
                <DadosApi 
                    vetSkins={props.vetSkins} setSkins={props.setSkins}
                    nome={props.nome} idCategoria={props.idCategoria} 
                    ordenacao={props.ordenacao} qtdItens={props.qtdItens} 
                    setQtdItens={props.setQtdItens} aumentarQtdItens={props.aumentarQtdItens}
                />
            </Main>
            <Footer autor="João Vitor"/>
        </>
    )
}

export default ListagemSkins;