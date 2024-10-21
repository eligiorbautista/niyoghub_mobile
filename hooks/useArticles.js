import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../contexts/AuthContext";

const useArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, setUser } = useContext(AuthContext);

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
    fetchArticles();
  }, []);

  return { articles, loading, error, fetchArticles };
};

export default useArticles;
