import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("user");
    }
  }, [currentUser]);

  const register = async ({ name, email, password, role = "user" }) => {
    const { data: existingUsers } = await axios.get(
      `https://684b446a165d05c5d35c0248.mockapi.io/propertiesapi/users?email=${email}`
    );
    if (existingUsers.length > 0) throw new Error("Email already registered");

    const { data } = await axios.post("https://684b446a165d05c5d35c0248.mockapi.io/propertiesapi/users", {
      name,
      email,
      password,
      role,
    });

    setCurrentUser(data);
    return data;
  };

  const login = async (email, password) => {
    const { data } = await axios.get(
      `https://684b446a165d05c5d35c0248.mockapi.io/propertiesapi/users?email=${email}&password=${password}`
    );
    if (data.length === 0) throw new Error("Invalid credentials");

    setCurrentUser(data[0]);
    return data[0];
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, register, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;