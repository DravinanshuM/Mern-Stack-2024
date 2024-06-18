import React from 'react';
import Lottie from 'lottie-react';
import NotPageFound from '../assets/loginPlease.json';
import { Link } from 'react-router-dom';
import './style.css'; // Import CSS for Error component styles

const Error = () => {
  return (
    <div className="error-container">
      <div className="error-content">
        <Lottie animationData={NotPageFound} className="error-animation" loop={true} />
        <p className="error-message">Oops! Please First Login.</p>
        <Link to='/login' className='btn btn-primary'>Go to Login</Link>
      </div>
    </div>
  );
};

export default Error;
