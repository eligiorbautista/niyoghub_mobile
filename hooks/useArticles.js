import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../contexts/AuthContext";
import io from "socket.io-client";

const useArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, setUser } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);

  articles.reverse();
  const fetchArticles = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = await AsyncStorage.getItem("userToken");

      const response = await axios.get(
        `https://niyoghub-server.onrender.com/api/articles`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setArticles(response.data);
      } else {
        setError("Failed to fetch articles.");
      }
    } catch (error) {
      console.error(`Error fetching articles: ${error.message}`);
      setError("An error occurred while fetching articles.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch articles initially
    fetchArticles();

    // Initialize socket connection
    const socketInstance = io("https://niyoghub-server.onrender.com");
    setSocket(socketInstance);

    // Listen for real-time updates
    socketInstance.on("articleCreated", (newArticle) => {
      fetchArticles(); // Refresh articles when a new article is created
    });

    socketInstance.on("articleUpdated", (updatedArticle) => {
      fetchArticles(); // Refresh articles when an article is updated
    });

    socketInstance.on("articleDeleted", (deletedArticleId) => {
      fetchArticles(); // Refresh articles when an article is deleted
    });

    // Cleanup socket connection on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return { articles, loading, error, fetchArticles };
};

export default useArticles;
