import React, { useState, useEffect } from "react";
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
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useRequestPasswordReset from "../../../hooks/useRequestPasswordReset"; // Import the custom hook

const ResetPasswordRequestScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const { requestPasswordReset, loading, message, error } = useRequestPasswordReset();

  const handleRequestPasswordReset = async () => {
    // Validation for email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    // Use the custom hook to request a password reset
    await requestPasswordReset(email);
  };

  // Watch for changes in the message or error state
  useEffect(() => {
    if (message) {
      Alert.alert("Success", message, [{ text: "OK", onPress: () => navigation.navigate("Login") }]);
    } else if (error) {
      Alert.alert("Error", error);
    }
  }, [message, error, navigation]);

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

        <Text style={styles.title}>Request Password Reset</Text>
        <Text style={styles.subtitle}>
          Please enter your email address. We will send you a link to reset your password if it is registered in our system.
        </Text>

        <Text style={styles.inputLabel}>Email Address</Text>
        <TextInput
          placeholder="Enter your email"
          keyboardType="email-address"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={styles.requestButton}
          onPress={handleRequestPasswordReset}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Request Password Reset</Text>
          )}
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default ResetPasswordRequestScreen;

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
  requestButton: {
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
