import { useState, useContext } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../contexts/AuthContext";

const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setUser } = useContext(AuthContext);

  const updateUser = async (updatedFields, imageUri) => {
    console.log(updatedFields);
    setLoading(true);
    setError(null);
    try {
      const token = await AsyncStorage.getItem("userToken");

      if (!token) {
        setError("Authorization token not found.");
        setLoading(false);
        return null;
      }

      // Create a FormData object to handle the fields that need to be updated
      let formData = new FormData();
      if (imageUri) {
        formData.append("profilePicture", {
          uri: imageUri,
          type: "image/jpeg",
          name: "profile.jpg",
        });
      }

      // Append only the fields provided in updatedFields to FormData
      Object.keys(updatedFields).forEach((key) => {
        // Check if the field is an object (e.g., notifications) and convert it to a JSON string
        if (typeof updatedFields[key] === "object") {
          formData.append(key, JSON.stringify(updatedFields[key]));
        } else {
          formData.append(key, updatedFields[key]);
        }
      });

      // Make the API request to update the user profile
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
        // Update the user context with the new data
        setUser(response.data.user);
        return response.data; // Return the response data to the caller
      } else {
        setError("Failed to update profile.");
        return null;
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "An error occurred while updating the profile."
      );
      console.error("Error updating user profile:", err.response?.data || err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { updateUser, loading, error };
};

export default useUpdateUser;
