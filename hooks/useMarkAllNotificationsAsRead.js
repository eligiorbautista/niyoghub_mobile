import { useState, useCallback, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const useMarkAllNotificationsAsRead = () => {
  const { user } = useContext(AuthContext); // Get the user from AuthContext
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to mark all notifications as read
  const markAllAsRead = useCallback(async () => {
    if (!user || !user._id) {
      console.error("User ID is not available.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://niyoghub-server.onrender.com/api/notifications/markAllAsRead/${user._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to mark notifications as read");
      }

      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      console.error("Error marking notifications as read:", error);
    }
  }, [user]);

  return {
    markAllAsRead,
    loading,
    error,
  };
};

export default useMarkAllNotificationsAsRead;
