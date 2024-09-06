import { Icon } from "@iconify/react/dist/iconify.js";
import estilos from "./MenuFiltros.module.css";

function MenuFiltros(props) {

    const handleSubmit = (e) => {
        e.preventDefault();
        props.setNome(props.inputNome.trim());
        props.resetarQtdItens();
    }

    const handleSelectCategoria = (e) => {
        e.preventDefault();
        props.setCategoria(e.target.value);
        props.resetarQtdItens();
    }

    const handleSelectOrdenacao = (e) => {
        e.preventDefault();
        props.setOrdenacao(e.target.value);
        props.resetarQtdItens();
    }

    return (
        <div className={estilos.menu}>
            <section>
                <form onSubmit={handleSubmit}>
                    <p>Nome da skin:</p>
                    <input type="text" placeholder="Digite o nome..." value={props.inputNome} onChange={(e) => {
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
                <select onChange={handleSelectCategoria} value={props.idCategoria}>
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
                <select onChange={handleSelectOrdenacao} value={props.ordenacao}>
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