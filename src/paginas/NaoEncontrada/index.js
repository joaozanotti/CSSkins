import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import estilos from './NaoEncontrada.module.css';
import Header from '../../componentes/Header';
import Main from '../../componentes/Main';
import Footer from '../../componentes/Footer';

function NaoEncontrada() {
    useEffect(() => { document.title = "CS SKINS | Erro 404"; }, []);

    const navegar = useNavigate();

    return (
        <>
            <Header linkAtivo=""/>
            <Main>
                <div className={estilos.error}>
                    <img src="/images/react.png" alt="Sobre Nos"/>
                    <div>
                        <h1> Página não encontrada</h1>
                        <p>
                            Lamentavelmente não reconhecemos o link ou página que você deseja acessar. Favor revisar a página anterior.
                        </p>  
                        <button className={estilos.botaoError} onClick={() => navegar(-1)}>
                            Voltar
                        </button> 
                    </div>
                </div>
            </Main>
            <Footer autor="João Vitor"/>
        </>      
    )
}

export default NaoEncontrada;