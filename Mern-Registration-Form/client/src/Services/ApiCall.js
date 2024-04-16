import axios from 'axios';

const commonRequest = async(methods, url, body, header) => {
    const config = {
        method: methods,
        url: url,
        data: body,
        headers: header ? header:{
            "Content-Type": "Application/json"
        } 
    }

    // create axios instance.
    return axios(config).then((data)=>{
        return data;
    }).catch((error)=>{
        return error;
    })
}

export { commonRequest }