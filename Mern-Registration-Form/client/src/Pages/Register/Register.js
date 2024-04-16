import React, { useEffect, useState, useRef, useContext } from 'react';
import './Register.css';
import ProfileLOGO from '../../Assets/images/images.png';
import Select from 'react-select';
import RegistrationFormData from './validation.js';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// for register API.
import { registerFunction } from '../../Services/Api.js';
import { addData } from '../../Components/Context/ContextProvider.js';

// Import Spiner.
import Spiner from '../../Components/Spiner/Spiner.js';

const Register = () => {

    // For navigate.
    const navigate = useNavigate(); 

    // ContextProvider inside we can use states here also and across the application because we warp index.js file inside also.
    const { userAdd, setUserAdd } = useContext(addData);
 
    // For Status Options.
    const options = [
      { value: "Active", label: "Active" },
      { value: "Inactive", label: "Inactive" }
    ];

    // For Input value.
    const user = {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      gender: "",
      address: ""
    }

    // For Reference Each filed.
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const emailRef = useRef(null);
    const mobileRef = useRef(null);
    const genderRef = useRef(null);
    const profileRef = useRef(null);
    const statusRef = useRef(null);
    const addressRef = useRef(null);
    

    const [inputValue, setInputValue] = useState(user);
    const [status, setStatus] = useState("Active");
    const [profile, setProfile] = useState("");
    const [preview, setPreview] = useState("");
    const [showPin, setShowPin] = useState(true);

    // For get input filed data.
    const handleChange = (e) => {
      const { name, value } = e.target;
      setInputValue({
        ...inputValue,
        [name] : value
      })
    }
    
    // For Status.
    const setStatusValue = (selectedOption) => {
      setStatus(selectedOption.value);   
    }

    // for handle Profile.
    const setHandleProfile = (e) => {
      setProfile(e.target.files[0]);
      console.log(e.target.files[0]);
    }

    // HandlePreview profile.
    useEffect(()=>{
      if(profile) {
        setPreview(URL.createObjectURL(profile))
      }
    },[profile]);

    // useEffect Call for ShowPin, For Spiner Call when we click on the Add user Click.
    useEffect(()=>{
      setTimeout(()=>{
        setShowPin(false);
      },1200);
    },[])


  // Submit Data.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {  
      const validationError = RegistrationFormData(inputValue, status, profile,{ firstNameRef, lastNameRef, emailRef, mobileRef, genderRef, statusRef, profileRef, addressRef, });
      if(validationError) {
        return toast.error(validationError, { position: "top-left" });
      } else {
        const formData = new FormData();
        formData.append("firstName", inputValue.firstName);
        formData.append("lastName", inputValue.lastName);
        formData.append("email", inputValue.email);
        formData.append("mobile", inputValue.mobile);
        formData.append("gender", inputValue.gender);
        formData.append("status", status);
        formData.append("address", inputValue.address);
        formData.append("profile", profile);

        // console.log("All form data:", formData);
        const config = {
          "Content-Type":"multipart/form-data"
        }

        // API call. fetch or axios.
        const res = await registerFunction(formData, config);

        console.log(res);

        if (res && res.status === 201) {
          setInputValue(user); // Resetting the input fields
          setProfile("");
          setStatus(""); 
          navigate("/");
          setUserAdd(res.data);
          // console.log(res.data); 
          // toast.success(`Data submitted successfully!`, { position: "top-right" });
        } else {
          if (res && res.response.status === 400 && res.response.data.message) {
            toast.error(res.response.data.message, { position: "top-right" });
          } 
        }  
      }
    } catch (error) {
      console.log("Error :: ", error);
    }
  }
   
  return (
   <>
     {
      showPin ? <Spiner/> : (
        <div className='container mt-5'>
          <div className='row justify-content-center p-3'>
            <h2 className='text-center mb-4 colorWhite'>Register Your Details</h2>
            <div className='col-lg-8 col-md-10 p-4 col-12 shadow-lg border border-2 rounded-2 RegisterDetails'>
              {/* Form Start */}
              <form method='post' encType='multipart/form-data' onSubmit={handleSubmit}>
                <div className='row'>
                  {/* Top SVG Image */}
                  <div className='col-lg-12 col-md-12 col-12'>
                    <div className='mb-4 text-center'>
                      <img src={preview ? preview : ProfileLOGO} alt='Profile_Image' className='img-fluid myImgDesign' />
                    </div>
                  </div>
    
                  {/* First Name */}
                  <div className='col-lg-6 col-md-6 col-12'>
                    <div className='mb-4'>
                      <label className='form-label colorWhite' htmlFor='firstName'>First Name</label>
                      <input type='text' name='firstName' id='firstName' className='form-control shadow-none' placeholder='First Name' value={inputValue.firstName} onChange={handleChange} ref={firstNameRef}/>
                    </div>
                  </div>
    
                  {/* last Name */}
                  <div className='col-lg-6 col-md-6 col-12'>
                    <div className='mb-4'>
                      <label className='form-label mb-2 colorWhite' htmlFor='lastName'>Last Name</label>
                      <input type='text' name='lastName' id='lastName' className='form-control shadow-none' placeholder='Last Name' value={inputValue.lastName} onChange={handleChange} ref={lastNameRef}/>
                    </div>
                  </div>
    
                  {/*Email  */}
                  <div className='col-lg-6 col-md-6 col-12'>
                    <div className='mb-4'>
                      <label className='form-label colorWhite' htmlFor='email'>Email</label>
                      <input type='email' name='email' id='email' className='form-control shadow-none' placeholder='example@gmail.com' value={inputValue.email} onChange={handleChange} ref={emailRef}/>
                    </div>
                  </div>
    
                  {/* Mobile */}
                  <div className='col-lg-6 col-md-6 col-12'>
                    <div className='mb-4'>
                      <label className='form-label mb-2 colorWhite' htmlFor='mobile'>Mobile</label>
                      <input type='text' name='mobile' id='mobile' className='form-control shadow-none' placeholder='Mobile Number' value={inputValue.mobile} onChange={handleChange} ref={mobileRef}/>
                    </div>
                  </div>
    
                  {/* Gender */}
                  <div className='col-lg-6 col-md-6 col-12'>
                    <div className='mb-4'>
                      <label className='form-label mb-2 colorWhite'>Select Your Gender</label>
                      <div className="form-check mx-2">
                        <input className="form-check-input shadow-none" type="radio" name="gender" id="male" value="M" onChange={handleChange} ref={genderRef}/>
                        <label className="form-check-label colorWhite" htmlFor="male">
                          Male
                        </label>
                      </div>
                      <div className="form-check mx-2">
                        <input className="form-check-input shadow-none" type="radio" name="gender" id="female" value="F" onChange={handleChange} ref={genderRef}/>
                        <label className="form-check-label colorWhite" htmlFor="female">
                          Female
                        </label>
                      </div>
                    </div>
                  </div>
    
                  {/* status select */}
                  <div className='col-lg-6 col-md-6 col-12 mb-4'>
                    <label className='form-label mb-2 colorWhite' name="status">Select Your Status</label>
                    <Select options={options} value={{ value: status, label: status }} onChange={setStatusValue}  ref={statusRef}/>
                  </div>
    
                  {/* profile */}
                  <div className='col-lg-6 col-md-6 col-12'>
                    <div className="mb-4">
                      <label className='form-label mb-2 shadow-none colorWhite' htmlFor='profile'>Select Your Profile
                      </label>
                      <input type="file" className="form-control" id="profile" name='profile' aria-describedby="profile" aria-label="Upload" onChange={setHandleProfile} ref={profileRef} accept="image/jpeg, image/jpg, image/png, image/gif"/>
                    </div>
                  </div>
    
                  {/* Address */}
                  <div className='col-lg-6 col-md-6 col-12'>
                    <div className='mb-4 myExtra'>
                      <label className='form-label colorWhite' htmlFor='address'>Address</label>
                      <input type='text' name='address' id='address' placeholder='Full Address' className='form-control' value={inputValue.address} onChange={handleChange} ref={addressRef}/>
                    </div>
                  </div>
    
                  {/* Submit */}
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button className="btn btn-primary me-md-2" type="submit">Submit</button>
                    <button className="btn btn-secondary" type="reset">Reset</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )
     }
   </>
  )
}

export default Register;
