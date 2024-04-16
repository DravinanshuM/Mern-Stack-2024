import { commonRequest } from "./ApiCall.js";
import  { BASE_URL } from "./helper.js";

// For Register Data API.
const registerFunction = async (data, header) => {
     return await commonRequest("POST", `${BASE_URL}/users/register`, data, header);
}

// For Get All Data API.
const getAllUserFunction = async(search, gender, status, sort, page) => {
     return await commonRequest("GET", `${BASE_URL}/users/details?search=${search}&gender=${gender}&status=${status}&sort=${sort}&page=${page}`, null);
}

// For Get Single Data API.
const singleUsergetfunction = async (id) => {
     return await commonRequest("GET", `${BASE_URL}/users/${id}`, null);
}

// For Delete Single API.
const deleteUserFunction = async(id) => {
     return await commonRequest("DELETE", `${BASE_URL}/users/${id}`, {});
}

// For Update single API.
const updateFunction = async(id,data,header) => {
     return await commonRequest("PUT",`${BASE_URL}/users/update/${id}`,data, header);
}

// For Update Satatus API.
const satatusChangeFunction = async(id, status) => {
     return await commonRequest("PUT", `${BASE_URL}/users/status/${id}`, {status});
}

// For Export CSV file.
const exportToCSV = async() => {
     return await commonRequest("GET", `${BASE_URL}/users/userexport`, "");
}

export { registerFunction, getAllUserFunction, singleUsergetfunction, deleteUserFunction, updateFunction, satatusChangeFunction, exportToCSV }