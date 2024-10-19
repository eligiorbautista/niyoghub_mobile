import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://niyoghub-server.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      console.log(`STATUS ON REGISTRATION: ${JSON.stringify(response.status)}`);

      const userData = response.data;

      if (response.status === 200) {
        setUser(userData);
        await AsyncStorage.setItem("user", JSON.stringify(userData));
        console.log(`USER SUCCESSFULLY LOGGED IN`);
        console.log(JSON.stringify(userData));
      }
    } catch (error) {
      console.log("Login error:", error);
      throw new Error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const register = async (userDetails) => {
    console.log("Registration Details: ", userDetails);

    setLoading(true);
    try {
      const response = await axios.post(
        "https://niyoghub-server.onrender.com/api/auth/register",
        userDetails,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(`STATUS ON REGISTRATION: ${JSON.stringify(response.status)}`);
      const userData = response.data;

      if (response.status === 201) {
        setUser(userData);
        await AsyncStorage.setItem("user", JSON.stringify(userData));
        console.log(`USER SUCCESSFULLY REGISTERED`);
        console.log(JSON.stringify(userData));
      }
    } catch (error) {
      console.log("Registration error:", error.message);
      throw new Error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const response = await axios.post(
        "https://niyoghub-server.onrender.com/api/auth/logout"
      );

      if (response.status === 200) {
        setLoading(true);
        setUser(null);
        await AsyncStorage.removeItem("user");
        setLoading(false);
        console.log(`USER SUCCESSFULLY LOGGED OUT`);
      }
    } catch (error) {
      console.log("Logout error:", error.message);
      throw new Error("Logout failed");
    }
  };

  const isLoggedIn = async () => {
    setLoading(true);
    try {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.log("Error retrieving user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
