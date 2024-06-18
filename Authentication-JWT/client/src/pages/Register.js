import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import SignUp from '../assets/Registration.json';
import { toast } from 'react-toastify';

import './style.css';

// Import Registration API.
import { RegistrationFunction } from '../services/Api.js';

const Register = () => {

  const history = useNavigate();

  // For Hide and Show password.
  const [passwordShow, setShowPassword] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);

  // For get all Data.
  const user = {
    name: "",
    email: "",
    password: "",
    cpassword: ""
  }

  // For get Form Data.
  const [formData, setFormData] = useState(user);

  // Get Input Value.
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    })
  }

  // Validation code.
  const formValidation = (formData) => {
    const validateName = () => {
      const name = formData.name.trim();
      const nameRegex = /^[a-zA-Z\s]+$/;
      
      if (name === "") {
        return "Please enter a full name.";
      } else if (!nameRegex.test(name)) {
        return "Please use only alphabetic characters and spaces for the name.";
      } else if (name.length < 4 || name.length > 50) {
        return "Please enter a name between 4 and 50 characters long.";
      }
  
      return null; // Name is valid
    };
  
    const validateEmail = () => {
      const email = formData.email.trim();
      const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
  
      if (email === "") {
        return "Please enter an email address.";
      } else if (!emailRegex.test(email)) {
        return "Please enter a valid email address.";
      }
  
      return null; // Email is valid
    };
  
    const validatePassword = () => {
      const password = formData.password.trim();
      const confirmPassword = formData.cpassword.trim();
      const passwordLength = password.length;
  
      if (password === "") {
        return "Please create a strong password.";
      } else if (passwordLength < 7) {
        return "Password must be at least 7 characters long.";
      } else if (!/[A-Z]/.test(password)) {
        return "Password must contain at least one uppercase letter.";
      } else if (!/[a-z]/.test(password)) {
        return "Password must contain at least one lowercase letter.";
      } else if (!/\d/.test(password)) {
        return "Password must contain at least one digit.";
      } else if (!/[!@#$%^&*()_+\-=[\]:;"'<>,.?/]/.test(password)) {
        return "Password must contain at least one special character.";
      } else if (confirmPassword === "") {
        return "Please enter your confirm password";
      } else if (password !== confirmPassword) {
        return "Password and confirm password do not match.";
      }
  
      return null; // Password is valid
    };
  
    // Validate each field
    const nameError = validateName();
    if (nameError) {
      return nameError;
    }
  
    const emailError = validateEmail();
    if (emailError) {
      return emailError;
    }
  
    const passwordError = validatePassword();
    if (passwordError) {
      return passwordError;
    }

  };
  

  // For submit form Data.
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const validationError = formValidation(formData);
    if (validationError) {
      return toast.error(validationError);
    }
  
    try {
      const conf = {
        "Content-Type":"multipart/form-data"
      }
  
      // RegistrationFunction is an asynchronous API call method.
      const res = await RegistrationFunction(formData, conf);
  
      console.log(res);
  
      if (res.status === 201) {
        setFormData(user); 
        toast.success("User Registration Successfully...");
        history("/login");
      } else if (res.response.status === 422) {
        toast.error(res.response.data.message);
      } else {
        toast.error("Unexpected error occurred");
      }

    } catch (error) {
      console.error("Error occurred:", error.message);
      toast.error("An error occurred while submitting"); 
    }

  };
  

  return (
    <div className='container mt-5 py-4'>
      <div className='row align-items-center'>
        <div className='col-lg-6 col-md-4 col-12 mb-4 mb-md-0'>
          <Lottie animationData={SignUp} loop={true} />
        </div>
        <div className='col-lg-6 col-md-8 col-12 shadow-lg p-4 rounded registrationBackground'>
          <h2 className='text-center mb-3'>Sign Up</h2>
          <p className='text-center mb-4'>
            We're glad that you'll be using Project Cloud to manage your tasks! We hope that you'll like it.
          </p>
          <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <div className="mb-3">
              <label htmlFor="name" className="form-label fontWeight400">Full Name</label>
              <input type="text" className="form-control shadow-none" id="name" name='name' placeholder="John Doe" value={formData.name} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fontWeight400">Email address</label>
              <input type="email" className="form-control shadow-none" id="email" name='email' placeholder="name@example.com"  value={formData.email} onChange={handleChange} />
            </div>
            <div className="mb-3 position-relative">
              <label htmlFor="password" className="form-label fontWeight400">Password</label>
              <input type={passwordShow ? "text" : "password"} className="form-control shadow-none pr-5" id="password" name='password' placeholder="Password" value={formData.password} onChange={handleChange}/>
              <div className='position-absolute end-0 translate-middle-y p-2 myShowHindeRegistration' onClick={()=>setShowPassword(!passwordShow)}>
                {!passwordShow ? "Show" : "Hide" }
              </div>
            </div>
            <div className="mb-3 position-relative">
              <label htmlFor="cpassword" className="form-label fontWeight400">Confirm Password</label>
              <input type={ !confirmPasswordShow ? "password" : "text" } className="form-control shadow-none" id="cpassword" name='cpassword' placeholder="Confirm Password" value={formData.cpassword} onChange={handleChange}/>
              <div className='position-absolute end-0 translate-middle-y p-2 myShowHindeRegistration' onClick={()=>setConfirmPasswordShow(!confirmPasswordShow)}>
                {!confirmPasswordShow ? "Show" : "Hide" }
              </div>
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary btn-lg">Sign Up</button>
              <p className='text-center mt-2'>Already have an account? <NavLink className="text-dark fw-bold" to="/login">Log In</NavLink></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register;
