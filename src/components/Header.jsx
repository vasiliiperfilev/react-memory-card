import React from 'react';
import { PropTypes } from 'prop-types';
import Score from './Score';
import logo from '../assets/logo.png';

function Header(props) {
  const { scores } = props;
  return (
    <header>
      <h1>
        <img src={logo} alt="logo" />
        Memory game!
      </h1>
      <Score currentScore={scores.currentScore} bestScore={scores.bestScore} />
    </header>
  );
}

Header.propTypes = {
  scores: PropTypes.shape({
    currentScore: PropTypes.number.isRequired,
    bestScore: PropTypes.number.isRequired,
  }).isRequired,
};

export default Header;
