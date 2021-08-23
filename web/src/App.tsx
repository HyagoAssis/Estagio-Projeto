import React, { useState, useEffect, FormEvent } from 'react';
import styled from "styled-components";
import axios from "axios";
import { IoSearch, } from "react-icons/io5";
import Game, { GameProps } from './components/game';
import './App.css';

const api = axios.create({
  baseURL: 'https://www.freetogame.com/api/games',
});

function App() {
  const [games, setGames] = useState([]);

  const [search, setSearch] = useState('');

  const [inputSearch, setInputSearch] = useState('');

  let i = 0;

  function searchGames(e: FormEvent) {
    e.preventDefault();
    setSearch(inputSearch);
  }
  // async function searchGames(e: FormEvent) {
  //   e.preventDefault();

  //   api
  //     .get("",{
  //       params: {
  //         category
  //       }
  //     })
  //     .then((response) => setGames(response.data))
  //     .catch((err) => {
  //       console.error("ops! ocorreu um erro" + err);
  //       setGames([]);
  //     }); 
  // }

  async function listGames() {
    const response = await api.get('?sort-by=alphabetical');
    setGames(response.data);
  }

  useEffect(() => {
    listGames();
  }, []);
  return (
    <main id="page-main">
      <header id="page-header">
        <form className="input-block" onSubmit={searchGames}>
          <input
            type="text"
            value={inputSearch}
            max={4}
            onChange={e => { setInputSearch(e.target.value) }}
            placeholder="Procure seu jogo favorito"
          />
          <button type="submit">
            <IoSearch size={30} className="search-logo" />
          </button>
        </form>
      </header>
      <div id="page-content">
        
        <div className="result-true">
          {
            games.map((game: GameProps, index) => {
              if (game.title?.toUpperCase().includes(search.toUpperCase())
                || game.genre?.toUpperCase().includes(search.toUpperCase())
                || game.publisher?.toUpperCase().includes(search.toUpperCase())) {
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
