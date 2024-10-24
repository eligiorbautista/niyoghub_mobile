import { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";

const useUnreadNotifications = (userId) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const socket = io("https://niyoghub-server.onrender.com");

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        if (userId) {
          const response = await axios.get(
            `https://niyoghub-server.onrender.com/api/notifications/${userId}`
          );
          const unreadNotifications = response.data.filter((n) => !n.read);
          setUnreadCount(unreadNotifications.length);
        }
      } catch (error) {
        console.error("Failed to fetch unread notifications", error);
      }
    };

    fetchUnreadCount();

    if (userId) {
      socket.emit("join", userId);

      socket.on("newNotification", () => {
        setUnreadCount((prevCount) => prevCount + 1);
      });

      socket.on("notificationRead", () => {
        setUnreadCount((prevCount) => Math.max(prevCount - 1, 0));
      });

      socket.on("allNotificationsRead", () => {
        setUnreadCount(0);
      });
    }

    return () => {
      if (userId) {
        socket.emit("leave", userId);
        socket.disconnect();
      }
    };
  }, [userId]);

  return unreadCount;
};

export default useUnreadNotifications;
