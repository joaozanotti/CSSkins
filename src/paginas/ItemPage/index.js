import { Fragment, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import estilos from './ItemPage.module.css';
import NaoEncontrada from '../NaoEncontrada';
import { Icon } from '@iconify/react/dist/iconify.js';
import { ordenarDesgaste } from '../../componentes/DadosApi/functions';

function formatarDescricao(description = '') {
    return description.split(/(<i>[\s\S]*?<\/i>)/gi).map((parte, indiceParte) => {
        const ehItalico = /^<i>[\s\S]*<\/i>$/i.test(parte);
        const texto = parte
            .replace(/^<i>|<\/i>$/gi, '')
            .replace(/\\"/g, '"');

        const conteudo = texto.split(/\\n|\r?\n/).map((linha, indiceLinha) => (
            <Fragment key={indiceLinha}>
                {indiceLinha > 0 && <br />}
                {linha}
            </Fragment>
        ));

        return ehItalico
            ? <em key={indiceParte}>{conteudo}</em>
            : <Fragment key={indiceParte}>{conteudo}</Fragment>;
    });
}

function ItemPage(props) {
    useEffect(() => {  document.title = "CS SKINS | Skins"; }, []);

    window.scrollTo({
        top: 0,
        left: 0
    });

    const navegar = useNavigate();
    const parametros = useParams();

    const post = props.vetSkins.find(elemento => elemento.id === parametros.id);
    if (!post) {
        return <NaoEncontrada/>;
    }

    const exibirPrecos = post.precosDisponiveis;
    const moeda = post.moeda || "R$";
    const descricao = formatarDescricao(post.description);

    // Ordenando os desgastes para exibição de acordo com o ID
    let desgastesOrdenados = ordenarDesgaste(post.wears);
    let desgastesOrdenadosStattrak = [];
    let desgastesOrdenadosSouvenir = [];

    if (post.wears_stattrak) {
        desgastesOrdenadosStattrak = ordenarDesgaste(post.wears_stattrak);
    }
    if (post.wears_souvenir) {
        desgastesOrdenadosSouvenir = ordenarDesgaste(post.wears_souvenir);
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
                                        <p className={estilos.description} key={index+1}>{exibirPrecos && wear.price !== 0 ? `${moeda}${wear.price.toFixed(2)}` : ""}</p>
                                    </div>
                                )
                            })
                        }
                        {
                            post.wears_stattrak === null || post.wears_stattrak.length === 0 ? "" :
                            desgastesOrdenadosStattrak.map((wear, index) => {
                                return (
                                    <div key={wear.id}>
                                        <p className={estilos.descriptionStattrak} key={index}>{wear.name}</p>
                                        <p className={estilos.description} key={index+1}>{exibirPrecos && wear.price !== 0 ? `${moeda}${wear.price.toFixed(2)}` : ""}</p>
                                    </div>
                                )
                            })
                        }
                        {
                            post.wears_souvenir === null || post.wears_souvenir.length === 0 ? "" :
                            desgastesOrdenadosSouvenir.map((wear, index) => {
                                return (
                                    <div key={wear.id}>
                                        <p className={estilos.descriptionSouvenir} key={index}>{wear.name}</p>
                                        <p className={estilos.description} key={index+1}>{exibirPrecos && wear.price !== 0 ? `${moeda}${wear.price.toFixed(2)}` : ""}</p>
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
