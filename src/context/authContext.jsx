// context/authContext.jsx
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const userContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Restore session from cookie
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users/verify", {
          withCredentials: true,
        });

        if (response.data.success) {
          setUser(response.data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.log("Session invalid or expired");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:3000/api/users/logout", {}, {
        withCredentials: true,
      });
    } catch (err) {
      console.error("Logout failed:", err.message);
    } finally {
      setUser(null);
    }
  };

  return (
    <userContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </userContext.Provider>
  );
};

export const useAuth = () => useContext(userContext);

export default AuthProvider;