import React, { useState, useEffect, FormEvent } from 'react';
import axios from "axios";
import Game, { GameProps } from './components/game';
import './App.css';

const api = axios.create({
  baseURL: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
  headers: {
    'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
    'x-rapidapi-key': '159a460b81msh0a7ee9316e0548fp1efde3jsn3d68e831414d'
  }
});

function App() {
  const [games, setGames] = useState([]);

  const [search, setSearch] = useState('');

  const [inputSearch, setInputSearch] = useState('');

  const [statusFilter, setStatusFilter] = useState('');

  const [statusInput, setStatusInput] = useState('Status');

  const [ordination, setOrdination] = useState('');

  let i = 0;

  function searchGames(e: FormEvent) {
    e.preventDefault();
    setSearch(inputSearch);
  }
  function filterOrder() {

    if (ordination === "Ordem Alfabética")
      listGamesAlphabetical();
    if (ordination === "Ordenar")
      listGames();
    if (ordination === "Ordem de Avaliação")
      console.log(ordination);
  }

  function filter(e: FormEvent) {
    e.preventDefault();

    filterOrder();
    setStatusInput(statusFilter);
  }

  function removeFilter() {
    setStatusFilter('Status');
    setOrdination('Ordenar');
  }

  async function listGames() {
    const response = await api.get('');
    setGames(response.data);
  }
  async function listGamesAlphabetical() {
    const response = await api.get('?sort-by=alphabetical');
    setGames(response.data);
  }

  useEffect(() => {
    listGames();
  }, []);
  return (
    <main id="page-main">
      <header id="page-header">
        <form className="search-block" onSubmit={searchGames}>
          <input
            type="text"
            value={inputSearch}
            max={4}
            onChange={e => { setInputSearch(e.target.value) }}
            placeholder="Procure seu jogo favorito"
          />
          <button className="submit-search" type="submit">
            <b>Pesquisar</b>
          </button>
        </form>
      </header>
      <form id="filter-block" onSubmit={filter}>
        <select
          name='ordination'
          value={ordination}
          onChange={e => {
            setOrdination(e.target.value)
          }}
          className="select-filter"
        >
          <option>Ordenar</option>
          <option>Ordem Alfabética</option>
          <option>Ordem de Avaliação (Desenvolvimento)</option>
        </select>
        <select
          name='status'
          value={statusFilter}
          onChange={e => {
            setStatusFilter(e.target.value)
          }}
          className="select-filter"
        >
          <option>Status</option>
          <option>Joguei</option>
          <option>Jogando</option>
          <option>Querendo Jogar</option>
        </select>
        <button onClick={removeFilter} className="remove-filter">Limpar</button>
        <button type="submit" className="submit-filter">Filtrar</button>
      </form>
      <div id="page-content">

        <div className="result-true">
          {
            games.map((game: GameProps) => {
              if (game.title?.toUpperCase().includes(search.toUpperCase())
                || game.genre?.toUpperCase().includes(search.toUpperCase())
                || game.publisher?.toUpperCase().includes(search.toUpperCase())) {
                if ((localStorage.getItem('status' + game.id)?.includes(statusInput)) || statusInput === 'Status') {
                  i = i + 1;
                  if (i <= 20) {
                    return <Game
                      key={game.id}
                      id={game.id}
                      title={game.title}
                      genre={game.genre}
                      thumbnail={game.thumbnail}
                      short_description={game.short_description}
                      game_url={game.game_url}
                      platform={game.platform}
                      publisher={game.publisher}
                    />
                  }
                }
              }
            }
            )}
        </div>
        <div className="result-none">
          {i === 0 ?
            (
              <p>Nenhum jogo encontrado</p>
            )
            : ''
          }
        </div>
      </div>
    </main>
  );
}

export default App;
