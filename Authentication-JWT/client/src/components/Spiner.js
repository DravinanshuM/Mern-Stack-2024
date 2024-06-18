import React from 'react';
import './Spiner.css';

const Spiner = ({ text }) => (
  <div className="loading-overlay">
    <div className="loading-indicator">
      <strong>{text}</strong>
      <div className="spinner-border ms-3" role="status" aria-hidden="true"></div>
    </div>
  </div>
);

export default Spiner;
