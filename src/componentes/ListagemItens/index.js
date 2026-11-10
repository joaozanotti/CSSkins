import Item from "../Item";
import estilos from "./ListagemItens.module.css";
import React from "react";

function ListagemItens(props) {
    return (
        <div className={estilos.carrossel}>
            <h1>Listagem de skins</h1>
            <p className={props.dataAtualizacao ? estilos.dataAtualizacao : estilos.dataPendente}>
                Última atualização dos preços:{" "}
                {props.dataAtualizacao 
                ? new Date(props.dataAtualizacao).toLocaleString("pt-BR", { dateStyle: "short" })
                : ""}
            </p>
            <ul>
                {props.skins.map((skin) => (
                    <Item key={skin.id} item={skin} salvarPosicaoRolagem={props.salvarPosicaoRolagem}/>
                ))}
            </ul>
        </div>
    )
}

export default ListagemItens;
