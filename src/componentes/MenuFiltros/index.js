import { Icon } from "@iconify/react/dist/iconify.js";
import estilos from "./MenuFiltros.module.css";
import React, { useRef, useState } from "react";

function MenuFiltros(props) {
    const [inputNome, setInputNome] = useState("");

    const resetarPesquisa = () => {
        setInputNome("");
        props.setNome("");
        props.setCategoria("");
        props.setOrdenacao("alfabetica");
        props.resetarQtdItens();
    }

    const inputNameRef = useRef(null);
    const selectCatRef = useRef(null);
    const selectOrdRef = useRef(null);

    const handleBlurAll = () => {
        inputNameRef.current.blur();
        selectCatRef.current.blur();
        selectOrdRef.current.blur();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.setNome(inputNome.trim());
        props.resetarQtdItens();
        handleBlurAll();
    }

    const handleSelectCategoria = (e) => {
        e.preventDefault();
        props.setCategoria(e.target.value);
        props.resetarQtdItens();
        handleBlurAll();
    }

    const handleSelectOrdenacao = (e) => {
        e.preventDefault();
        props.setOrdenacao(e.target.value);
        props.resetarQtdItens();
        handleBlurAll();
    }

    return (
        <div className={estilos.menu}>
            <section>
                <form onSubmit={handleSubmit}>
                    <p>Nome da skin:</p>
                    <input ref={inputNameRef} type="text" placeholder="Digite o nome..." value={inputNome} onChange={(e) => {
                        setInputNome(e.target.value);
                        if (e.target.key === "Enter") {
                            handleSubmit();
                        }
                    }}/>
                    <button type="submit"><Icon icon="material-symbols:search"/></button>
                </form>
            </section>
            <section>
                <p>Categoria:</p>
                <select className={estilos.selectCategoria} ref={selectCatRef} onChange={handleSelectCategoria} value={props.idCategoria}>
                    <option value="">Todos</option>
                    <option value="csgo_inventory_weapon_category_pistols">Pistolas</option>
                    <option value="csgo_inventory_weapon_category_smgs">SMGs</option>
                    <option value="csgo_inventory_weapon_category_rifles">Rifles</option>
                    <option value="csgo_inventory_weapon_category_heavy">Pesadas</option>
                    <option value="sfui_invpanel_filter_melee">Facas</option>
                    <option value="sfui_invpanel_filter_gloves">Luvas</option>
                </select>
            </section>
            <section>
                <p>Ordenar por:</p>
                <select className={estilos.selectOrdenacao} ref={selectOrdRef} onChange={handleSelectOrdenacao} value={props.ordenacao}>
                    <option value="alfabetica">Nome</option>
                    <option value="menor-raridade">Menor raridade</option>
                    <option value="maior-raridade">Maior raridade</option>
                </select>
            </section>
            <section>
                <button className={estilos.botaoResetar} onClick={resetarPesquisa}>Resetar pesquisa</button>
            </section>
        </div>
    )
}

export default MenuFiltros;