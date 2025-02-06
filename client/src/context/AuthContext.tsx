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
                // console.log(token)
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
    // Check token expiration on load and remove expired token
  useEffect(() => {
    const tokenData = JSON.parse(localStorage.getItem("token") || "null");
    if (tokenData && Date.now() > tokenData.expiry) {
      logout();
    } else if (tokenData) {
      getUserData(tokenData.value).then((user) => {
        setUserData(user);
      });
    }
  }, []);

  const login = (token: string, role: string) => {
    const expiryTime = Date.now() + 24 * 60 * 60 * 1000; // 1 day
    localStorage.setItem("token", JSON.stringify({ value: token, expiry: expiryTime }));
    localStorage.setItem("role", role);
    setLoggedIn(true);
  };

    const logout = () =>{
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setLoggedIn(false);
        setUserData(null);
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

