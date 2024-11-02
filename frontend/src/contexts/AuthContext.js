// AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => Cookies.get("token"));
  useEffect(() => {
    if (token) {
      Cookies.set("token", token, { expires: 7 }); 
    } else {
      Cookies.remove("token");
    }
  }, [token]);
  
  const login = (userData) => {
    setUser(userData); 
    setToken(userData.token); 
  };
  
  const logout = () => {
    setUser(null);
    setToken(null);
  };
  console.log(user)

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
