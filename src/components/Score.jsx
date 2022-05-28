import React from 'react';
import { PropTypes } from 'prop-types';
import '../styles/score.css';

function Score(props) {
  const { currentScore, maxScore } = props;
  return (
    <div className="score">
      <div className="score current">
        <p>Current:</p>
        <p>{currentScore}</p>
      </div>
      <div className="score best">
        <p>Best:</p>
        <p>{maxScore}</p>
      </div>
    </div>
  );
}

Score.propTypes = {
  currentScore: PropTypes.number.isRequired,
  maxScore: PropTypes.number.isRequired,
};

export default Score;
