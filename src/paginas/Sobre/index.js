import { useEffect } from 'react';
import estilos from './Sobre.module.css';

function Sobre() {
    useEffect(() => { document.title = "CS SKINS | Sobre"; }, []);

    return (
        <div className={estilos.sobrenos}>
            <img src="/images/logo.png" alt="Logo do site"/>
            <div>
                <h1>Sobre nós</h1>
                <p>
                    Somos apaixonados por Counter-Strike 2 e entendemos que as skins não são apenas uma maneira de personalizar seu jogo, mas também uma extensão do seu estilo e personalidade dentro do campo de batalha. Nosso site foi criado com o objetivo de ser uma plataforma completa e confiável para os jogadores que buscam informações detalhadas e atualizadas sobre as skins mais icônicas do CS2.
                </p>
                <p>
                    Nosso compromisso é com a comunidade CS2. Entendemos que, seja você um colecionador em busca das peças mais raras ou um jogador casual querendo dar aquele upgrade visual no seu inventário, todos merecem uma experiência fácil, rápida e completa. Por isso, focamos na clareza das informações e na navegação intuitiva, para que você possa encontrar o que precisa com poucos cliques.
                </p>
                <p>
                    Nosso site foi criado por jogadores, para jogadores. Estamos comprometidos em continuar melhorando, ouvindo o feedback da nossa comunidade e trazendo sempre o melhor conteúdo. Seja bem-vindo, e prepare-se para explorar o vasto e emocionante universo das skins de CS2!
                </p>
            </div>
        </div>
    )
}

export default Sobre;