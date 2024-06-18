import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Spinner from '../components/Spiner.js';

// API Client-side.
import { updatePassword, verifiedForgotPasswordUser } from '../services/Api.js';
import { useParams, useNavigate } from 'react-router-dom';

const PasswordResetForm = () => {

  const {id, token} = useParams();
  const history = useNavigate();

  // First step Check User is valid or Not?
  useEffect(() => {
    const validaUser = async (id, token) => {
      try {
        const conf = {
          "Content-Type": "application/json"
        }
  
        const res = await verifiedForgotPasswordUser(conf, id, token);
        if (res.status === 200) {
          console.log("verified user");
        } else {
          history("/*");
          console.log("User not verified...");
        }
      } catch (error) {
        console.log("Error :: ", error);
      }
    };
  
    validaUser(id, token); // Call validaUser with current id and token
  
    // Include validaUser in the dependency array
  }, [id, token, history]); //
  
  const initialFormData = {
    newpassword: '',
    cnewpassword: ''
  };

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = (type) => {
    if (type === 'new') {
      setShowNewPassword(!showNewPassword);
    } else if (type === 'confirm') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    const strength = checkPasswordStrength(value);
    setPasswordStrength(strength);
  };

  const checkPasswordStrength = (password) => {
    if (password.length === 0) {
      return 'Weak';
    }

    if (password.length >= 11 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password) && /[^a-zA-Z0-9]/.test(password)) {
      return <span style={{ color: 'green' }}>Strong</span>;
    } else if (password.length >= 7 && /[a-zA-Z0-9]/.test(password)) {
      return <span style={{ color: 'blue' }}>Medium</span>;
    } else {
      return <span style={{ color: 'red' }}>Weak</span>;
    }
  };

  const passwordValidation = (data) => {
    const { newpassword, cnewpassword } = data;
    const NewPassword = newpassword.trim();
    const ConfirmNewPassword = cnewpassword.trim();
    const passwordLength = NewPassword.length;

    if (NewPassword === "") {
      return "Please enter the new password.";
    } else if (passwordLength < 7) {
      return "Password must be at least 7 characters long.";
    } else if (!/[A-Z]/.test(NewPassword)) {
      return "Password must contain at least one uppercase letter.";
    } else if (!/[a-z]/.test(NewPassword)) {
      return "Password must contain at least one lowercase letter.";
    } else if (!/\d/.test(NewPassword)) {
      return "Password must contain at least one digit.";
    } else if (!/[!@#$%^&*()_+\-=[\]:;"'<>,.?/]/.test(NewPassword)) {
      return "Password must contain at least one special character.";
    } else if (ConfirmNewPassword === "") {
      return "Please enter your confirm password.";
    } else if (NewPassword !== ConfirmNewPassword) {
      return "Password and confirm password do not match.";
    }

    return null; // Password is valid
  };

  const handleSubmit = async (e) => {
    // console.log(id, token);
    e.preventDefault();
    setLoading(true);

    const validationError = passwordValidation(formData);
    if (validationError) {
      toast.error(validationError);
      setLoading(false); // Reset loading state
      return;
    }

    // Simulate API call (replace with actual API call)
    try {
      // console.log('Form Data:', formData);

      // Make API call to reset password using formData
      const conf = {
        "Content-Type": "application/json"
      }

      const res = await updatePassword(formData, id, token, conf);
      console.log(res);
      setPasswordStrength('Weak'); // Reset password strength indicator

      if(res.status === 200) {
        // Reset form state after successful submission
        setFormData(initialFormData);
        toast.success('Password changed successfully!');
        history("/login");
      } else {
        toast.error("something went wrong");
      }
     
    } catch (error) {
      console.log("Error:", error);
      toast.error('Failed to change password. Please try again.');
    } finally {
      setLoading(false); // Reset loading state after API call completes
    }
  };

  if (loading) {
    return <Spinner text="Updating password..." />;
  }

  return (
    <div className='container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-lg-6 col-md-8 col-12'>
          <form className='border border-1 p-5 m-5 shadow-lg' onSubmit={handleSubmit}>
            <div className='mb-4 position-relative'>
              <label htmlFor='newpassword' className='form-label fs-6'>New Password</label>
              <input 
                type={showNewPassword ? 'text' : 'password'}
                name='newpassword'
                id='newpassword'
                className='form-control shadow-none border-0 border-bottom'
                value={formData.newpassword} 
                onChange={handleInputChange}
              />
              <div className='icon position-absolute top-50 end-0 translate-middle-y' onClick={() => togglePasswordVisibility('new')}>
                {showNewPassword ? (
                  <i className="bi bi-eye-slash-fill fs-5"></i>
                ) : (
                  <i className="bi bi-eye-fill fs-5"></i>
                )}
              </div>
            </div>
            <div className='mb-4 position-relative'>
              <label htmlFor='cnewpassword' className='form-label fs-6'>Confirm New Password</label>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name='cnewpassword'
                id='cnewpassword'
                className='form-control shadow-none border-0 border-bottom'
                value={formData.cnewpassword}
                onChange={handleInputChange}
              />
              <div className='icon position-absolute top-50 end-0 translate-middle-y' onClick={() => togglePasswordVisibility('confirm')}>
                {showConfirmPassword ? (
                  <i className="bi bi-eye-slash-fill fs-5"></i>
                ) : (
                  <i className="bi bi-eye-fill fs-5"></i>
                )}
              </div>
            </div>
            <div className='password-strength mb-4'>
              <h6>Password Strength: <span className='password-strength-level text-primary'>{passwordStrength}</span></h6>
              <div className='password-advice'>
                <p>Your password should:</p>
                <ul>
                  <li>Be at least <strong>7 characters</strong> long.</li>
                  <li>Avoid common words or predictable sequences.</li>
                  <li>For a <strong>strong password</strong>, use at least <strong>11 characters</strong>.</li>
                  <li>For a <strong>medium password</strong>, use at least <strong>7 characters</strong>.</li>
                  <li>For a <strong>weak password</strong>, use at least <strong>1 character</strong>.</li>
                </ul>
              </div>
            </div>
            <div className='mb-2 d-grid gap-2'>
              <button type='submit' className='btn btn-primary btn-lg'>Change Password</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetForm;
