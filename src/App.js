import React, { useEffect, useState } from 'react';

// Componente: Bloco isolado de HTML, CSS e JS que não interfere no restante...
// Propriedade: Informaçãoes que um componente PAI passa para o componente FILHO...
// Estado: Informações mantidas pelo componente ( Imutável )...

import './global.css';
import './App.css';
import './Main.css';
import './Sidebar.css';
import api from './services/api';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

export default function App() {
  const [ devs, setDevs ] = useState([]);

  useEffect(() => {
    async function getDevs() {
      const response = await api.get('/devs');

      setDevs( response.data );
    };

    getDevs();
  }, []);

  async function handleAddDev( data ) {
    const response = await api.post('/devs', data);
    
    setDevs([ ...devs, response.data ]);
  };

  return (
    <div className="App">
      <aside>
        <strong>Cadastrar</strong>

        <DevForm onSubmit={ handleAddDev }/>
      </aside>

      <main>
        <ul>
          {
            devs.length !== 0 ? devs.map( dev => (
              <DevItem
                key={ dev._id}
                data={ dev }
              />
            )) : (
              <h1 className="empty">Nenhum dev encontrado!</h1>
            )
          }
        </ul>
      </main>
    </div>
  );
};
