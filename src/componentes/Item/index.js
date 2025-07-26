import React from "react";
import { Link } from "react-router-dom";
import estilos from "./Item.module.css";
import { ordenarPrecos } from "../DadosApi/functions";

function Item(props) {
    const estiloBorda = "10px solid " + props.item.rarity.color;

    const nomeArma = props.item.name.split(" | ")[0];
    const patternArma = props.item.pattern ? props.item.pattern.name : "Vanilla";

    let precosOrdenados = ordenarPrecos(props.item.wears);
    let precosOrdenadosEspecial = "";

    if (props.item.wears_stattrak) {
        precosOrdenadosEspecial = ordenarPrecos(props.item.wears_stattrak);
    } else if (props.item.wears_souvenir) {
        precosOrdenadosEspecial = ordenarPrecos(props.item.wears_souvenir);
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

    if (precosOrdenadosEspecial.length === 0) {
        precosOrdenadosEspecial = "";
    } else {
        if (precosOrdenadosEspecial && precosOrdenadosEspecial[0].price === 0) {
            if (precosOrdenadosEspecial.length > 1) {
                precosOrdenadosEspecial = `R$${precosOrdenadosEspecial[precosOrdenadosEspecial.length-1].price.toFixed(2)} - R$${precosOrdenadosEspecial[1].price.toFixed(2)}`;
            } else if (precosOrdenadosEspecial.length === 1) {
                precosOrdenadosEspecial = `R$${precosOrdenadosEspecial[1].price.toFixed(2)}`;
            }
        } else {
            if (precosOrdenadosEspecial.length > 1) {
                precosOrdenadosEspecial = `R$${precosOrdenadosEspecial[precosOrdenadosEspecial.length-1].price.toFixed(2)} - R$${precosOrdenadosEspecial[0].price.toFixed(2)}`;
            } else if (precosOrdenadosEspecial.length === 1) {
                precosOrdenadosEspecial = `R$${precosOrdenadosEspecial[0].price.toFixed(2)}`;
            }
        }
    }

    return (
        <Link to={`/skins/${props.item.id}`} className={estilos.link}>
            <li style={{borderBottom: estiloBorda}}>
                <div className={estilos.divNome}>
                    <p>{nomeArma}</p>
                    <h1>{patternArma}</h1>
                </div>
                <div>
                    <img alt='Skin' src={props.item.image}/>
                </div>
                <div className={estilos.divPrecos}>
                    <p className={estilos.preco}> {precosOrdenados}</p>
                    {precosOrdenadosEspecial ? <p className={estilos.precoEspecial}> {precosOrdenadosEspecial}</p> : ""}
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