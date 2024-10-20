import { useEffect, useState } from "react";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";

const useUnreadNotifications = (userId) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        if (userId) {
          const response = await axios.get(
            `https://niyoghub-server.onrender.com/api/notifications/${userId}`
          );
          // Filter out the unread notifications
          const unreadNotifications = response.data.filter((n) => !n.read);
          setUnreadCount(unreadNotifications.length);
        }
      } catch (error) {
        console.error("Failed to fetch unread notifications", error);
      }
    };

    fetchUnreadCount();
  }, [userId, isFocused]);

  return unreadCount;
};

export default useUnreadNotifications;
