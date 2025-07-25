import React, { useEffect, useState } from 'react';
import ListagemItens from '../ListagemItens';
import { filtrarPorNome, filtrarPorCategoria, ordenarPorNome, ordenarPorMaiorRaridade, ordenarPorMenorRaridade } from "./functions";
import estilos from "./DadosApi.module.css";
import { Icon } from '@iconify/react/dist/iconify.js';

function DadosApi({vetSkins, setSkins, nome, idCategoria, ordenacao, qtdItens, aumentarQtdItens}) { 
    const [dados, setDados] = useState([]);
    const [precos, setPrecos] = useState([]);
    const [itens, setItens] = useState([]);
    const [euro, setEuro] = useState(null);

    useEffect(() => { 
        fetchData();
        fetchPrices();
        fetchEuro();
    }, []);

    useEffect(() => {
        if (dados.length > 0 && precos.length > 0) {
            associarPrecos();
        }
    // eslint-disable-next-line
    }, [dados, precos]);

    const fetchData = async () => {
        try { 
            const response = await fetch("https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/skins.json");
            const data = await response.json();
            setDados(data);
            
        } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
        }
    }

    const fetchPrices = async () => {
        try { 
            const response = await fetch("https://raw.githubusercontent.com/ByMykel/counter-strike-price-tracker/main/static/prices/latest.json");
            const data = await response.json();            
            setPrecos(Object.entries(data).map(([name, info]) => ({
                name,
                ...info
            })));

        } catch (error) {
            console.error('Erro ao buscar preços da API:', error);
        }
    }

    const fetchEuro = async () => {
        try { 
            const response = await fetch("https://api.frankfurter.app/latest?from=EUR&to=BRL");
            const data = await response.json();
            setEuro(data.rates.BRL);
            
        } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
        }
    }

    const associarPrecos = () => {
        const result = dados.map(dado => ({
            ...dado,
            wears: dado.wears ? dado.wears.map(wear => {
                const key = `${dado.name} (${wear.name})`;
                const priceInfo = precos.find(p => p.name === key);
                
                let price = 0;
                if (priceInfo) {
                    const precoSteam = priceInfo.steam;
                    const ultimoPreco =
                        precoSteam.last_24h ??
                        precoSteam.last_7d ??
                        precoSteam.last_30d ??
                        precoSteam.last_90d ??
                        precoSteam.last_ever;

                    price = ultimoPreco * euro;
                }

                return {
                    ...wear,
                    price
                };
            }) : dado.wears
        }));

        const resultStatTrak = result.map(dado => {
            if (dado.stattrak) {
                let stattrakWears;

                if (dado.name.indexOf("★") === -1) {
                    stattrakWears = dado.wears
                    ? dado.wears.map((wear, index) => {
                        const key = `StatTrak™ ${dado.name} (${wear.name})`;
                        const priceInfo = precos.find(p => p.name === key);

                        let price = 0;
                        if (priceInfo) {
                            const precoSteam = priceInfo.steam;
                            const ultimoPreco =
                                precoSteam.last_24h ??
                                precoSteam.last_7d ??
                                precoSteam.last_30d ??
                                precoSteam.last_90d ??
                                precoSteam.last_ever;

                            price = ultimoPreco * euro;
                        }

                        return {
                            id: `SFUI_InvTooltip_Wear_Amount_${index + 5}`,
                            name: `StatTrak™ ${wear.name}`,
                            price
                        };
                    })
                    : [];
                } else {
                    const nomeSemEstrela = dado.name.replace("★ ", "");
                    stattrakWears = dado.wears
                    ? dado.wears.map((wear, index) => {
                        const key = `★ StatTrak™ ${nomeSemEstrela} (${wear.name})`;
                        const priceInfo = precos.find(p => p.name === key);

                        let price = 0;
                        if (priceInfo) {
                            const precoSteam = priceInfo.steam;
                            const ultimoPreco =
                                precoSteam.last_24h ??
                                precoSteam.last_7d ??
                                precoSteam.last_30d ??
                                precoSteam.last_90d ??
                                precoSteam.last_ever;

                            price = ultimoPreco * euro;
                        }

                        return {
                            id: `SFUI_InvTooltip_Wear_Amount_${index + 5}`,
                            name: `StatTrak™ ${wear.name}`,
                            price
                        };
                    })
                    : [];
                }
                
                return {
                    ...dado,
                    wears_stattrak: stattrakWears
                };
            } else {
                return dado;
            }
        });

        const resultSouvenir = resultStatTrak.map(dado => {
            if (dado.souvenir) {
                const souvenirWears = dado.wears
                    ? dado.wears.map((wear, index) => {
                        const key = `Souvenir ${dado.name} (${wear.name})`;
                        const priceInfo = precos.find(p => p.name === key);

                        let price = 0;
                        if (priceInfo) {
                            const precoSteam = priceInfo.steam;
                            const ultimoPreco =
                                precoSteam.last_24h ??
                                precoSteam.last_7d ??
                                precoSteam.last_30d ??
                                precoSteam.last_90d ??
                                precoSteam.last_ever;

                            price = ultimoPreco * euro;
                        }

                        return {
                            id: `SFUI_InvTooltip_Wear_Amount_${index + 10}`,
                            name: `Souvenir ${wear.name}`,
                            price
                        };
                    })
                    : [];

                return {
                    ...dado,
                    wears_souvenir: souvenirWears
                };
            } else {
                return dado;
            }
        });

        setItens(resultSouvenir);
    };

    useEffect(() => {
        const filtroNome = filtrarPorNome(itens, nome);

        const filtroCategoria = filtrarPorCategoria(filtroNome, idCategoria);

        let filtroOrdenacao;
        if (ordenacao === "alfabetica") {
            filtroOrdenacao = ordenarPorNome(filtroCategoria);

        } else if (ordenacao === "maior-raridade") {
            filtroOrdenacao = ordenarPorMaiorRaridade(filtroCategoria);
            
        } else {
            filtroOrdenacao = ordenarPorMenorRaridade(filtroCategoria);
        }

        const itensLimitados = filtroOrdenacao.slice(0, qtdItens);
        
        setSkins(itensLimitados);
    }, [nome, idCategoria, itens, qtdItens, ordenacao, setSkins]);

    return (
        <div className={estilos.listagem}>
            <ListagemItens skins={vetSkins}/>
            {
            nome === "" && idCategoria === "" && vetSkins.length === 0 ? <p className={estilos.loading}><Icon icon="eos-icons:loading"/></p> : ""
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