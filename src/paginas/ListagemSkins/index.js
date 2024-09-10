import { useEffect } from "react";
import DadosApi from "../../componentes/DadosApi";
import MenuFiltros from "../../componentes/MenuFiltros";
import estilos from "./ListagemSkins.module.css";

function ListagemSkins(props) {
    useEffect(() => { document.title = "CS SKINS | Skins"; }, []);

    return (
        <>
            <MenuFiltros
                vetSkins={props.vetSkins} setQtdItens={props.setQtdItens} setNome={props.setNome}
                inputNome={props.inputNome} setInputNome={props.setInputNome}
                idCategoria={props.idCategoria} setCategoria={props.setCategoria}
                ordenacao={props.ordenacao} setOrdenacao={props.setOrdenacao}
                resetarQtdItens={props.resetarQtdItens}
                qtdPadraoItens={props.qtdPadraoItens}
                resetarPesquisa={props.resetarPesquisa}
            />
            <div className={estilos.lista}>
                <DadosApi
                    vetSkins={props.vetSkins} setSkins={props.setSkins}
                    nome={props.nome} idCategoria={props.idCategoria} 
                    ordenacao={props.ordenacao} qtdItens={props.qtdItens} 
                    setQtdItens={props.setQtdItens} aumentarQtdItens={props.aumentarQtdItens}
                />
            </div>
        </>
    )
}

export default ListagemSkins;