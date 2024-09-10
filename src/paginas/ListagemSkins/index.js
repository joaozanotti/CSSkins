import { useEffect } from "react";
import DadosApi from "../../componentes/DadosApi";
import Main from "../../componentes/Main";
import MenuFiltros from "../../componentes/MenuFiltros";

function ListagemSkins(props) {
    useEffect(() => { document.title = "CS SKINS | Skins"; }, []);

    return (
        <>
            <MenuFiltros
                vetSkins={props.vetSkins} setQtdItens={props.setQtdItens} setNome={props.setNome}
                idCategoria={props.idCategoria} setCategoria={props.setCategoria}
                ordenacao={props.ordenacao} setOrdenacao={props.setOrdenacao}
                resetarQtdItens={props.resetarQtdItens}
                qtdPadraoItens={props.qtdPadraoItens}
            />
            <Main>
                <DadosApi
                    vetSkins={props.vetSkins} setSkins={props.setSkins}
                    nome={props.nome} idCategoria={props.idCategoria} 
                    ordenacao={props.ordenacao} qtdItens={props.qtdItens} 
                    setQtdItens={props.setQtdItens} aumentarQtdItens={props.aumentarQtdItens}
                />
            </Main>
        </>
    )
}

export default ListagemSkins;