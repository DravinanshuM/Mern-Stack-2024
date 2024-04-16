import React, { useEffect, useState, useRef, useContext } from 'react';
import './Edit.css';
// Import React-Select.
import Select from 'react-select';
// Import Spiner.
import Spiner from '../../Components/Spiner/Spiner';
// Import useParams.
import { useParams } from 'react-router-dom';
// import Single user get API.
import { singleUsergetfunction  } from '../../Services/Api.js';
// Import Base_URL.
import { BASE_URL } from '../../Services/helper.js';
// import validation API.
import EditValidation from './EditValidation.js';
// Import toast.
import { toast } from 'react-hot-toast';
// Import Update API.
import { updateFunction } from '../../Services/Api.js';
// Import navigation.
import { useNavigate } from 'react-router-dom';
import { updateData } from '../../Components/Context/ContextProvider.js';

const Edit = () => { 

   // For Input value.
   const user = {
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    gender: "",
    address: ""
  }

  const [editData, setEditData] = useState(user); // For get Data, and also set get both working.
  const navigate = useNavigate();

  const [imgData, setImgData] = useState(""); // for get the server-side image.
  const [image, setImage] = useState(""); // for when we change new image.
  const [preview, setPreview] = useState(""); // For preview when we change image.

  const [status, setStatus] = useState("");
  const [showPin, setShowPin] = useState(true);
  const [error, setError] = useState(null);

  // useContext.
  const { userUpdate, setUserUpdate } = useContext(updateData);
  console.log(userUpdate);

  const { id } = useParams();

   // For Reference Each filed.
   const firstNameRef = useRef(null);
   const lastNameRef = useRef(null);
   const emailRef = useRef(null);
   const mobileRef = useRef(null);
   const genderRef = useRef(null);
   const profileRef = useRef(null);
   const statusRef = useRef(null);
   const addressRef = useRef(null);
   

   // For set Input value and change also.
   const setInputValue = (e) => {
    const { name, value } = e.target;
    // set new Data from here.
    setEditData({
      ...editData,
      [name]: value
    })
   }

  //  For Imgage set image onChange.
  const setProfile = (e) => {
    setImage(e.target.files[0])
  }
  
  // For Status Options.
  const options = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" }
  ];

   // For Status.
   const setStatusValue = (selectedOption) => {
    setStatus(selectedOption.value);   
  }
 
  // Call The API for get the Data from the server.
  const editFunction = async(id) => {
    try {
      const res = await singleUsergetfunction(id);
      console.log(res);
      if(res.status === 200) {
        setEditData(res.data); // get backend data from here.
        setImgData(res.data.profile);
        setStatus(res.data.status);
      } else {
        const { message } = res.response.data;
        console.log(message);
        setError(message);
      }
    } catch (error) {
      console.log("Error :: ", error.message);
    }
  }

  // useEffect Call for sepecially Id.
  useEffect(()=>{
   editFunction(id);
    setTimeout(()=>{
      setShowPin(false);
    },1200);
  },[id]);

  // useEffcet call for image.
  useEffect(()=>{
    if(image) {
      setImgData("");
      setPreview(URL.createObjectURL(image));
    }
  },[image]);

  if(error) {
    return <h1 className='mt-5 text-center text-white p-5 bg-dark shadow-lg'>{error}</h1>
  }

  // Update the Data otherwise not.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {  
      const validationError = EditValidation(editData, status, image, { firstNameRef, lastNameRef, emailRef, mobileRef, genderRef, statusRef, profileRef, addressRef, });
      if(validationError) {
        return toast.error(validationError, { position: "top-left" });
      } else {
        const formData = new FormData();
        formData.append("firstName", editData.firstName);
        formData.append("lastName", editData.lastName);
        formData.append("email", editData.email);
        formData.append("mobile", editData.mobile);
        formData.append("gender", editData.gender);
        formData.append("status", status);
        formData.append("address", editData.address);
        formData.append("profile", image || imgData);

        // console.log("All form data:", formData);
        const config = {
          "Content-Type":"multipart/form-data"
        }

        // API call. fetch or axios.
        const res = await updateFunction(id, formData, config);
        if (res && res.status === 200) {
          setEditData(user); // Resetting the input fields
          setImage("");
          setStatus(""); 
          navigate("/");
          setUserUpdate(res.data);
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
              <h2 className='text-center mb-4 colorWhite'>Update Your Details</h2>
              <div className='col-lg-8 col-md-10 p-4 col-12 shadow-lg border border-2 rounded-2 EditDetails'>
                {/* Form Start */}
                <form method='post' encType='multipart/form-data' onSubmit={handleSubmit}>
                  <div className='row'>
                    {/* Top SVG Image */}
                    <div className='col-lg-12 col-md-12 col-12'>
                      <div className='mb-4 text-center'>
                        <img src={image ? preview : `${BASE_URL}/public/uploads/${imgData}`} alt='Profile_Image' className='img-fluid myImgDesign' />
                      </div>
                    </div>
      
                    {/* First Name */}
                    <div className='col-lg-6 col-md-6 col-12'>
                      <div className='mb-4'>
                        <label className='form-label colorWhite' htmlFor='firstName'>First Name</label>
                        <input type='text' name='firstName' id='firstName' className='form-control shadow-none' placeholder='First Name' value={editData.firstName} onChange={setInputValue} ref={firstNameRef}/>
                      </div>
                    </div>
      
                    {/* last Name */}
                    <div className='col-lg-6 col-md-6 col-12'>
                      <div className='mb-4'>
                        <label className='form-label mb-2 colorWhite' htmlFor='lastName'>Last Name</label>
                        <input type='text' name='lastName' id='lastName' className='form-control shadow-none' placeholder='Last Name' value={editData.lastName} onChange={setInputValue} ref={lastNameRef}/>
                      </div>
                    </div>
      
                    {/*Email  */}
                    <div className='col-lg-6 col-md-6 col-12'>
                      <div className='mb-4'>
                        <label className='form-label colorWhite' htmlFor='email'>Email</label>
                        <input type='email' name='email' id='email' className='form-control shadow-none' placeholder='example@gmail.com' value={editData.email} onChange={setInputValue} ref={emailRef}/>
                      </div>
                    </div>
      
                    {/* Mobile */}
                    <div className='col-lg-6 col-md-6 col-12'>
                      <div className='mb-4'>
                        <label className='form-label mb-2 colorWhite' htmlFor='mobile'>Mobile</label>
                        <input type='text' name='mobile' id='mobile' className='form-control shadow-none' placeholder='Mobile Number' value={editData.mobile} onChange={setInputValue} ref={mobileRef}/>
                      </div>
                    </div>
      
                    {/* Gender */}
                    <div className='col-lg-6 col-md-6 col-12'>
                      <div className='mb-4'>
                        <label className='form-label mb-2 colorWhite'>Select Your Gender</label>
                        <div className="form-check mx-2">
                          <input className="form-check-input shadow-none" type="radio" name="gender" id="male" value="M" checked={editData.gender === "M" ? true: false} onChange={setInputValue} ref={genderRef}/>
                          <label className="form-check-label colorWhite" htmlFor="male">
                            Male
                          </label>
                        </div>
                        <div className="form-check mx-2">
                          <input className="form-check-input shadow-none" type="radio" name="gender" id="female" value="F" checked={editData.gender === "F" ? true: false} onChange={setInputValue} ref={genderRef}/>
                          <label className="form-check-label colorWhite" htmlFor="female">
                            Female
                          </label>
                        </div>
                      </div>
                    </div>
      
                    {/* status select */}
                    <div className='col-lg-6 col-md-6 col-12 mb-4'>
                      <label className='form-label mb-2 colorWhite' name="status">Select Your Status</label>
                      <Select options={options} value={{ value: status, label: status }} onChange={setStatusValue} name="status" ref={statusRef}/>
                    </div>
      
                    {/* profile */}
                    <div className='col-lg-6 col-md-6 col-12'>
                      <div className="mb-4">
                        <label className='form-label mb-2 shadow-none colorWhite' htmlFor='profile'>Select Your Profile</label>
                        <div className="input-group">
                          <input type="file" className="form-control" id="profile" name='profile' aria-describedby="profile" aria-label="Upload" onChange={setProfile} ref={profileRef} accept="image/jpeg, image/jpg, image/png, image/gif" />
                          <label className="input-group-text" htmlFor="profile">{imgData}</label>
                        </div>
                      </div>
                    </div>

                    {/* Address */}
                    <div className='col-lg-6 col-md-6 col-12'>
                      <div className='mb-4 myExtra'>
                        <label className='form-label colorWhite' htmlFor='address'>Address</label>
                        <input type='text' name='address' id='address' placeholder='Full Address' className='form-control' value={editData.address} onChange={setInputValue} ref={addressRef}/>
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

export default Edit;
