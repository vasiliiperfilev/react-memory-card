import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import Card from './Card';
import '../styles/board.css';

function Board(props) {
  const { pokemons, onCardClick } = props;

  // shuffle pokemons every re-render
  useEffect(() => {
    pokemons.sort(() => Math.random() - 0.5);
  });

  return (
    <div className="board">
      {pokemons.map((pokemon) => (
        <Card
          id={pokemon.id}
          name={pokemon.name}
          imgSrc={pokemon.imgSrc}
          key={pokemon.name}
          onCardClick={onCardClick}
        />
      ))}
    </div>
  );
}

Board.propTypes = {
  pokemons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      imgSrc: PropTypes.string.isRequired,
    })
  ).isRequired,
  onCardClick: PropTypes.func.isRequired,
};

export default Board;
