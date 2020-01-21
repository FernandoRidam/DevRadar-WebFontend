import React from 'react';

import './styles.css';

export default function DevItem({ data }) {
  return (
    <li className="dev-item">
      <header>
        <img src={ data.avatar_url } alt={ data.name }/>

        <div className="user-info">
          <strong>{ data.name }</strong>

          <span>{ data.techs.join(', ') }</span>
        </div>
      </header>

      <p>{ data.bio }</p>

      <a href={`https://github.com/${ data.github_username }`}>Acessar Perfil do GitHub...</a>
    </li>
  );
};