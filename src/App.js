import Sobre from './paginas/Sobre';
import NaoEncontrada from './paginas/NaoEncontrada';
import ItemPage from './paginas/ItemPage';
import estilos from './App.module.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import ListagemSkins from './paginas/ListagemSkins';
import Header from './componentes/Header';
import Footer from './componentes/Footer';
import Inicio from './paginas/Inicio';
import Main from './componentes/Main';
import BotaoVoltarTopo from './componentes/BotaoVoltarTopo';

const qtdPadraoItens = 50;

function App() {
  const [vetSkins, setSkins] = useState([]);
  const [dataAtualizacao, setDataAtualizacao] = useState(null);
  const [nome, setNome] = useState("");
  const [inputNome, setInputNome] = useState("");
  const [idCategoria, setCategoria] = useState("");
  const [ordenacao, setOrdenacao] = useState("alfabetica");
  const [qtdItens, setQtdItens] = useState(qtdPadraoItens);
  const posicaoRolagemListagem = useRef(null);

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      const restauracaoAnterior = window.history.scrollRestoration;
      window.history.scrollRestoration = 'manual';

      return () => {
        window.history.scrollRestoration = restauracaoAnterior;
      };
    }
  }, []);

  const resetarPesquisa = () => {
    setInputNome("");
    setNome("");
    setCategoria("");
    setOrdenacao("alfabetica");
    resetarQtdItens();
  }

  const aumentarQtdItens = useCallback(() => {
    setQtdItens((qtdAtual) => qtdAtual + qtdPadraoItens);
  }, []);

  const resetarQtdItens = () => {
    setQtdItens(qtdPadraoItens);
  }

  const salvarPosicaoRolagemListagem = useCallback((evento) => {
    if (evento.button === 0 && !evento.metaKey && !evento.altKey && !evento.ctrlKey && !evento.shiftKey) {
      posicaoRolagemListagem.current = window.scrollY;
    }
  }, []);

  const restaurarRolagemListagem = useCallback(() => {
    posicaoRolagemListagem.current = null;
  }, []);

  return (
    <div className={estilos.container}>
      <BrowserRouter>
        <Header/>
        <Main>
          <Routes>
            <Route path="/" element={<Inicio/>}/>
            <Route path="/skins" element={
              <ListagemSkins
                vetSkins={vetSkins} setSkins={setSkins}
                dataAtualizacao={dataAtualizacao} setDataAtualizacao={setDataAtualizacao}
                nome={nome} setNome={setNome}
                inputNome={inputNome} setInputNome={setInputNome}
                idCategoria={idCategoria} setCategoria={setCategoria}
                ordenacao={ordenacao} setOrdenacao={setOrdenacao}
                qtdItens={qtdItens} setQtdItens={setQtdItens}
                aumentarQtdItens={aumentarQtdItens} resetarQtdItens={resetarQtdItens}
                resetarPesquisa={resetarPesquisa}
                posicaoRolagem={posicaoRolagemListagem}
                restaurarRolagem={restaurarRolagemListagem}
                salvarPosicaoRolagem={salvarPosicaoRolagemListagem}
              />
            }/>
            <Route path="/sobre" element={<Sobre/>}/>
            <Route path="/skins/:id" element={<ItemPage vetSkins={vetSkins}/>}/>
            <Route path="/*" element={<NaoEncontrada/>}/>
          </Routes>
        </Main>
        <Footer autor="João Vitor"/>
        <BotaoVoltarTopo resetarQtdItens={resetarQtdItens}/>
      </BrowserRouter>
    </div>
  )
}

export default App;
