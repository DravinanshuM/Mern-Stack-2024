import React, { createContext, useState } from 'react';

export const LoginContext = createContext();

const ContextAPI = ({ children }) => {
    const [userLogin, setUserLogin] = useState("");
  return (
    <LoginContext.Provider value={{userLogin, setUserLogin}}>
      {children}
    </LoginContext.Provider>
  )
}

export default ContextAPI;