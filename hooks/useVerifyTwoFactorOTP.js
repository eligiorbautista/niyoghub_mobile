import { useState, useContext } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../contexts/AuthContext";

const useVerifyTwoFactorOTP = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setUser } = useContext(AuthContext);

  const verifyTwoFactorOTP = async (email, otp) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "https://niyoghub-server.onrender.com/api/auth/verify-otp",
        { email, otp },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        const { token, user } = response.data;
        const userDetails = user;
        await AsyncStorage.setItem("userToken", token);
        await AsyncStorage.setItem("userAuthenticated", "true");
        setUser(userDetails);

        return { status: 200 };
      } else {
        setError("Invalid or expired OTP.");
        return { status: 400 };
      }
    } catch (error) {
      setError("Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { verifyTwoFactorOTP, loading, error };
};

export default useVerifyTwoFactorOTP;
