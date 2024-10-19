import { useState } from "react";
import axios from "axios";

const useResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const resetPassword = async (token, newPassword, confirmNewPassword) => {
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      const response = await axios.post(
        `https://niyoghub-server.onrender.com/api/auth/reset-password/${token}`,
        { newPassword, confirmNewPassword }
      );

      if (response.status === 200) {
        setMessage(response.data.message || "Password reset successfully.");
      } else {
        setError("Invalid or expired token.");
      }
    } catch (error) { 
      const errorMessage = error.response?.data?.error || "Password reset failed. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { resetPassword, loading, message, error };
};

export default useResetPassword;
