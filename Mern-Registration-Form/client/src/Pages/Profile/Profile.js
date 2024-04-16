import React, { useEffect, useState } from 'react';
// import userLogo from '../../Assets/images/images.png';
import './Profile.css';

// Import useParams
import  { useParams } from 'react-router-dom';
import Spiner from '../../Components/Spiner/Spiner';

import  { singleUsergetfunction } from '../../Services/Api.js';

import { BASE_URL } from '../../Services/helper.js';

const Profile = () => {

  const  { id } = useParams();
  // console.log(id);

  const [userData, setUserData] = useState([]);
  const [createdAt, setCreatedAt] = useState(null);
  const [updatedAt, setUdatedAt] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPin, setShowPin] = useState(true);

  // call the function for get the userData.
  const userProfileGet = async (id) => {
      try {
        const res = await singleUsergetfunction(id);
        console.log(res.data);
        if(res && res.status === 200) {
          setUserData(res.data);
          setCreatedAt(res.data.createdAt);
          setUdatedAt(res.data.updatedAt);
        }
      } catch (error) {
        console.log("Error :: ", error);
        setError(error);
      } finally {
        setLoading(false);
      }
  }

  // useEffcet.
  useEffect(() => {
    userProfileGet(id);
    setTimeout(() => {
      setShowPin(false)
    }, 1200)
  }, [id])

  if(loading) {
    return <Spiner/>;
  }

  if(error) {
    return <div>Error: {error.message}</div>; 
  }

  // Date convert human readable formate.
  const convertData = (myDate) => {
    const dataObjcet = new Date(myDate);
    const options = { 
      year: "numeric", 
      month: "long", 
      day: "numeric", 
      hour: "numeric", 
      minute: "numeric", 
      second: "numeric", 
      timeZoneName: "short" 
    };
      
    return dataObjcet.toLocaleDateString("en-US", options);
  }

  const formattedCreatedAt = convertData(createdAt);
  const formattedUpdatedAt = convertData(updatedAt);

  return (
    <>
      {
        showPin ? <Spiner/> : (
          <div className='container-fluid mt-5'>
            <div className='row d-flex justify-content-center p-3'>
              <div className='col-lg-6 col-md-8 col-12 custom-bg shadow-lg mt-4 p-4 border rounded-5'>
                <div className='row'>
                  <h2 className='text-center text-dark text-uppercase mb-4'>User Profile</h2>
                  {
                    userData && (
                      <>
                        <div className='col-lg-12 col-md-12 col-12 text-center'>
                          <img src={`${BASE_URL}/public/uploads/${userData.profile}`} alt='user_profile' className='img-fluid profile_img'/>
                        </div>
                        <div className='col-lg-12 col-md-12 col-12 mt-4 text-dark'>
                          <div className='row'>
                            <div className='col-lg-6 col-md-6 col-12'>
                              <p className="fw-bold mb-1"><i className="bi bi-person-circle"></i> Full Name:</p>
                              <p className="mb-3 mx-3">{userData.firstName + " " +userData.lastName}</p>
                            </div>
                            <div className='col-lg-6 col-md-6 col-12'>
                              <p className="fw-bold mb-1"><i className="bi bi-envelope-check-fill"></i> Email:</p>
                              <p className="mb-3 mx-3">{userData.email}</p>
                            </div>
                            <div className='col-lg-6 col-md-6 col-12'>
                              <p className="fw-bold mb-1"> <i className="bi bi-phone-fill"></i> Mobile:</p>
                              <p className="mb-3 mx-3">{userData.mobile}</p>
                            </div>
                            <div className='col-lg-6 col-md-6 col-12'>
                              <p className="fw-bold mb-1"><i className="bi bi-person-arms-up"></i> Gender:</p>
                              <p className="mb-3 mx-3">{userData.gender}</p>
                            </div>
                            <div className='col-lg-6 col-md-6 col-12'>
                              <p className="fw-bold mb-1"><i className="bi bi-radar"></i> Status:</p>
                              <p className="mb-3 mx-3">{userData.status}</p>
                            </div>
                            <div className='col-lg-6 col-md-6 col-12'>
                              <p className="fw-bold mb-1"> <i className="bi bi-geo-alt-fill"></i> Address:</p>
                              <p className="mb-3 mx-3">{userData.address}</p>
                            </div>
                            <div className='col-lg-6 col-md-6 col-12'>
                              <p className="fw-bold mb-1"><i className="bi bi-calendar-event"></i> Date Created:</p>
                              <p className="mb-3 mx-3">{formattedCreatedAt}</p>
                            </div>
                            <div className='col-lg-6 col-md-6 col-12'>
                              <p className="fw-bold mb-1"><i className="bi bi-calendar-event"></i> Date updated:</p>
                              <p className="mb-3 mx-3">{formattedUpdatedAt}</p>
                            </div>
                          </div>
                        </div>
                      </>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}

export default Profile;