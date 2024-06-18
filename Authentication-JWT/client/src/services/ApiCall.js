 import axios from 'axios';

 const commonRequest = async( method, url, body, header ) => {

    const config = {
        method: method,
        url: url,
        data: body,
        header: header ? header : {
            "Content-Type": "application/json"
        },
    }

    // Create Axios Instance.
    return axios(config).then((data)=>{
        return data;
    }).catch((error)=> {
        return error;
    })
 }

 export default commonRequest;

