/* eslint-disable no-inner-declarations */
import React, { useEffect, useState } from 'react';
import Board from './components/Board';
import Header from './components/Header';
import Loading from './components/Loading';
import getData from './data/getData';
import './styles/app.css';

const initialState = {
  level: 1,
  pokemons: [],
  lastClickedId: null,
  clickedPokemonIds: [],
  scores: {
    currentScore: 0,
    maxScore: 0,
  },
  isLoading: true,
  isGameOver: false,
  isLevelDone: false,
};

function App() {
  const [gameState, setGameState] = useState(initialState);

  // returns Object representing current turn state:
  // clicked pokemon id and array of clicked pokemon ids including clicked this turn
  // and if all pokemons' cards were clicked
  function getCurrentTurnState(lastClickedId) {
    const newClickedPokemonIds = [...gameState.clickedPokemonIds];
    newClickedPokemonIds.push(lastClickedId);
    return {
      lastClickedId,
      clickedPokemonIds: newClickedPokemonIds,
      isLevelDone: newClickedPokemonIds.length === gameState.pokemons.length,
    };
  }

  // returns object with current turn state + game over entry set to true
  function getGameOverState() {
    return {
      isGameOver: true,
    };
  }

  // updates lastClickedId, clickedPokemonIds,
  // or sets isGameOver to true if repetition happened
  const onCardClick = (lastClickedId) => {
    let currentTurnState = getCurrentTurnState(lastClickedId);
    if (gameState.clickedPokemonIds.includes(lastClickedId))
      currentTurnState = getGameOverState();
    setGameState((prevGameState) => ({
      ...prevGameState,
      ...currentTurnState,
    }));
  };

  // fetches (4 + 2 for each level after 1) new pokemons if pokemons array is empty.
  useEffect(() => {
    if (gameState.pokemons.length === 0) {
      async function getPockemons() {
        const pokemons = await getData(4 + 2 * (gameState.level - 1));
        setGameState((prevGameState) => ({
          ...prevGameState,
          pokemons,
          isLoading: false,
        }));
      }
      getPockemons();
    }
  }, [gameState.pokemons.length, gameState.level]);

  // reset to initial state if game is over
  useEffect(() => {
    if (gameState.isGameOver) {
      setGameState((prevGameState) => ({
        ...initialState,
        scores: {
          currentScore: 0,
          maxScore: prevGameState.scores.maxScore,
        },
      }));
    }
  }, [gameState.isGameOver]);

  // advance level if current is done
  useEffect(() => {
    if (gameState.isLevelDone) {
      setGameState((prevGameState) => ({
        ...initialState,
        level: prevGameState.level + 1,
        scores: prevGameState.scores,
      }));
    }
  }, [gameState.isLevelDone]);

  // updates score if new pokemon was clicked
  useEffect(() => {
    if (gameState.lastClickedId !== null) {
      setGameState((prevGameState) => {
        const newScore =
          prevGameState.scores.currentScore + prevGameState.level;
        return {
          ...prevGameState,
          scores: {
            currentScore: newScore,
            maxScore:
              prevGameState.scores.maxScore > newScore
                ? prevGameState.scores.maxScore
                : newScore,
          },
        };
      });
    }
  }, [gameState.lastClickedId]);

  if (gameState.isLoading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <Header scores={gameState.scores} />
      <Board pokemons={gameState.pokemons} onCardClick={onCardClick} />
    </div>
  );
}

export default App;
