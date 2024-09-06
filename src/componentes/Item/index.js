import React from "react";
import { Link } from "react-router-dom";
import estilos from "./Item.module.css";

function Item(props) {
    const estiloBorda = "10px solid " + props.item.rarity.color;
    return (
        <Link to={`/skins/${props.item.id}`} className={estilos.link}>
            <li style={{borderBottom: estiloBorda}}>
                <div>
                    <img alt='Skin' src={props.item.image}/>
                    <p>{props.item.name}</p>
                </div>
                <div>
                    <p>{props.item.category.name === null ? "Sem categoria" : props.item.category.name}</p>
                    {
                        props.item.collections === undefined || props.item.collections.length === 0 ? <p>Sem coleção</p> : 
                        props.item.collections.map((colecao) => <img alt="Logo da coleção" key={colecao.id} src={colecao.image} width="50px"/>)
                    }
                </div>
            </li>
        </Link>
    )
}

export default Item;