import { useState, useContext } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../contexts/AuthContext";

const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setUser } = useContext(AuthContext);

  const updateUser = async (updatedFields, imageUri) => {
    setLoading(true);
    setError(null);
    try {
      const token = await AsyncStorage.getItem("userToken");

      if (!token) {
        setError("Authorization token not found.");
        setLoading(false);
        return;
      }

      // Create a FormData object
      const formData = new FormData();

      // Append the updated fields to the FormData
      for (const key in updatedFields) {
        formData.append(key, updatedFields[key]);
      }

      // If an image URI is provided, add it to the FormData
      if (imageUri) {
        const uriParts = imageUri.split(".");
        const fileType = uriParts[uriParts.length - 1];

        formData.append("profilePicture", {
          uri: imageUri,
          name: `profile.${fileType}`,
          type: `image/${fileType}`,
        });
      }

      const response = await axios.put(
        "https://niyoghub-server.onrender.com/api/user/profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setUser(response.data.user);
      } else {
        setError("Failed to update profile.");
      }
    } catch (err) {
      setError("An error occurred while updating the profile.");
    } finally {
      setLoading(false);
    }
  };

  return { updateUser, loading, error };
};

export default useUpdateUser;
