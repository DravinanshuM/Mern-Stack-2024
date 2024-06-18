import React from 'react';
import Lottie from 'lottie-react';
import NotPageFound from '../assets/PageNotFound.json';
import { useNavigate } from 'react-router-dom';
import './style.css';

const NotFound = () => {
  const navigate = useNavigate(); // Rename history to navigate for clarity

  const handleGoToLogin = () => {
    navigate('/login'); // Use navigate function to go to the '/login' route
  };

  return (
    <div className="error-containers">
      <div className="error-contents">
        <Lottie animationData={NotPageFound} className="error-animation" loop={true} />
        <button className='btn btn-primary' onClick={handleGoToLogin}>Go to Login</button>
      </div>
    </div>
  );
};

export default NotFound;
