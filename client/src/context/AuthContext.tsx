import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [loggedIn,setLoggedIn] = useState(!!localStorage.getItem('token'));

    const login = (token,role) =>{
        localStorage.setItem('token',token);
        localStorage.setItem('role',role)
        setLoggedIn(true)
    }
    const logout = () =>{
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setLoggedIn(false)
    }

    return (
        <AuthContext.Provider value={{loggedIn,setLoggedIn,logout,login}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth =()=> useContext(AuthContext)