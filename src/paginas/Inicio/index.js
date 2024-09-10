import { useEffect } from "react";
import Main from "../../componentes/Main";
import estilos from "./Inicio.module.css";
import { useNavigate } from "react-router-dom";

function Inicio() {
    useEffect(() => { document.title = "CS SKINS | Início"; }, []);
    const navegar = useNavigate();

    return (
        <Main>
            <div className={estilos.container}>
                <div className={estilos.inicio}>
                    <h1>Bem vindo ao CS SKINS!</h1>
                    <p>
                        Seja bem-vindo! Aqui se encontra o destino definitivo para os amantes de Counter-Strike 2 que buscam as skins mais exclusivas e populares do jogo! Utilizando uma API avançada, nós trazemos para você uma lista completa de skins de CS2, com detalhes minuciosos, como raridade, coleções, caixas e muito mais.
                    </p>
                    <p>
                        Nosso objetivo é oferecer uma experiência simples e direta para que você possa explorar, comparar e encontrar as melhores skins para personalizar seu arsenal no CS2. Seja você um colecionador de longa data ou um jogador que busca dar um toque especial ao seu jogo, nosso site é a ferramenta perfeita para encontrar aquela skin que vai fazer a diferença nas suas partidas.
                    </p>
                    <p>
                        Sinta-se à vontade para explorar nosso catálogo e ficar por dentro das últimas novidades do mundo das skins de CS2!
                    </p>
                    <button className={estilos.botaoSkins} onClick={() => navegar("/skins")}>Ver catálogo de skins ➜</button>
                </div>
                <img alt="Imagem do jogo CS2" src="https://assets.gamearena.gg/wp-content/uploads/2023/04/30004140/CS2-troca-de-tiro.jpg"/>
            </div>
        </Main>
    );
}

export default Inicio;