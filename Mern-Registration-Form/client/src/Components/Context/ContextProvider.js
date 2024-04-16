import React, { createContext, useState } from 'react';

export const addData = createContext();
export const dlData = createContext();
export const updateData = createContext();

const ContextProvider = ({ children }) => {

    // For user Add.
    const [userAdd, setUserAdd] = useState("");
    // For user Delete.
    const [userDelete, setUserDelete] = useState("");
    // For Update.
    const [userUpdate, setUserUpdate] = useState("");

  return (
   <>
      <addData.Provider value={{userAdd, setUserAdd}}>
        <dlData.Provider value={{userDelete, setUserDelete}}>
          <updateData.Provider value={{userUpdate, setUserUpdate}}>
             {children}
          </updateData.Provider>
        </dlData.Provider>
      </addData.Provider>
   </>
  )
}

export default ContextProvider;