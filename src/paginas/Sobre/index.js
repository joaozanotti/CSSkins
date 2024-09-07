import { useEffect } from 'react';
import Footer from '../../componentes/Footer';
import Header from '../../componentes/Header';
import Main from '../../componentes/Main';
import estilos from './Sobre.module.css';

function Sobre() {
    useEffect(() => { document.title = "CS SKINS | Sobre"; }, []);

    return (
        <>
            <Header linkAtivo="sobre"/>
            <Main>
            <div className={estilos.sobrenos}>
                <img src="/images/logo.png" alt="Sobre Nos"/>
                <div>
                    <h1> Sobre mim </h1>
                    <p>
                        <b>Lorem ipsum dolor</b> sit amet, consectetur adipiscing elit. Curabitur eu porttitor felis, eu commodo urna. In nec porttitor nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam eget fringilla nisi. Ut eu tortor nec ligula vehicula faucibus ac nec risus. Mauris ut elementum tellus. Morbi sed ultrices sem. Vivamus et risus ornare, ornare lorem sed, ultricies sapien. Donec porttitor cursus dui ac dapibus. Curabitur aliquet a lacus vel pulvinar. Proin ac euismod erat. Nullam eget libero blandit, venenatis felis eu, laoreet sem. Pellentesque orci libero, molestie ac massa convallis, interdum vehicula tortor. Sed non aliquet est
                    </p>
                    <p>
                        <b>Donec ut tristique </b> ante, non lacinia arcu. Ut lobortis ipsum ut ipsum aliquet, ullamcorper faucibus lorem luctus. Vestibulum porttitor commodo lectus sed vulputate. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque et ligula maximus, consequat erat non, scelerisque nulla. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed ultrices odio pellentesque nibh viverra, sed lobortis justo convallis. Fusce metus ante, lacinia in feugiat eu, pellentesque sed metus. Vivamus sit amet est bibendum, dictum enim sed, hendrerit libero. Ut efficitur ligula id volutpat maximus.
                    </p>
                </div>
            </div>
            </Main>
            <Footer autor="João Vitor"/>
        </>
    )
}

export default Sobre;