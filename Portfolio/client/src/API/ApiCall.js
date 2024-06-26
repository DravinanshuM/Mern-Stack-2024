import axios from "axios";

const commonRequest = async (methods, url, body, header) => {
  // step: 1. set the config.
  const config = {
    method: methods,
    url: url,
    data: body,
    headers: header
      ? header
      : {
          "Content-Type": "Application/json",
        },
  };

  // step 2. create axios instance.
  return axios(config)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export { commonRequest };
