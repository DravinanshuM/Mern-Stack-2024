import { commonRequest } from "./ApiCall.js";
import { BASE_URL } from "./helper.js";

// 1. setData function for introduction (Home).
const getInroDataFunction = async () => {
  return await commonRequest(
    "GET",
    `${BASE_URL}/api/introduction/all-data`,
    null
  );
};

// 2. setData function for About page.
const getAboutFunction = async () => {
  return await commonRequest("GET", `${BASE_URL}/api/about/all-data`, null);
};

// 3. setData function for contact Page.
const getContactFunction = async () => {
  return await commonRequest("GET", `${BASE_URL}/api/contact/all-data`, null);
};

// 4. setData function for experience page.
const getExperienceFunction = async () => {
  return await commonRequest(
    "GET",
    `${BASE_URL}/api/experience/all-data`,
    null
  );
};

// 5. setData function for Project page.
const getProjectFunction = async () => {
  return await commonRequest("GET", `${BASE_URL}/api/project/all-data`, null);
};

export {
  getInroDataFunction,
  getAboutFunction,
  getContactFunction,
  getExperienceFunction,
  getProjectFunction,
};
