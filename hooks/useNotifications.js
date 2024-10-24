import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../contexts/AuthContext";
import io from "socket.io-client";

const useNotifications = () => {
  const [notifications, setNotifications] = useState([].reverse());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);

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

    // Initialize socket connection
    const newSocket = io("https://niyoghub-server.onrender.com");
    setSocket(newSocket);

    // Join the user's room
    if (user && user._id) {
      newSocket.emit("join", user._id);
    }

    // Listen for new notifications
    newSocket.on("newNotification", (notification) => {
      setNotifications((prevNotifications) => [notification, ...prevNotifications]);
    });

    newSocket.on("notificationRead", (notification) => {
      setNotifications((prevNotifications) =>
        prevNotifications.map((n) =>
          n._id === notification._id ? { ...n, read: true } : n
        )
      );
    });

    newSocket.on("allNotificationsRead", () => {
      setNotifications((prevNotifications) =>
        prevNotifications.map((n) => ({ ...n, read: true }))
      );
    });

    newSocket.on("notificationDeleted", (notificationId) => {
      setNotifications((prevNotifications) =>
        prevNotifications.filter((n) => n._id !== notificationId)
      );
    });

    // Clean up the socket connection
    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  return { notifications, loading, error, fetchNotifications };
};

export default useNotifications;
