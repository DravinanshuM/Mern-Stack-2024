import React, { useState, useEffect, useRef, useContext } from 'react';
import './Header.css';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LoginContext } from './ContextAPI';
import { BASE_URL } from '../services/helperURL.js';
import Spiner from './Spiner.js';

const Header = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const location = useLocation();
  const history = useNavigate();
  const dropdownRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const { userLogin, setUserLogin } = useContext(LoginContext);

  useEffect(() => {
    // Check authentication status on component mount
    const isAuthenticated = localStorage.getItem('usersData') !== null;
    setAuthenticated(isAuthenticated);

    // Add event listeners for mouse movement
    document.addEventListener('mouseover', handleMouseMovement);
    document.addEventListener('mouseout', handleMouseMovement);

    return () => {
      // Clean up event listeners on component unmount
      document.removeEventListener('mouseover', handleMouseMovement);
      document.removeEventListener('mouseout', handleMouseMovement);
    };
  }, [location]); // Update authentication status when location changes (e.g., page navigation)

  const handleProfileDropdownToggle = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handleMouseMovement = (event) => {
    // Check if the mouse is inside the dropdown or the profile icon
    const isInsideDropdown = dropdownRef.current && dropdownRef.current.contains(event.target);
    const isInsideProfileIcon = event.target.closest('.profile-icon');
    setShowProfileDropdown(isInsideDropdown || isInsideProfileIcon);
  };

  const renderProfileIcon = () => {
    if (userLogin && userLogin.validUserOne) {
      return <p className="fs-3">{userLogin.validUserOne.name[0].toUpperCase()}</p>;
    } else {
      return <i className="bi bi-person-circle fs-4"></i>;
    }
  };

  // Logout.
  // const userLogoutOK = async() => {
  //     try {
  //     const token = localStorage.getItem("usersData");
  //     console.log(token);
  //     const response = await fetch(`${BASE_URL}/api/users/userlogout`, {
  //       method: 'GET',
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": token,
  //         Accept: "application/json"
  //       },
  //       credentials: 'include'
  //     });
      

  //     const data = await response.json();

  //     console.log("headers :: ",data);

  //     if (data && data.status === 201) {
  //       console.log("User logout");
  //       localStorage.removeItem("usersData");
  //       setUserLogin(false);
        
  //     // Simulate a 2-second delay before redirecting
  //     setTimeout(() => {
  //       setLoading(false); // Hide the spinner
  //       history("/"); // Redirect to the home page
  //     }, 2000);


  //     } else {
  //       console.log("User not verified");
  //     }
  //     } catch (error) {
  //       console.log("Error fetching user data:", error);
  //       history("/");
  //     }
  // }
  const userLogoutOK = async () => {
    try {
      setLoading(true); // Show the spinner
  
      const token = localStorage.getItem("usersData");
      console.log(token);
  
      const response = await fetch(`${BASE_URL}/api/users/userlogout`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
          "Accept": "application/json"
        },
        credentials: 'include'
      });
  
      const data = await response.json();
  
      console.log("Response from server:", data);
  
      if (data && data.status === 201) {
        console.log("User logout successful");
        // Simulate a delay before completing the logout process
        setTimeout(() => {
          localStorage.removeItem("usersData"); // Remove user data from localStorage
          setUserLogin(false); // Update userLogin context
  
          // Redirect to the home page after logout
          history("/");
  
          // Hide the spinner after 2 seconds
          setLoading(false);
        }, 2000);
      } else {
        console.log("User logout failed");
        setLoading(false); // Hide the spinner
      }
    } catch (error) {
      console.log("Error logging out:", error);
      setLoading(false); // Hide the spinner
    }
  };
  

  // Inside your return statement in the Header component
if (loading) {
  return (
    <Spiner text="Logging Out..." />
  );
}

// The rest of your component rendering logic follows...


  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <NavLink className="navbar-brand font-weight-bold" to="/">
          User Authentication
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item mx-1">
              <NavLink className="nav-link fw-bold" to="/">
                Home
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav mb-2 mb-lg-0">
            {authenticated ? (
              <li className="nav-item dropdown" ref={dropdownRef}>
                <div
                  className={`nav-link fw-bold cursor-pointer ${showProfileDropdown ? 'show' : ''}`}
                  onClick={handleProfileDropdownToggle}
                >
                  <div className="profile-icon">
                    {renderProfileIcon()}
                  </div>
                </div>
                <ul className={`dropdown-menu ${showProfileDropdown ? 'show' : ''}`} style={{ left: 'auto', right: 0 }}>
                  <li>
                    <NavLink className="dropdown-item" to="/dash">
                      View Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/settings">
                      Account Settings
                    </NavLink>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={userLogoutOK}>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <>
                <li className="nav-item mx-1">
                  <NavLink className="nav-link fw-bold" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item mx-1">
                  <NavLink className="nav-link fw-bold" to="/registration">
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
