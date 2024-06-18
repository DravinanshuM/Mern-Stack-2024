import React from 'react'
import './Spiner.css';

const Spiner = () => {
  return (
    <>
      <div class="d-flex align-items-center">
        <strong role="status">Loading...</strong>
        <div class="spinner-border ms-auto" aria-hidden="true"></div>
      </div>
    </>
  )
}

export default Spiner