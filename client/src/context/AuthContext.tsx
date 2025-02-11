import axios from "axios";
import { createContext, useContext, useState,useEffect } from "react";
interface AuthContextType {
    loggedIn: boolean;
    userData: any;
    login: (token: string, role: string) => void;
    logout: () => void;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    setUserData: React.Dispatch<React.SetStateAction<any>>;
    getUserData: (token: string) => Promise<any>;
  }

// Provide a default value
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}:{children:React.ReactNode}) =>{
    const [loggedIn,setLoggedIn] = useState<boolean>(!!localStorage.getItem('token'));
    const [userData,setUserData] = useState<any>(null);

    const getUserData = async(token:string) =>{
        try{
            if(token){
                console.log("Token : ",token)
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/user`, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    }
                });
                console.log("User Data " ,response.data)
                return response.data.user;
            }
            return null
        }catch(err){
            console.log(err)
        }
    }
    // Automatically fetch user data if logged in on initial load
    useEffect(() => {
        if (loggedIn) {
        const token = localStorage.getItem("token") as string;
        getUserData(token).then((user) => {
            setUserData(user); // Set user data when the app loads if logged in
        });
        }
    }, [loggedIn]);

    const login = (token:string,role:string) =>{
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
        <AuthContext.Provider value={{loggedIn,setLoggedIn,logout,login,userData,setUserData,getUserData}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
  };