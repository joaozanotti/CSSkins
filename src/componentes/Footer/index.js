import estilos from './Footer.module.css';
import { Icon } from '@iconify/react/dist/iconify.js'

function Footer(props) {
    return (
        <footer>
            <span>Página desenvolvida por {props.autor}</span>       
            <div>
                <a href="https://github.com/joaozanotti">
                    <Icon className={estilos.footerIconify} icon="mdi:github"></Icon>
                </a>
            </div>        
        </footer>
    )
}

export default Footer;