import { useState } from "react";
import axios from "axios";

const useRequestPasswordReset = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const requestPasswordReset = async (email) => {
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      const response = await axios.post(
        "https://niyoghub-server.onrender.com/api/auth/request-password-reset",
        { email }
      );

      if (response.status === 200) {
        setMessage(response.data.message || "If the email is registered, a password reset link has been sent.");
      } else {
        setError("Failed to request password reset.");
      }
    } catch (error) { 
      const errorMessage = error.response?.data?.error || "An error occurred. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { requestPasswordReset, loading, message, error };
};

export default useRequestPasswordReset;
