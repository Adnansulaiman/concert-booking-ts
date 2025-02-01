import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [loggedIn,setLoggedIn] = useState(!!localStorage.getItem('token'));

    const login = (token) =>{
        localStorage.setItem('token',token);
        setLoggedIn(true)
    }
    const logout = () =>{
        localStorage.removeItem('token');
        setLoggedIn(false)
    }

    return (
        <AuthContext.Provider value={{loggedIn,setLoggedIn,logout,login}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth =()=> useContext(AuthContext)