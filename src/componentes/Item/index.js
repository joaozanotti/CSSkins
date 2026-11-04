import React from "react";
import { Link } from "react-router-dom";
import estilos from "./Item.module.css";
import { ordenarPrecos } from "../DadosApi/functions";

function Item(props) {
    const estiloBorda = "10px solid " + props.item.rarity.color;

    const nomeArma = props.item.name.split(" | ")[0];
    const patternArma = props.item.pattern ? props.item.pattern.name : "Vanilla";

    const temPrecos = props.item.precosDisponiveis;
    const moeda = props.item.moeda || "R$";
    let precosOrdenados = [];
    let precosOrdenadosStattrak = [];
    let precosOrdenadosSouvenir = [];
    let corPrecoStattrak = "";
    let corPrecoSouvenir = "";

    // Ordenando os preços para exibição
    if (temPrecos) {
        precosOrdenados = ordenarPrecos(props.item.wears);
    }
    if (temPrecos && props.item.wears_stattrak) {
        precosOrdenadosStattrak = ordenarPrecos(props.item.wears_stattrak);
        corPrecoStattrak = "#eb7333ff";
    }
    if (temPrecos && props.item.wears_souvenir) {
        precosOrdenadosSouvenir = ordenarPrecos(props.item.wears_souvenir);
        corPrecoSouvenir = "#FFD700";
    }

    // Formatando os preços para exibição
    if (precosOrdenados.length === 0) {
        precosOrdenados = "Sem preços disponíveis";

    } else if (precosOrdenados.length > 1) {
        precosOrdenados = 
        `${moeda}${precosOrdenados[precosOrdenados.length-1].price.toFixed(2)} - 
        ${moeda}${precosOrdenados[0].price.toFixed(2)}`;

    } else {
        precosOrdenados = `${moeda}${precosOrdenados[0].price.toFixed(2)}`;
    }

    // Formatando os preços Stattrak para exibição
    if (precosOrdenadosStattrak.length === 0) {
        precosOrdenadosStattrak = "";

    } else if (precosOrdenadosStattrak.length > 1) {
        precosOrdenadosStattrak = 
        `${moeda}${precosOrdenadosStattrak[precosOrdenadosStattrak.length-1].price.toFixed(2)} - 
        ${moeda}${precosOrdenadosStattrak[0].price.toFixed(2)}`;

    } else {
        precosOrdenadosStattrak = `${moeda}${precosOrdenadosStattrak[0].price.toFixed(2)}`;
    }

    // Formatando os preços Souvenir para exibição
    if (precosOrdenadosSouvenir.length === 0) {
        precosOrdenadosSouvenir = "";
    } else if (precosOrdenadosSouvenir.length > 1) {
        precosOrdenadosSouvenir = 
        `${moeda}${precosOrdenadosSouvenir[precosOrdenadosSouvenir.length-1].price.toFixed(2)} - 
        ${moeda}${precosOrdenadosSouvenir[0].price.toFixed(2)}`;
    } else {
        precosOrdenadosSouvenir = `${moeda}${precosOrdenadosSouvenir[0].price.toFixed(2)}`;
    }

    return (
        <Link to={`/skins/${props.item.id}`} className={estilos.link}>
            <li style={{borderBottom: estiloBorda}} className={estilos.item}>
                <div className={estilos.divNome}>
                    <p>{nomeArma}</p>
                    <h1>{patternArma}</h1>
                </div>
                <div>
                    <img alt='Skin' src={props.item.image}/>
                </div>
                {temPrecos &&
                    <div className={estilos.divPrecos}>
                        <p className={estilos.preco}> {precosOrdenados}</p>
                        {precosOrdenadosStattrak ? <p className={estilos.precoEspecial} style={{color: corPrecoStattrak}}>{precosOrdenadosStattrak}</p> : ""}
                        {precosOrdenadosSouvenir ? <p className={estilos.precoEspecial} style={{color: corPrecoSouvenir}}>{precosOrdenadosSouvenir}</p> : ""}
                    </div>
                }
                <div className={estilos.divColecao}>
                {
                    props.item.collections === undefined || props.item.collections.length === 0 ? <p>Sem coleção</p> :
                    props.item.collections.map((colecao, indice) => {
                        return <div key={indice}>
                            <img alt="Logo da coleção" key={colecao.id} src={colecao.image} width="50px"/>
                            <p key={colecao.id+1}>{colecao.name}</p>
                        </div>
                    })
                }
                </div>
            </li>
        </Link>
    )
}

export default Item;
