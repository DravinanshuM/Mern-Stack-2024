import { commonRequest } from "./ApiCall.js";
import { BASE_URL } from "./helper.js";

// 1. setData function.
const getInroDataFunction = async () => {
    return await commonRequest("GET", `${BASE_URL}/api/introduction/all-data`, null)
};

export { getInroDataFunction };
