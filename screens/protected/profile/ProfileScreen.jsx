import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// mock user data
const mockUser = {
  fullName: "Juan Dela Cruz",
  email: "juandelacruz@gmail.com",
  address: "Lucena City, Quezon",
  language: "English (US)",
  profilePicture: "../../../assets/farmer.png",
  accountType: "local",
  isTwoFactorEnabled: false,
};

const ProfileScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    console.log("Mock User data:", mockUser);
  }, []);

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>

          <Image
            source={require("../../../assets/niyoghub_banner_1.png")}
            style={styles.headerImage}
          />

          <Ionicons
            name="information-circle-outline"
            size={24}
            color="#F0F0F0"
          />
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* profile section */}
        <View style={styles.profileContainer}>
          <Image
            source={require("../../../assets/farmer.png")}
            style={styles.profilePicture}
          />
          <Text style={styles.fullName}>
            {mockUser?.fullName || "Full Name"}
          </Text>
          <Text style={styles.email}>
            {mockUser?.email || "Email not available"}
          </Text>

          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="create-outline" size={18} color="#537F19" />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* card */}
        <View style={styles.infoCard}>
          {mockUser?.address && (
            <View style={styles.infoRow}>
              <Ionicons name="location-outline" size={20} color="#444" />
              <Text style={styles.infoText}>{mockUser?.address}</Text>
            </View>
          )}

          <View style={styles.infoRow}>
            <Ionicons name="language-outline" size={20} color="#444" />
            <Text style={styles.infoText}>Language: {mockUser?.language}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="shield-checkmark-outline" size={20} color="#444" />
            <Text style={styles.infoText}>
              Two-Factor Authentication:{" "}
              {mockUser?.isTwoFactorEnabled ? "Enabled" : "Disabled"}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="key-outline" size={20} color="#444" />
            <Text style={styles.infoText}>
              Account Type: {mockUser?.accountType}
            </Text>
          </View>
        </View>

        {/* card */}
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
            onPress={() => navigation.navigate("Login")}
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
    marginTop: 30,
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
    borderColor: "#537F19",
    borderWidth: 1.3,
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginTop: 6,
    marginBottom: 10,
  },
  editButtonText: {
    color: "#537F19",
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
    backgroundColor: "#537F19",
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
