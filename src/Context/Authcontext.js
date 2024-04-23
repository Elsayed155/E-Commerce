import React, { createContext, useState } from 'react';



export const authContext = createContext();




function AuthcontextProvider({children}) {
    const [isUserLogin , setIsUserLoding]= useState(!!(localStorage.getItem("token")));
    
    return (
        <>
        <authContext.Provider value={{isUserLogin,setIsUserLoding}}>
            {children}

        </authContext.Provider>
        
        
        </>
    )
}

export default AuthcontextProvider;