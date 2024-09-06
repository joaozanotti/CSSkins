import { NavLink } from "react-router-dom";
import estilos from "./MenuNav.module.css";

function MenuNav() {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink 
                        to="/" 
                        className={({ isActive }) => isActive ? `${estilos.link} ${estilos.linkAtivo}` : estilos.link}
                    >Início</NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/skins" 
                        className={({ isActive }) => isActive ? `${estilos.link} ${estilos.linkAtivo}` : estilos.link}
                    >Skins</NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/sobre" 
                        className={({ isActive }) => isActive ? `${estilos.link} ${estilos.linkAtivo}` : estilos.link}
                    >Sobre</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default MenuNav;