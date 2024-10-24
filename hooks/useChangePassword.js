import { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const changePassword = async (passwordData) => {
    setLoading(true);
    setError(null);

    console.log(`Password Data: ${JSON.stringify(passwordData)}`);

    try { 
      const token = await AsyncStorage.getItem("userToken");

      if (!token) {
        setError("Authorization token not found.");
        setLoading(false);
        return { success: false, message: "Authorization token not found." };
      }

      // change the password
      const response = await axios.put(
        "https://niyoghub-server.onrender.com/api/user/change-password",
        passwordData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        return { success: true, message: response.data.message };
      } else {
        setError("Failed to change password.");
        return { success: false, message: "Failed to change password." };
      }
    } catch (err) {
      setError("An error occurred while changing the password.");
      return {
        success: false,
        message: "An error occurred while changing the password.",
      };
    } finally {
      setLoading(false);
    }
  };

  return { changePassword, loading, error };
};

export default useChangePassword;
