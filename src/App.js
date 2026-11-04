import Sobre from './paginas/Sobre';
import NaoEncontrada from './paginas/NaoEncontrada';
import ItemPage from './paginas/ItemPage';
import estilos from './App.module.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useCallback, useState } from 'react';
import ListagemSkins from './paginas/ListagemSkins';
import Header from './componentes/Header';
import Footer from './componentes/Footer';
import Inicio from './paginas/Inicio';
import Main from './componentes/Main';
import BotaoVoltarTopo from './componentes/BotaoVoltarTopo';

const QTD_PADRAO_ITENS = 50;

function App() {
  const [vetSkins, setSkins] = useState([]);
  const [nome, setNome] = useState("");
  const [inputNome, setInputNome] = useState("");
  const [idCategoria, setCategoria] = useState("");
  const [ordenacao, setOrdenacao] = useState("alfabetica");
  const [qtdItens, setQtdItens] = useState(QTD_PADRAO_ITENS);
  const [posicaoRolagemListagem, setPosicaoRolagemListagem] = useState(null);

  const resetarPesquisa = () => {
    setInputNome("");
    setNome("");
    setCategoria("");
    setOrdenacao("alfabetica");
    resetarQtdItens();
  }

  const aumentarQtdItens = useCallback(() => {
    setQtdItens((qtdAtual) => qtdAtual + QTD_PADRAO_ITENS);
  }, []);

  const resetarQtdItens = () => {
    setQtdItens(QTD_PADRAO_ITENS);
  }

  const salvarPosicaoRolagemListagem = useCallback(() => {
    setPosicaoRolagemListagem(window.scrollY);
  }, []);

  const restaurarRolagemListagem = useCallback(() => {
    setPosicaoRolagemListagem(null);
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
