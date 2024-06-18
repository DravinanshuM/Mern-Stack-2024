import React, { useState } from 'react';
import './style.css';
import { NavLink, useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import logIn from '../assets/Login.json';
import Spiner from '../components/Spiner.js';

// For React Tostify.
import { toast } from 'react-toastify';

import { LoginFunction } from '../services/Api.js';

const Login = () => {

  const style = {
    width: "100%",
    height: "auto",
  };

  const user = {
    email: "",
    password: ""
  }

  // For Show and Hide password.
  const [passwordShowHide, setPasswordShowHide] = useState(false);
  const [formDataLogin, setFormDataLogin] = useState(user);
  const history = useNavigate();
  const [loading, setLoading] = useState(false);

  // For Input filed get Value.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataLogin(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  // For Validation.
  const loginValidation = (data) => {
    const {email, password} = data;

    const loginEmail = email.trim();
    const loginPassword = password.trim();
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

    if(loginEmail === "") {
      return "please enter your email";
    } else if (!emailRegex.test(loginEmail)) {
      return "Please enter your valid email";
    } else if(loginPassword === "") {
      return "Please enter your password";
    }
  }

  // For Login Submit.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate form data
    const validationError = loginValidation(formDataLogin);
    if (validationError) {
      toast.error(validationError);
      setLoading(false); // Set loading to false to stop spinner
      return; // Exit early if there's a validation error
    }

    try {
      // Make login request
      const conf = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const res = await LoginFunction(formDataLogin, conf);

      console.log("Client-side status:", res);

      // Handle successful login
      if (res && res.status === 201) {
        localStorage.setItem("usersData", res.data.result.token);
        setFormDataLogin(user); // Reset form after successful login
        toast.success("Logged In");
        setLoading(false); // Hide loading spinner
        history("/dash"); // Navigate to dashboard
      } else if (res && res.response && res.response.status === 422) {
        toast.error(res.response.data.message); // Display specific error message from server
        setLoading(false)
      } else {
        toast.error("Unexpected error occurred"); // Handle unexpected errors
        setLoading(false)
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again."); // Display generic error message
      setLoading(false); // Hide loading spinner
    }
  };


  // Inside your return statement in the Header component
  if (loading) {
    return (
      <Spiner text="User Log In..." />
    );
  }

  return (
    <div className='container mt-5 py-4'>
      <div className='row align-items-center'> 
        <div className='col-lg-6 col-md-4 col-12 mb-4 mb-md-0'> 
          <Lottie animationData={logIn} style={style} loop={true}/>
        </div>
        <div className='col-lg-6 col-md-8 col-12 shadow-lg p-5 rounded loginBackground'>
          <h2 className="text-center mb-2">Welcome Back, Log In</h2>
          <p className='text-center mb-4'>Hi, we're glad you're back. Please log in.</p> {/* Added margin bottom */}
          <form encType='multipart/form-data' onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fontWeight400">Email address</label>
              <input type="email" className="form-control shadow-none" id="email" name='email' placeholder="name@example.com" value={formDataLogin.email} onChange={handleChange}/>
            </div>
            <div className="mb-3 position-relative">
              <label htmlFor="password" className="form-label fontWeight400">Password</label>
              <input type={!passwordShowHide ? "password" : "text"} className="form-control shadow-none" id="password" name='password' placeholder="Password" value={formDataLogin.password} onChange={handleChange} />
              <div className='position-absolute end-0 translate-middle-y p-2 myShowHideLogin' onClick={()=>setPasswordShowHide(!passwordShowHide)}>
                {!passwordShowHide ? "Show" : "Hide"}
              </div>
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary btn-lg">Login</button> 
              <p className='text-center mt-2 mb-0 fw-bold'>Don't have an account ? 
                <NavLink className="text-danger fw-bold mx-2" to="/registration">Sign Up</NavLink>
              </p> 
              <p className='text-center mt-2 mb-0 fw-bold'>Forgot Password ? 
                <NavLink className="text-danger fw-bold mx-2" to="/resetpassword">Click Here</NavLink></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
