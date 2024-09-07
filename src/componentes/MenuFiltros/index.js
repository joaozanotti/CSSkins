import { Icon } from "@iconify/react/dist/iconify.js";
import estilos from "./MenuFiltros.module.css";
import React, { useRef } from "react";

function MenuFiltros(props) {
    const inputNameRef = useRef(null);
    const selectCategoryRef = useRef(null);
    const selectOrdenationRef = useRef(null);

    const handleInputBlur = () => {
        inputNameRef.current.blur();
    };

    const handleSelectCategoryBlur = () => {
        selectCategoryRef.current.blur();
    };

    const handleSelectOrdenationBlur = () => {
        selectOrdenationRef.current.blur();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.setNome(props.inputNome.trim());
        props.resetarQtdItens();
        handleInputBlur();
    }

    const handleSelectCategoria = (e) => {
        e.preventDefault();
        props.setCategoria(e.target.value);
        props.resetarQtdItens();
        handleSelectCategoryBlur();
    }

    const handleSelectOrdenacao = (e) => {
        e.preventDefault();
        props.setOrdenacao(e.target.value);
        props.resetarQtdItens();
        handleSelectOrdenationBlur();
    }

    return (
        <div className={estilos.menu}>
            <section>
                <form onSubmit={handleSubmit}>
                    <p>Nome da skin:</p>
                    <input ref={inputNameRef} type="text" placeholder="Digite o nome..." value={props.inputNome} onChange={(e) => {
                        props.setInputNome(e.target.value);
                        if (e.target.key === "Enter") {
                            handleSubmit();
                        }
                    }}/>
                    <button type="submit"><Icon icon="material-symbols:search"/></button>
                </form>
            </section>
            <section>
                <p>Categoria:</p>
                <select ref={selectCategoryRef} onChange={handleSelectCategoria} value={props.idCategoria}>
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
                <select ref={selectOrdenationRef} onChange={handleSelectOrdenacao} value={props.ordenacao}>
                    <option value="alfabetica">Nome</option>
                    <option value="raridade">Raridade</option>
                </select>
            </section>
            <section>
                <button className={estilos.botaoResetar} onClick={props.resetarPesquisa}>Resetar pesquisa</button>
            </section>
        </div>
    )
}

export default MenuFiltros;