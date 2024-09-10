import Sobre from './paginas/Sobre';
import NaoEncontrada from './paginas/NaoEncontrada';
import ItemPage from './paginas/ItemPage';
import estilos from './App.module.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import ListagemSkins from './paginas/ListagemSkins';
import Header from './componentes/Header';
import Footer from './componentes/Footer';
import Inicio from './paginas/Inicio';
import Main from './componentes/Main';

function App() {
  const [vetSkins, setSkins] = useState([]);
  const [nome, setNome] = useState("");
  const [inputNome, setInputNome] = useState("");
  const [idCategoria, setCategoria] = useState("");
  const [ordenacao, setOrdenacao] = useState("alfabetica");
  const qtdPadraoItens = 50;
  const [qtdItens, setQtdItens] = useState(qtdPadraoItens);

  const resetarPesquisa = () => {
    setInputNome("");
    setNome("");
    setCategoria("");
    setOrdenacao("alfabetica");
    resetarQtdItens();
  }

  const aumentarQtdItens = () => {
    setQtdItens(qtdItens + qtdPadraoItens);        
  }
  const resetarQtdItens = () => {
    setQtdItens(qtdPadraoItens);
  }

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
              />
            }/>
            <Route path="/sobre" element={<Sobre/>}/>
            <Route path="/skins/:id" element={<ItemPage vetSkins={vetSkins} resetarQtdItens={resetarQtdItens}/>}/>
            <Route path="/*" element={<NaoEncontrada/>}/>
          </Routes>
        </Main>
        <Footer autor="João Vitor"/>
      </BrowserRouter>
    </div>
  )
}

export default App;