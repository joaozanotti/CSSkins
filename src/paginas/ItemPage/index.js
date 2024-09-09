import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import estilos from './ItemPage.module.css';
import NaoEncontrada from '../NaoEncontrada';
import Header from '../../componentes/Header';
import Main from '../../componentes/Main';
import Footer from '../../componentes/Footer';
import { Icon } from '@iconify/react/dist/iconify.js';

function ItemPage(props) {
    useEffect(() => { document.title = "CS SKINS | Skins"; }, []);

    window.scrollTo({
        top: 0,
        left: 0
    });

    const [vetPesquisa, setPesquisa] = useState([]);

    useEffect(() => { fetchData(); }, []);

    const fetchData = async () => {
        try { 
            const response = await fetch("https://bymykel.github.io/CSGO-API/api/en/skins.json");
            const data = await response.json();
            setPesquisa(data);

        } catch (error) {
            console.error('Erro ao buscar dados da API:', error); 
        }
    }

    const navegar = useNavigate();
    const parametros = useParams();

    const post = vetPesquisa.find(elemento => elemento.id === parametros.id);
    
    if (!post) {
        return <p className={estilos.loading}><Icon icon="eos-icons:loading"/></p>
    }

    console.log(post);

    // A descrição de alguns itens da API vêm com alguns elementos html indesejados que atrapalham na exibição
    // Estes são: "\n\n<i>" no meio da string e "</i>" no final da string

    // Pegando a posição dos elementos para localizá-los e depois removê-los
    const posInicioStrIndesejada = post.description.indexOf("<i>");
    const posFimStrIndesejada = post.description.indexOf("</i>");
    let descricao;
    
    if (posInicioStrIndesejada !== -1) {
        // Pegando a string: do início até antes do \n\n<i>
        const inicioDescricao = post.description.slice(0, posInicioStrIndesejada-4);
        // Pegando a string: depois do \n\n<i> até antes do </i>
        const fimDescricao = post.description.slice(posInicioStrIndesejada+3, posFimStrIndesejada);
        // Montando a string completa
        descricao = inicioDescricao + " " + fimDescricao + ".";

    } else {
        descricao = post.description;
    }

    return (   
        <>
            <Header linkAtivo="skins"/>
            <Main>         
                <div className={estilos.container}>
                        <button className={estilos.botaoVoltar} onClick={() => {
                            props.resetarQtdItens();
                            navegar(-1);
                        }}><Icon icon="material-symbols:arrow-top-left-rounded"/></button>
                    <div className={estilos.item}>
                        <div className={estilos.skin}>
                            <h1>{post.name}</h1>
                            <img src={post.image} alt="Skin"/>
                            <p>{descricao}</p>
                        </div>
                        <div className={estilos.info}>
                            <section>
                                <p>Coleção:</p>
                                {
                                    post.collections === undefined || post.collections.length === 0 ? <p className={estilos.description}>Sem coleção</p> : 
                                    post.collections.map((colecao, indice) => {
                                        return (
                                            <div key={colecao.id}>
                                                <img alt="Logo da coleção" src={colecao.image} width="50px"/>
                                                <p className={estilos.description} key={indice}>{colecao.name}</p>
                                            </div>
                                        )
                                    })
                                }
                            </section>
                            <section>
                                <p>Caixas:</p>
                                {
                                    post.crates === undefined || post.crates.length === 0 ? <p className={estilos.description}>Sem caixas</p> : 
                                    post.crates.map((caixa) => {
                                        return (
                                            <div key={caixa.id}>
                                                <img alt="Logo da caixa" src={caixa.image} width="50px"/>
                                                <p className={estilos.description}>{caixa.name}</p>
                                            </div>
                                        )
                                    })
                                }
                            </section>
                            <section>
                                <p>Raridade:</p>
                                <div className={estilos.rarity}>
                                    <p style={{color: post.rarity.color}}>{post.rarity.name}</p>
                                    <div style={{backgroundColor: post.rarity.color}} className={estilos.rarityColor}></div>
                                </div>
                            </section>
                            <section>
                                <p>Categoria:</p>
                                <p className={estilos.description}>{post.category.name === null ? "Sem categoria" : post.category.name}</p>
                            </section>
                            <section>
                                <p>Equipe:</p>
                                <p className={estilos.description}>{post.team.name}</p>
                            </section>
                        </div>
                    </div>
                </div>
            </Main>
            <Footer autor="João Vitor"/>
        </>
    )
}

export default ItemPage;