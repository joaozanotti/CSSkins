import { useEffect, useLayoutEffect } from "react";
import DadosApi from "../../componentes/DadosApi";
import MenuFiltros from "../../componentes/MenuFiltros";
import estilos from "./ListagemSkins.module.css";

function ListagemSkins({
    vetSkins,
    setSkins,
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
        if (posicaoRolagem === null || vetSkins.length === 0) return;

        const frame = requestAnimationFrame(() => {
            window.scrollTo({ top: posicaoRolagem, left: 0, behavior: "auto" });
            restaurarRolagem();
        });

        return () => cancelAnimationFrame(frame);
    }, [posicaoRolagem, vetSkins.length, restaurarRolagem]);

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
                    nome={nome} idCategoria={idCategoria}
                    ordenacao={ordenacao} qtdItens={qtdItens}
                    setQtdItens={setQtdItens} aumentarQtdItens={aumentarQtdItens}
                    salvarPosicaoRolagem={salvarPosicaoRolagem}
                />
            </div>
        </>
    )
}

export default ListagemSkins;
