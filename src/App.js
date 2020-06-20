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

  async function handleAddRepository(title, url, techs) {
    const response = await api.post('repositories', {
      title: `New repository: ${Date.now()}`,
      url: `http://github.com/leonardodiegues`,
      techs: ['NodeJS', 'ReactJS'],
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const endpoint = `repositories/${id}`;
    const _ = await api.delete(endpoint);
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
