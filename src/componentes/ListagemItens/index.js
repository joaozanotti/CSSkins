import Item from "../Item";
import estilos from "./ListagemItens.module.css";
import React from "react";

function ListagemItens(props) {
    return (
        <div className={estilos.carrossel}>
            <h1>Listagem de skins</h1>
            <ul>
                {props.skins.map((skin) => (
                    <Item key={skin.id} item={skin}/>
                ))}
            </ul>
        </div>
    )
}

export default ListagemItens;