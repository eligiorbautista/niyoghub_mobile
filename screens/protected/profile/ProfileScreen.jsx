import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useContext, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../../contexts/AuthContext";
import useLogout from "../../../hooks/useLogout";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Mock user data
const mockUser = {
  fullName: "Juan Dela Cruz",
  email: "juandelacruz@gmail.com",
  address: "Lucena City, Quezon",
  language: "English (US)",
  profilePicture: `https://www.pngarts.com/files/10/Default-Profile-Picture-Download-PNG-Image.png`,
  accountType: "local",
  isTwoFactorEnabled: false,
};

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const { logout } = useLogout();
  const [profilePicture, setProfilePicture] = useState("");

  const userAuth = AsyncStorage.getItem('userAuth');

  useEffect(() => {
    if (user?.profilePicture?.includes("https://ui-avatars.com/api/?name=")) {
      setProfilePicture(user.profilePicture);
    } else {
      setProfilePicture(`https://niyoghub-server.onrender.com/${user?.profilePicture}`);
    }
  }, [userAuth?.profilePicture]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>

          <Image
            source={require("../../../assets/niyoghub_banner_1.png")}
            style={styles.headerImage}
          />

          <Ionicons name="information-circle-outline" size={24} color="#F0F0F0" />
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: profilePicture || `https://www.pngarts.com/files/10/Default-Profile-Picture-Download-PNG-Image.png` }}
            style={styles.profilePicture}
          />
          <Text style={styles.fullName}>{userAuth?.fullName || mockUser.fullName}</Text>
          <Text style={styles.email}>{userAuth?.email || mockUser.email}</Text>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate("ProfileSettings")}
          >
            <Ionicons name="create-outline" size={18} color="rgba(83, 127, 25, 0.8)" />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Information Card */}
        <View style={styles.infoCard}>
          {mockUser?.address && (
            <View style={styles.infoRow}>
              <Ionicons name="location-outline" size={20} color="#444" />
              <Text style={styles.infoText}>{userAuth?.city || mockUser?.address}</Text>
            </View>
          )}

          <View style={styles.infoRow}>
            <Ionicons name="language-outline" size={20} color="#444" />
            <Text style={styles.infoText}>Language: {userAuth?.language || mockUser?.language}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="shield-checkmark-outline" size={20} color="#444" />
            <Text style={styles.infoText}>
              Two-Factor Authentication:{" "}
              {userAuth?.isTwoFactorEnabled || mockUser?.isTwoFactorEnabled ? "Enabled" : "Disabled"}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="key-outline" size={20} color="#444" />
            <Text style={styles.infoText}>
              Account Type: {userAuth?.accountType || mockUser?.accountType}
            </Text>
          </View>
        </View>

        {/* Settings Card */}
        <View style={styles.settingsCard}>
          <TouchableOpacity
            style={styles.settingsOption}
            onPress={() => navigation.navigate("AccountSettings")}
          >
            <Ionicons name="settings-outline" size={20} color="#444" />
            <Text style={styles.settingsText}>Account Settings</Text>
          </TouchableOpacity>
          <View style={styles.divider}></View>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => {
              logout();
              navigation.navigate("Login");
            }}
          >
            <Ionicons name="log-out-outline" size={20} color="white" />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  /* header */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#F0F0F0",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    paddingTop: 40,
    marginBottom: 10,
  },
  headerImage: {
    width: 150,
    height: 50,
    resizeMode: "contain",
  },
  scrollView: {
    flex: 1,
  },
  profileContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  fullName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "rgba(83, 127, 25, 0.8)",
    borderWidth: 1.3,
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginTop: 6,
    marginBottom: 10,
  },
  editButtonText: {
    color: "rgba(83, 127, 25, 0.8)",
    fontSize: 14,
    marginLeft: 5,
    fontWeight: "500",
  },
  infoCard: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 20,
    marginHorizontal: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#444",
  },
  settingsCard: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    marginHorizontal: 20,
  },
  settingsOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  settingsText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#444",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(83, 127, 25, 0.8)",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    justifyContent: "center",
  },
  logoutButtonText: {
    color: "white",
    fontSize: 14,
    marginLeft: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginBottom: 20,
    width: "100%",
  },
});
