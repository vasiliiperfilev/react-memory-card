import React from 'react';
import { PropTypes } from 'prop-types';

function Score(props) {
  const { currentScore, bestScore } = props;
  return (
    <div className="score">
      <div className="score current">
        <p>Current:</p>
        <p>{currentScore}</p>
      </div>
      <div className="score best">
        <p>Best:</p>
        <p>{bestScore}</p>
      </div>
    </div>
  );
}

Score.propTypes = {
  currentScore: PropTypes.number.isRequired,
  bestScore: PropTypes.number.isRequired,
};

export default Score;
