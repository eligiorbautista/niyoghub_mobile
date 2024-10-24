import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { io } from "socket.io-client";

const useChat = (admin) => { 
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const socket = io("https://niyoghub-server.onrender.com");

  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem("userToken");
      const response = await axios.get(
        `https://niyoghub-server.onrender.com/api/messages/${admin}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (content, attachment = null) => {
    try {
      const formData = new FormData();

      if (content) {
        formData.append("message", content);
      }

      if (attachment && attachment.assets[0].uri) {
        const filePath = attachment.assets[0].uri;
        const fileName = attachment.assets[0].name;
        const fileType =
          attachment.assets[0].mimeType || "application/octet-stream";

        formData.append("attachment", {
          uri: filePath,
          type: fileType,
          name: fileName,
        });
      }

      const token = await AsyncStorage.getItem("userToken");

      const response = await axios.post(
        `https://niyoghub-server.onrender.com/api/messages/send/${admin}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // handle updating the messages state
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    fetchMessages();

    // listen for new messages from the socket
    socket.on("newMessage", (newMessage) => {
      setMessages((prevMessages) => {
        const messageExists = prevMessages.some(
          (msg) => msg._id === newMessage._id
        );
        if (!messageExists) {
          return [...prevMessages, newMessage];
        }
        return prevMessages;
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return { messages, isLoading, sendMessage, fetchMessages };
};

export default useChat;
