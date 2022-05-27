/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { PropTypes } from 'prop-types';

function Card(props) {
  const { id, name, imgSrc, onCardClick } = props;

  const onClick = onCardClick.bind(null, id);

  return (
    <div className="card" onClick={onClick} role="button" tabIndex={0} id={id}>
      <img src={imgSrc} alt="Pokemon" />
      <h3>{name}</h3>
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  onCardClick: PropTypes.func.isRequired,
};

export default Card;
