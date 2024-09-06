import estilos from './Header.module.css';
import MenuNav from '../MenuNav';

function Header() {
    return (
        <header>
            <div className={estilos["header-logo"]}>
                <img alt="Logo do site" src="/images/logo-branca.png"/>
            </div>    
            <MenuNav/> 
        </header>
    )
}

export default Header;