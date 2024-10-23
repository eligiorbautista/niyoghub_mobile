import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../contexts/AuthContext";

const useAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, setUser } = useContext(AuthContext);

  const fetchAnnouncements = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = await AsyncStorage.getItem("userToken");

      const response = await axios.get(
        `https://niyoghub-server.onrender.com/api/announcements`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setAnnouncements(response.data);
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
    fetchAnnouncements();
  }, []);

  return { announcements, loading, error, fetchAnnouncements };
};

export default useAnnouncements;
