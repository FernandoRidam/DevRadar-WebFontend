import React, { useState, useEffect } from 'react'

import './styles.css';

export default function DevForm({ onSubmit }) {
  const [ github_username, setGithub_username ] = useState('');
  const [ techs, setTechs ] = useState('');
  const [ latitude, setLatitude ] = useState('');
  const [ longitude, setLongitude ] = useState('');

  async function handleSubmit( event ) {
    event.preventDefault();

    await onSubmit({
      github_username,
      techs,
      longitude,
      latitude,
    });

    setGithub_username('');
    setTechs('');
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ( position ) => {
        const { latitude, longitude } = position.coords;

        setLatitude( latitude );
        setLongitude( longitude );
      },

      ( err ) => {
        console.log( err );
      },

      {
        timeout: 30000,
      }
    );
  }, []);

  return(
    <form onSubmit={ handleSubmit }>
      <div className="input-block">
        <label htmlFor="github_username">Usuário do Github</label>
        <input
          name="github_username"
          id="github_username"
          value={ github_username }
          onChange={ event => setGithub_username( event.target.value )}
          required
        />
      </div>

      <div className="input-block">
        <label htmlFor="techs">Tecnologias</label>
        <input
          name="techs"
          id="techs"
          value={ techs }
          onChange={ event => setTechs( event.target.value )}
          required
        />
      </div>

      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input
            type="number"
            name="latitude"
            id="latitude"
            value={ latitude }
            onChange={ event => setLatitude( event.target.value )}
            required
          />
        </div>

        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input
            type="number"
            name="longitude"
            id="longitude"
            value={ longitude }
            onChange={ event => setLongitude( event.target.value )}
            required
          />
        </div>
      </div>

      <button type="submit">Salvar</button>
    </form>
  )
};