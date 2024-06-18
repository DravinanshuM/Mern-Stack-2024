import commonRequest from "./ApiCall.js";
import { BASE_URL } from "./helperURL.js";

// For registration Function client-side API.
const RegistrationFunction = async(data, header) => {
   return await commonRequest("POST", `${BASE_URL}/api/users/registration`, data, header);
}

// For Login function client-side API.
const LoginFunction = async(data, header) => {
   return await commonRequest("POST", `${BASE_URL}/api/users/login`, data, header);
}

// For ResetPassword.
const ResetPasswordFn = async(data, header) => {
   return await commonRequest("POST", `${BASE_URL}/api/users/sendpasswordlink`, data, header);
}

// For varified ForgotPassword user.
const verifiedForgotPasswordUser = async(header, id, token) => {
   return await commonRequest("GET", `${BASE_URL}/api/users/forgotpassword/${id}/${token}`, header);
}


// For Update the Forgot password.
const updatePassword = async(data, id, token, header) => {
   return await commonRequest("POST", `${BASE_URL}/api/users/updatepassword/${id}/${token}`,data, header);
}


export { RegistrationFunction, LoginFunction, ResetPasswordFn, verifiedForgotPasswordUser, updatePassword };