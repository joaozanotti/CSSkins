import { useEffect, useLayoutEffect } from "react";
import DadosApi from "../../componentes/DadosApi";
import MenuFiltros from "../../componentes/MenuFiltros";
import estilos from "./ListagemSkins.module.css";
import BotaoVoltarTopo from "../../componentes/BotaoVoltarTopo";

function ListagemSkins({
    vetSkins,
    setSkins,
    dataAtualizacao,
    setDataAtualizacao,
    nome,
    setNome,
    inputNome,
    setInputNome,
    idCategoria,
    setCategoria,
    ordenacao,
    setOrdenacao,
    qtdItens,
    setQtdItens,
    aumentarQtdItens,
    resetarQtdItens,
    qtdPadraoItens,
    resetarPesquisa,
    posicaoRolagem,
    restaurarRolagem,
    salvarPosicaoRolagem
}) {
    useEffect(() => { document.title = "CS SKINS | Skins"; }, []);

    useLayoutEffect(() => {
        if (posicaoRolagem.current !== null) {
            window.scrollTo({ top: posicaoRolagem.current, left: 0, behavior: "auto" });
            restaurarRolagem();
        }
    }, [posicaoRolagem, restaurarRolagem]);

    return (
        <>
            <MenuFiltros
                vetSkins={vetSkins} setQtdItens={setQtdItens} setNome={setNome}
                inputNome={inputNome} setInputNome={setInputNome}
                idCategoria={idCategoria} setCategoria={setCategoria}
                ordenacao={ordenacao} setOrdenacao={setOrdenacao}
                resetarQtdItens={resetarQtdItens}
                qtdPadraoItens={qtdPadraoItens}
                resetarPesquisa={resetarPesquisa}
            />
            <div className={estilos.lista}>
                <DadosApi
                    vetSkins={vetSkins} setSkins={setSkins}
                    dataAtualizacao={dataAtualizacao} setDataAtualizacao={setDataAtualizacao}
                    nome={nome} idCategoria={idCategoria}
                    ordenacao={ordenacao} qtdItens={qtdItens}
                    setQtdItens={setQtdItens} aumentarQtdItens={aumentarQtdItens}
                    salvarPosicaoRolagem={salvarPosicaoRolagem}
                />
            </div>
            <BotaoVoltarTopo resetarQtdItens={resetarQtdItens}/>
        </>
    )
}

export default ListagemSkins;
