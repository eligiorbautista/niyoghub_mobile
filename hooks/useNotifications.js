import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../contexts/AuthContext";

const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, setUser } = useContext(AuthContext);

  const fetchNotifications = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = await AsyncStorage.getItem("userToken");

      const response = await axios.get(
        `https://niyoghub-server.onrender.com/api/notifications/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setNotifications(response.data);
      } else {
        setError("Failed to fetch notifications.");
      }
    } catch (error) {
      console.error(`Error fetching notifications: ${error.message}`);
      setError("An error occurred while fetching notifications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return { notifications, loading, error, fetchNotifications };
};

export default useNotifications;
