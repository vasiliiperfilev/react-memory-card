import React from 'react';
import loadingIcon from '../assets/loadingIcon.png';
import '../styles/loading.css';

function Loading() {
  return (
    <div className="wrapper">
      <img className="rotating" src={loadingIcon} alt="Loading icon" />
    </div>
  );
}

export default Loading;
