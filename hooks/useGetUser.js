import { useState, useContext } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../contexts/AuthContext";

const useGetUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setUser } = useContext(AuthContext);

  const getUser = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "https://niyoghub-server.onrender.com/api/user/profile",

        { headers: { "Content-Type": "application/json" } }
      );

      const { message, token, user } = response.data;
      const userDetails = user;

      if (response.status === 200) {
        if (message === "OTP sent to your email.") {
          // Handle 2FA case
          setUser({ email: email, isTwoFactorEnabled: true });
          return { status: "2fa" };
        } else {
          // Save token and user data
          await AsyncStorage.setItem("userToken", token);
          await AsyncStorage.setItem("userAuth", userDetails);
          setUser(userDetails);
          return { status: "ok" };
        }
      } else {
        setError("Invalid credentials or user not found.");
      }
    } catch (error) {
      setError("getUser failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { getUser, loading, error };
};

export default useGetUser;
