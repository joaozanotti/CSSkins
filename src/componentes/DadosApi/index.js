import React, { useEffect, useState } from 'react';
import ListagemItens from '../ListagemItens';
import { filtrarPorNome, filtrarPorCategoria, ordenarPorNome, ordenarPorMaiorRaridade, ordenarPorMenorRaridade } from "./functions";
import estilos from "./DadosApi.module.css";
import { Icon } from '@iconify/react/dist/iconify.js';

function DadosApi({vetSkins, setSkins, nome, idCategoria, ordenacao, qtdItens, aumentarQtdItens}) { 
    const [dados, setDados] = useState([]);

    useEffect(() => { fetchData(); }, []);

    const fetchData = async () => {
        try { 
            const response = await fetch("https://bymykel.github.io/CSGO-API/api/pt-BR/skins.json");
            const data = await response.json();
            setDados(data);

        } catch (error) {
            console.error('Erro ao buscar dados da API:', error); 
        }
    }

    useEffect(() => {
        const filtroNome = filtrarPorNome(dados, nome);

        const filtroCategoria = filtrarPorCategoria(filtroNome, idCategoria);

        let filtroOrdenacao;
        if (ordenacao === "alfabetica") {
            filtroOrdenacao = ordenarPorNome(filtroCategoria);
        } else if (ordenacao === "maior-raridade") {
            filtroOrdenacao = ordenarPorMaiorRaridade(filtroCategoria)
        } else {
            filtroOrdenacao = ordenarPorMenorRaridade(filtroCategoria)
        }

        const itensLimitados = filtroOrdenacao.slice(0, qtdItens);
        
        setSkins(itensLimitados);
    }, [nome, idCategoria, dados, qtdItens, ordenacao, setSkins]);

    return (
        <div className={estilos.listagem}>
            <ListagemItens skins={vetSkins}/>
            {
            nome === "" && idCategoria === "" && vetSkins.length === 0 ? <p className={estilos.loading}><Icon icon="mingcute:loading-fill"/></p> : ""
            }
            {
            (nome !== "" || idCategoria !== "") && vetSkins.length === 0 ? <p className={estilos.msgErro}>Nenhuma skin encontrada.</p> : ""
            }
            {
            vetSkins.length < qtdItens ? "" :
            <button className={estilos.botaoCarregar} onClick={aumentarQtdItens}>Carregar mais...</button>
            }
        </div>
    )    
}

export default DadosApi;