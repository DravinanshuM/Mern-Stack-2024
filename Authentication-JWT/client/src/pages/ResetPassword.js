import React, { useState } from 'react';
import { ResetPasswordFn } from '../services/Api.js';
import { toast } from 'react-toastify';
import Spiner from '../components/Spiner.js';

const ResetPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    // For get the Email value.
    const setVal = (e) => {
        setEmail(e.target.value);
    }

    // For send Email.
    const sendLink = async(e) => {
     e.preventDefault();
    //  console.log("Form Email ::", {email});
    setLoading(true);

     try {
        const data = {email}
        const conf = {
            "Content-Type": "application/json"
        }
        const response = await ResetPasswordFn(data, conf);

        console.log(response);

        if(response.status === 201) {
            setLoading(false);
            setEmail("");
            toast.success("A password reset link has been successfully sent to your email address...");
        } else if(response && response.response.status === 401) {
            setLoading(false);
            setEmail("");
            toast.error(response.response.data.message);
        }
     } catch (error) {
        console.log("Error Generated in this URL ::", error);
     }

    }

    if (loading) {
        return (
          <Spiner text="A Password Reset Link Has Been Sent On Your Email..." />
        );
      }

  return (
    <div className='container mt-5' style={{marginBottom:"170px"}}>
        <div className='row justify-content-center pt-5 pb-4'>
            <div className='col-lg-6 col-md-8 col-12 bg-white shadow-lg p-5 rounded rounded-5'>
                <h3 className='text-center mb-3'>Forgot Password ? </h3>
                <form onSubmit={sendLink}>
                    <div className='mb-4'>
                        <label htmlFor='email' className='form-label fw-bold fs-6'>Enter Your Email</label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            className='form-control shadow-none'
                            placeholder='Enter your email'
                            // required
                            aria-label='Email Input'
                            aria-describedby='emailHelp'
                            value={email}
                            onChange={setVal}
                        />
                    </div>
                    <div className='d-grid gap-2'>
                        <button type='submit' className='btn btn-outline-primary'>Send</button>
                        <button type='reset' className='btn btn-outline-secondary'>Reset</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

  )
}

export default ResetPassword