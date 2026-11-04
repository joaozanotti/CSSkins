import React, { useEffect, useState, useMemo, useRef } from 'react';
import ListagemItens from '../ListagemItens';
import { filtrarPorNome, filtrarPorCategoria, ordenarPorNome, ordenarPorMaiorRaridade, ordenarPorMenorRaridade } from "./functions";
import estilos from "./DadosApi.module.css";
import { Icon } from '@iconify/react/dist/iconify.js';

function DadosApi({ vetSkins, setSkins, nome, idCategoria, ordenacao, qtdItens, aumentarQtdItens, salvarPosicaoRolagem }) {
    const [dados, setDados] = useState([]);
    const [precos, setPrecos] = useState(null);
    const [dolar, setDolar] = useState(null);
    const [statusDados, setStatusDados] = useState("carregando");
    const [statusPrecos, setStatusPrecos] = useState("carregando");
    const [statusDolar, setStatusDolar] = useState("carregando");
    const marcadorCarregamento = useRef(null);
    const carregandoMais = useRef(false);

    useEffect(() => {
        fetchData();
        fetchPrices();
        fetchDolar();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch("https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/skins.json");
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            if (!Array.isArray(data)) throw new Error("Resposta de skins inválida");
            setDados(data);
            setStatusDados("sucesso");
        } catch (error) {
            setStatusDados("erro");
            console.error('Erro ao buscar dados da API:', error);
        }
    };

    const fetchPrices = async () => {
        try {
            const response = await fetch("https://raw.githubusercontent.com/ByMykel/counter-strike-price-tracker/refs/heads/main/static/latest.json");
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            if (!data?.prices || typeof data.prices !== "object") throw new Error("Resposta de preços inválida");
            setPrecos(data);
            setStatusPrecos("sucesso");
        } catch (error) {
            setStatusPrecos("erro");
            console.error('Erro ao buscar preços da API:', error);
        }
    };

    /*
        APIs de cotação do dólar
        https://economia.awesomeapi.com.br/json/last/USD-BRL
        https://api.frankfurter.dev/v1/latest?from=USD&to=BRL
    */

    const fetchDolar = async () => {
        try {
            const response = await fetch("https://api.frankfurter.dev/v1/latest?from=USD&to=BRL");
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            if (!isFinite(data.rates.BRL)) throw new Error("Cotação do dólar inválida");
            setDolar(data.rates.BRL);
            setStatusDolar("sucesso");
        } catch (error) {
            setStatusDolar("erro");
            console.error('Erro ao buscar dados da API:', error);
        }
    };

    const pegarPreco = (nome) => {
        const preco = precos?.prices?.[nome];
        if (preco === undefined) {
            return 0;
        }

        const precoEmDolar = preco / 100;
        return statusDolar === "sucesso" ? precoEmDolar * dolar : precoEmDolar;
    };

    // Associação de preços + stattrak + souvenir
    const itensComPrecos = useMemo(() => {
        if (statusDados !== "sucesso") return [];

        const precosDisponiveis = statusPrecos === "sucesso" && statusDolar !== "carregando";
        const moeda = statusDolar === "sucesso" ? "R$" : "US$";

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
                        price: pegarPreco(`${nomeKey}${wearKey}`)
                    }
                });

            } else {
                wears = wearsVanilla.map((wear) => {
                    nomeKey = dado.name;
                    wearKey = "";
                    return {
                        ...wear,
                        price: pegarPreco(`${nomeKey}${wearKey}`)
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
                        price: pegarPreco(`${nomeKey}${wearKey}`)
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
                        price: pegarPreco(`${nomeKey}${wearKey}`)
                    }
                });
            }

            return {
                ...dado,
                wears,
                wears_stattrak,
                wears_souvenir,
                precosDisponiveis,
                moeda
            };
        });
    // eslint-disable-next-line
    }, [dados, precos, dolar, statusDados, statusPrecos, statusDolar]);

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
        if (statusDados === "sucesso") {
            setSkins(itensFiltrados.slice(0, qtdItens));
        };
    }, [itensFiltrados, qtdItens, setSkins, statusDados]);

    const temMaisItens = statusDados === "sucesso" && vetSkins.length > 0 && vetSkins.length < itensFiltrados.length;
    const podeCarregarMais = temMaisItens && vetSkins.length >= qtdItens;

    useEffect(() => {
        carregandoMais.current = false;
    }, [qtdItens]);

    useEffect(() => {
        if (podeCarregarMais && marcadorCarregamento.current) {
            const observador = new IntersectionObserver(([entrada]) => {
                if (entrada.isIntersecting && !carregandoMais.current) {
                    carregandoMais.current = true;
                    aumentarQtdItens();
                }
            }, { rootMargin: "0px 0px 500px 0px" });

            observador.observe(marcadorCarregamento.current);
            return () => observador.disconnect();
        };
        
    }, [aumentarQtdItens, qtdItens, podeCarregarMais]);

    return (
        <div className={estilos.listagem}>
            <ListagemItens skins={vetSkins} salvarPosicaoRolagem={salvarPosicaoRolagem}/>
            {
                statusDados === "erro" ?
                <p className={estilos.msgErro}>Erro ao buscar skins.</p> : ""
            }
            {
                statusDados === "carregando" && nome === "" && idCategoria === "" && vetSkins.length === 0 ?
                <p className={estilos.loading}><Icon icon="eos-icons:loading"/></p> : ""
            }
            {
                statusDados !== "erro" && (nome !== "" || idCategoria !== "") && vetSkins.length === 0 ?
                <p className={estilos.msgErro}>Nenhuma skin encontrada.</p> : ""
            }
            {podeCarregarMais && <div ref={marcadorCarregamento} className={estilos.marcadorCarregamento} aria-hidden="true"/>}
        </div>
    );
}

export default DadosApi;
