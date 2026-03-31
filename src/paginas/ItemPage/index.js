import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import estilos from './ItemPage.module.css';
import NaoEncontrada from '../NaoEncontrada';
import { Icon } from '@iconify/react/dist/iconify.js';
import { ordenarDesgaste } from '../../componentes/DadosApi/functions';

function ItemPage(props) {
    useEffect(() => {  document.title = "CS SKINS | Skins"; }, []);

    window.scrollTo({
        top: 0,
        left: 0
    });

    const navegar = useNavigate();
    const parametros = useParams();

    const post = props.vetSkins.find(elemento => elemento.id === parametros.id);
    let descricao;
    
    if (!post) {
        return <NaoEncontrada/>;

    } else {
        // A descrição de alguns itens da API vêm com alguns elementos html indesejados que atrapalham na exibição
        // Estes são: "\n\n<i>" no meio da string e "</i>" no final da string

        // Pegando a posição dos elementos para localizá-los e depois removê-los
        const posInicioStrIndesejada = post.description.indexOf("<i>");
        const posFimStrIndesejada = post.description.indexOf("</i>");
        
        if (posInicioStrIndesejada !== -1) {
            // Pegando a string: do início até antes do \n\n<i>
            const inicioDescricao = post.description.slice(0, posInicioStrIndesejada-4);
            // Pegando a string: depois do \n\n<i> até antes do </i>
            const fimDescricao = post.description.slice(posInicioStrIndesejada+3, posFimStrIndesejada);
            // Montando a string completa
            descricao = <> {inicioDescricao} <br/><br/> {fimDescricao}. </>;

        } else {
            descricao = post.description;
        }
    }

    let desgastesOrdenados = ordenarDesgaste(post.wears);
    let desgastesOrdenadosEspecial = "";
    if (post.wears_stattrak) {
        desgastesOrdenadosEspecial = ordenarDesgaste(post.wears_stattrak);
    } else if (post.wears_souvenir) {
        desgastesOrdenadosEspecial = ordenarDesgaste(post.wears_souvenir);
    }

    return (
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
                <div className={estilos.prices}>
                    <section>
                        <p className={estilos.titleSection}>Desgastes e Preços:</p>
                        {
                            post.wears === null || post.wears.length === 0 ? "" : 
                            desgastesOrdenados.map((wear, index) => {
                                return (
                                    <div key={wear.id}>
                                        <p className={estilos.descriptionNormal} key={index}>{wear.name}</p>
                                        <p className={estilos.description} key={index+1}>{wear.price !== 0 ? `R$${wear.price.toFixed(2)}` : ""}</p>
                                    </div>
                                )
                            })
                        }
                        {
                            post.wears_stattrak === null || post.wears_stattrak.length === 0 ? "" : 
                            desgastesOrdenadosEspecial.map((wear, index) => {
                                return (
                                    <div key={wear.id}>
                                        <p className={estilos.descriptionStattrak} key={index}>{wear.name}</p>
                                        <p className={estilos.description} key={index+1}>{wear.price !== 0 ? `R$${wear.price.toFixed(2)}` : ""}</p>
                                    </div>
                                )
                            })
                        }
                        {
                            post.wears_souvenir === null || post.wears_souvenir.length === 0 ? "" : 
                            desgastesOrdenadosEspecial.map((wear, index) => {
                                return (
                                    <div key={wear.id}>
                                        <p className={estilos.descriptionSouvenir} key={index}>{wear.name}</p>
                                        <p className={estilos.description} key={index+1}>{wear.price !== 0 ? `R$${wear.price.toFixed(2)}` : ""}</p>
                                    </div>
                                )
                            })
                        }
                    </section>
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
                </div>
            </div>
        </div>
    )
}

export default ItemPage;