import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ChangePasswordScreen = ({ navigation }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = () => {
    // if (newPassword !== confirmPassword) {
    //   Alert.alert("Error", "Passwords do not match.");
    //   return;
    // }

    // if (newPassword.length < 6) {
    //   Alert.alert("Error", "Password should be at least 6 characters long.");
    //   return;
    // }

    
    Alert.alert("Success", "Your password has been changed.");
    navigation.navigate("Login");
  };

  return (
    <ImageBackground
      source={require("../../../assets/background.png")}
      style={styles.background}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <Image
          source={require("../../../assets/niyoghub_banner_1.png")}
          style={styles.headerImage}
        />
 
          <Ionicons name="information-circle-outline" size={24} color="transparent" />
        
      </View>

        <Text style={styles.title}>Change Your Password</Text>
        <Text style={styles.subtitle}>
          Please enter your new password and confirm it.
        </Text>

        <Text style={styles.inputLabel}>New Password</Text>
        <TextInput
          placeholder="Enter new password"
          secureTextEntry
          style={styles.input}
          value={newPassword}
          onChangeText={setNewPassword}
        />

        <Text style={styles.inputLabel}>Confirm Password</Text>
        <TextInput
          placeholder="Confirm your password"
          secureTextEntry
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity
          style={styles.changePasswordButton}
          onPress={handlePasswordChange}
        >
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  headerImage: {
    width: 120,
    height: 40,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "#666",
    lineHeight: 22,
  },
  inputLabel: {
    marginBottom: 5,
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  changePasswordButton: {
    backgroundColor: "#537F19",
    padding: 12,
    alignItems: "center",
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});
