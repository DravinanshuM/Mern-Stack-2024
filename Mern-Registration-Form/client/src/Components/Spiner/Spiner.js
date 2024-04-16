import React from 'react'
// import Spinner from 'react-bootstrap/Spinner';
import './Spiner.css';

const Spiner = () => {
  return (
    <>
      <div className='d-flex justify-content-center align-items-center' style={{ width: "100%", height: "50vh" }}>
        {/* <Spinner animation="border" variant="danger" />&nbsp;  */}
        <div className="loading-dots mx-2 text-white">
          Loading
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
      </div>
    </>
  )
}

export default Spiner