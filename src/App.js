/**
 * Objetivos
 *
 * 1. Listar os repositórios da sua API: Deve ser capaz de criar uma lista com
 *    o campo title de todos os repositórios que estão cadastrados na sua API.
 *
 * 2. Adicionar um repositório a sua API: Deve ser capaz de adicionar um novo
 *    item na sua API através de um botão com o texto Adicionar e, após a
 *    criação, deve ser capaz de exibir o nome dele após o cadastro.
 *
 * 3. Remover um repositório da sua API: Para cada item da sua lista, deve
 *    possuir um botão com o texto Remover que, ao clicar, irá chamar uma
 *    função para remover esse item da lista do seu frontend e da sua API.
 */

import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    }, []);
  });

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `New repository: ${Date.now()}`,
      url: `http://github.com/leonardodiegues`,
      techs: ['NodeJS', 'ReactJS'],
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const repository = repositories.findIndex(id);

    const endpoint = `repositories/${repository.id}`;
    const response = await api.delete(endpoint);

    setRepositories([repositories.splice(id, 1)]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => <li key={repo.id}>{repo.title}</li>)}
        <li>
          <button onClick={() => handleRemoveRepository(1)}>
            Remover
          </button>
        </li>
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
