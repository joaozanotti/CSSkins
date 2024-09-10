import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import estilos from './NaoEncontrada.module.css';
import Main from '../../componentes/Main';

function NaoEncontrada() {
    useEffect(() => { document.title = "CS SKINS | Erro 404"; }, []);

    const navegar = useNavigate();

    return (
        <Main>
            <div className={estilos.error}>
                <h1>Erro 404: Página não encontrada! 🕹️</h1>
                <img src="/images/error.gif" alt="Sobre Nos"/>
                <p>
                    Tudo bem, erros acontecem. Talvez a página tenha sido movida, removida ou até mesmo nunca existiu.
                    Não se preocupe, confira as opções abaixo para voltar à ação:
                </p>
                <div>
                    <button className={estilos.botaoRedirecionar} onClick={() => navegar("/")}>
                        Retornar ao lobby<br/>(Ir para a página inicial)
                    </button>
                    <button className={estilos.botaoRedirecionar} onClick={() => navegar(-1)}>
                        Respawnar<br/>(Voltar à página anterior)
                    </button>
                    <button className={estilos.botaoRedirecionar} onClick={() => navegar("/skins")}>
                        Abrir o inventário<br/>(Ver as skins)
                    </button>
                </div>
            </div>
        </Main>
    )
}

export default NaoEncontrada;