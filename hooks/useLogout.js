import { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const { user, setUser } = useContext(AuthContext);

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "https://niyoghub-server.onrender.com/api/auth/logout"
      );

      if (response.status === 200) {
        await AsyncStorage.removeItem("userToken");
        setUser(null);
      } else {
        setError("Failed to log out.");
      }
    } catch (error) {
      setError("Logout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { logout, loading, error };
};

export default useLogout;
