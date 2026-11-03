import React from "react";
import { Link } from "react-router-dom";
import estilos from "./Item.module.css";
import { ordenarPrecos } from "../DadosApi/functions";

function Item(props) {
    const estiloBorda = "10px solid " + props.item.rarity.color;

    const nomeArma = props.item.name.split(" | ")[0];
    const patternArma = props.item.pattern ? props.item.pattern.name : "Vanilla";

    let precosOrdenados = ordenarPrecos(props.item.wears);
    let precosOrdenadosStattrak = "";
    let precosOrdenadosSouvenir = "";
    let precoStattrak = "";
    let precoSouvenir = "";

    if (props.item.wears_stattrak) {
        precosOrdenadosStattrak = ordenarPrecos(props.item.wears_stattrak);
        precoStattrak = "#eb7333ff";
    }
    if (props.item.wears_souvenir) {
        precosOrdenadosSouvenir = ordenarPrecos(props.item.wears_souvenir);
        precoSouvenir = "#FFD700";
    }

    if (precosOrdenados.length === 0) {
        precosOrdenados = `Sem preços disponíveis`;
    } else {
        if (precosOrdenados && precosOrdenados[0].price === 0) {
            if (precosOrdenados.length > 1) {
                precosOrdenados = `R$${precosOrdenados[precosOrdenados.length-1].price.toFixed(2)} - R$${precosOrdenados[1].price.toFixed(2)}`;
            } else if (precosOrdenados.length === 1) {
                precosOrdenados = `R$${precosOrdenados[1].price.toFixed(2)}`;
            }
        } else {
            if (precosOrdenados.length > 1) {
                precosOrdenados = `R$${precosOrdenados[precosOrdenados.length-1].price.toFixed(2)} - R$${precosOrdenados[0].price.toFixed(2)}`;
            } else if (precosOrdenados.length === 1) {
                precosOrdenados = `R$${precosOrdenados[0].price.toFixed(2)}`;
            }
        } 
    }

    if (precosOrdenadosStattrak.length === 0) {
        precosOrdenadosStattrak = "";
    } else {
        if (precosOrdenadosStattrak && precosOrdenadosStattrak[0].price === 0) {
            if (precosOrdenadosStattrak.length > 1) {
                precosOrdenadosStattrak = `R$${precosOrdenadosStattrak[precosOrdenadosStattrak.length-1].price.toFixed(2)} - R$${precosOrdenadosStattrak[1].price.toFixed(2)}`;
            } else if (precosOrdenadosStattrak.length === 1) {
                precosOrdenadosStattrak = `R$${precosOrdenadosStattrak[1].price.toFixed(2)}`;
            }
        } else {
            if (precosOrdenadosStattrak.length > 1) {
                precosOrdenadosStattrak = `R$${precosOrdenadosStattrak[precosOrdenadosStattrak.length-1].price.toFixed(2)} - R$${precosOrdenadosStattrak[0].price.toFixed(2)}`;
            } else if (precosOrdenadosStattrak.length === 1) {
                precosOrdenadosStattrak = `R$${precosOrdenadosStattrak[0].price.toFixed(2)}`;
            }
        }
    }

    if (precosOrdenadosSouvenir.length === 0) {
        precosOrdenadosSouvenir = "";
    } else {
        if (precosOrdenadosSouvenir && precosOrdenadosSouvenir[0].price === 0) {
            if (precosOrdenadosSouvenir.length > 1) {
                precosOrdenadosSouvenir = `R$${precosOrdenadosSouvenir[precosOrdenadosSouvenir.length-1].price.toFixed(2)} - R$${precosOrdenadosSouvenir[1].price.toFixed(2)}`;
            } else if (precosOrdenadosSouvenir.length === 1) {
                precosOrdenadosSouvenir = `R$${precosOrdenadosSouvenir[1].price.toFixed(2)}`;
            }
        } else {
            if (precosOrdenadosSouvenir.length > 1) {
                precosOrdenadosSouvenir = `R$${precosOrdenadosSouvenir[precosOrdenadosSouvenir.length-1].price.toFixed(2)} - R$${precosOrdenadosSouvenir[0].price.toFixed(2)}`;
            } else if (precosOrdenadosSouvenir.length === 1) {
                precosOrdenadosSouvenir = `R$${precosOrdenadosSouvenir[0].price.toFixed(2)}`;
            }
        }
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
                <div className={estilos.divPrecos}>
                    <p className={estilos.preco}> {precosOrdenados}</p>
                    {precosOrdenadosStattrak ? <p className={estilos.precoEspecial} style={{color: precoStattrak}}>{precosOrdenadosStattrak}</p> : ""}
                    {precosOrdenadosSouvenir ? <p className={estilos.precoEspecial} style={{color: precoSouvenir}}>{precosOrdenadosSouvenir}</p> : ""}
                </div>
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