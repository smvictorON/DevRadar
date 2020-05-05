import React, {useEffect, useState} from 'react';
import api from './services/api'; 
import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevItem from './components/DevItem/index'
import Devform from './components/DevForm/index'

//Componente : bloco de codigo que não afeta o restante da aplicação
//Propriedade : informaçoes que o componente pai passa pro filho
//Estado : informaçoes mantidas pelo componente

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs(){
      const responde = await api.get('/devs');

      setDevs(responde.data);
    }

    loadDevs();
  }, [])
    
  async function handleAddDev(data){
    const response = await api.post('/devs',data);   

    setDevs([...devs,response.data])
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <Devform onSubmit={handleAddDev}></Devform>
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev}></DevItem>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
