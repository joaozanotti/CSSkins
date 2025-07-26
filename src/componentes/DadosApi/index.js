import React, { useEffect, useState, useMemo } from 'react';
import ListagemItens from '../ListagemItens';
import { filtrarPorNome, filtrarPorCategoria, ordenarPorNome, ordenarPorMaiorRaridade, ordenarPorMenorRaridade } from "./functions";
import estilos from "./DadosApi.module.css";
import { Icon } from '@iconify/react/dist/iconify.js';

function DadosApi({ vetSkins, setSkins, nome, idCategoria, ordenacao, qtdItens, aumentarQtdItens }) {
    const [dados, setDados] = useState([]);
    const [precos, setPrecos] = useState([]);
    const [euro, setEuro] = useState(null);

    useEffect(() => {
        fetchData();
        fetchPrices();
        fetchEuro();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch("https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/skins.json");
            const data = await response.json();
            setDados(data);
        } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
        }
    };

    const fetchPrices = async () => {
        try {
            const response = await fetch("https://raw.githubusercontent.com/ByMykel/counter-strike-price-tracker/main/static/prices/latest.json");
            const data = await response.json();
            setPrecos(data);
        } catch (error) {
            console.error('Erro ao buscar preços da API:', error);
        }
    };

    const fetchEuro = async () => {
        try {
            const response = await fetch("https://api.frankfurter.app/latest?from=EUR&to=BRL");
            const data = await response.json();
            setEuro(data.rates.BRL);
        } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
        }
    };

    const pegarPreco = (steam) => (
        (steam?.last_24h ?? steam?.last_7d ?? steam?.last_30d ?? steam?.last_90d ?? steam?.last_ever ?? 0) * (euro || 0)
    );

    // Associação de preços + stattrak + souvenir
    const itensComPrecos = useMemo(() => {
        if (!dados.length || !Object.keys(precos).length || euro === null) return [];

        return dados.map(dado => {
            let nomeKey;
            let wearKey;
            let wears = dado.wears;
            let wearsVanilla = [{ id: "SFUI_InvTooltip_Wear_Amount_0", name: "Vanilla" }];

            if (dado.wears) {
                wears = wears.map((wear) => {
                    nomeKey = dado.name;
                    wearKey = ` (${wear.name})`;
                    return {
                        ...wear,
                        price: pegarPreco(precos[`${nomeKey}${wearKey}`]?.steam)
                    }
                });

            } else {
                wears = wearsVanilla.map((wear) => {
                    nomeKey = dado.name;
                    wearKey = "";
                    return {
                        ...wear,
                        price: pegarPreco(precos[`${nomeKey}${wearKey}`]?.steam)
                    }
                });
            }

            let wears_stattrak = null;
            if (dado.stattrak) {
                wears_stattrak = wears.map((wear, index) => {
                    const nomeSemEstrela = dado.name.replace("★ ", "").trim();
                    nomeKey = dado.name.includes("★") ? `★ StatTrak™ ${nomeSemEstrela}` : `StatTrak™ ${dado.name}`;
                    wearKey = wear.name !== "Vanilla" ? ` (${wear.name})` : "";
                    
                    return {
                        id: `SFUI_InvTooltip_Wear_Amount_${index + 5}`,
                        name: `StatTrak™ ${wear.name}`,
                        price: pegarPreco(precos[`${nomeKey}${wearKey}`]?.steam)
                    };
                })
            }

            let wears_souvenir = null;
            if (dado.souvenir) {
                wears_souvenir = wears.map((wear, index) => {
                    nomeKey = `Souvenir ${dado.name}`;
                    wearKey = ` (${wear.name})`;

                    return {
                        id: `SFUI_InvTooltip_Wear_Amount_${index + 10}`,
                        name: `Souvenir ${wear.name}`,
                        price: pegarPreco(precos[`${nomeKey}${wearKey}`]?.steam)
                    }
                });
            }

            return {
                ...dado,
                wears,
                wears_stattrak,
                wears_souvenir
            };
        });
    // eslint-disable-next-line
    }, [dados, precos, euro]);

    // Filtro e ordenação com memorização
    const itensFiltrados = useMemo(() => {
        const filtroNome = filtrarPorNome(itensComPrecos, nome);
        const filtroCategoria = filtrarPorCategoria(filtroNome, idCategoria);

        let filtroOrdenacao;
        switch (ordenacao) {
            case "alfabetica": filtroOrdenacao = ordenarPorNome(filtroCategoria); break;
            case "maior-raridade": filtroOrdenacao = ordenarPorMaiorRaridade(filtroCategoria); break;
            default: filtroOrdenacao = ordenarPorMenorRaridade(filtroCategoria);
        }
        return filtroOrdenacao;
    }, [itensComPrecos, nome, idCategoria, ordenacao]);

    useEffect(() => {
        setSkins(itensFiltrados.slice(0, qtdItens));
    }, [itensFiltrados, qtdItens, setSkins]);

    return (
        <div className={estilos.listagem}>
            <ListagemItens skins={vetSkins}/>
            { 
                nome === "" && idCategoria === "" && vetSkins.length === 0 ? 
                <p className={estilos.loading}><Icon icon="eos-icons:loading"/></p> : ""
            }
            { 
                (nome !== "" || idCategoria !== "") && vetSkins.length === 0 ? 
                <p className={estilos.msgErro}>Nenhuma skin encontrada.</p> : "" 
            }
            { 
                vetSkins.length < qtdItens ? "" : 
                <button className={estilos.botaoCarregar} onClick={aumentarQtdItens}>Carregar mais...</button> 
            }
        </div>
    );
}

export default DadosApi;