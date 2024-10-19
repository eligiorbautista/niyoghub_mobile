import { useState, useContext } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../contexts/AuthContext";
const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, setUser } = useContext(AuthContext);

  const register = async (userDetails) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "https://niyoghub-server.onrender.com/api/auth/register",
        userDetails
      );

      const { token, user } = response.data;

      if (response.status === 201) {
        const userDetails = user;
        await AsyncStorage.setItem("userToken", token);
        setUser(userDetails);
      } else {
        setError("Registration failed. Email may already exist.");
      }
    } catch (error) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
};

export default useRegister;
