import { useState, useContext, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../contexts/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setUser, setAdmin } = useContext(AuthContext);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "https://niyoghub-server.onrender.com/api/auth/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const { message, token, user, adminID } = response.data;
      const userDetails = user;

      if (response.status === 200) {
        if (message === "OTP sent to your email.") {
          // Handle 2FA case
          setUser({ email: email, isTwoFactorEnabled: true });
          setAdmin(adminID);
          return { status: "2fa" };
        } else {
          // Save token and user data
          await AsyncStorage.setItem("userToken", token);
          setUser(userDetails);
          setAdmin(adminID);
          console.log(adminID);
          return { status: "ok" };
        }
      } else {
        setError("Invalid credentials or user not found.");
      }
    } catch (error) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};

export default useLogin;
