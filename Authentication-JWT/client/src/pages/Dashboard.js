import React, { useCallback, useContext, useEffect, useState } from 'react';
import IBMProfile from '../assets/IBM.jpeg';
import './style.css';
import { BASE_URL } from '../services/helperURL.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../components/ContextAPI.js';

const Dashboard = () => {
  const history = useNavigate();
  const { userLogin, setUserLogin } = useContext(LoginContext);
  const [loading, setLoading] = useState(true);

  const DashboardValid = useCallback(async () => {
    try {
      const token = localStorage.getItem("usersData");
      console.log(token);

      const response = await axios.get(`${BASE_URL}/api/users/validUser`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${token}`
        }
      });

      const data = response.data;
      console.log("Client-side dashBoard :: ", data);

      if (data && data.status === 201) {
        console.log("User verified");
        setUserLogin(data);
      } else {
        console.log("User not verified");
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
      history("/error");
    } finally {
      setLoading(false);
    }
  }, [history, setUserLogin]);

  useEffect(() => {
    DashboardValid();
  }, [DashboardValid]);

  if (loading) {
    return <div className='mt-5 fs-1 fw-bold text-center'>
            <p className='p-5'>Loading...</p>
        </div>;
  }

  return (
    <div className='container-fluid mt-5'>
      <div className='row pt-5 pb-2 d-flex justify-content-center align-items-center'>
        <div className='col-lg-12 col-md-12 col-12 d-flex justify-content-center'>
          <img src={IBMProfile} alt='IBM' className='myDashboard' />
        </div>
        
        {userLogin && userLogin.validUserOne ? (
          <>
            <div className='text-center mt-3 fw-bold fs-5 mb-4'>Name: {userLogin.validUserOne.name}</div>
            <div className='text-center mt-3 fw-bold fs-5 mb-4'>Email: {userLogin.validUserOne.email}</div>
          </>
        ) : (
          <>
            <div className='text-center mt-3 fw-bold fs-5 mb-4'>Name: Unknown</div>
            <div className='text-center mt-3 fw-bold fs-5 mb-4'>Email: Unknown</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
