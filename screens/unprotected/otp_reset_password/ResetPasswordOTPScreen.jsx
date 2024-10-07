import React, { useEffect, useRef, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ResetPasswordOTPModal from "../../../components/otp_reset_password/ResetPasswordOTPModal";

const ResetPasswordOTPScreen = ({ navigation }) => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [isModalVisible, setIsModalVisible] = useState(false);
  const otpRefs = Array(6)
    .fill()
    .map(() => useRef(null));

  // countdown state
  const [countdown, setCountdown] = useState(300); // 5 minutes
  const [isCountdownActive, setIsCountdownActive] = useState(true);

  useEffect(() => {
    // countdown timer
    if (isCountdownActive) {
      const timerId = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timerId);
            setIsCountdownActive(false); // end
            return 0; // end
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timerId); // clear timer on unmount
    }
  }, [isCountdownActive]);

  const handleOTPChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    if (value.length === 1 && index < otpRefs.length - 1) {
      otpRefs[index + 1].current.focus(); // move to next box
    }
    if (value === "" && index > 0) {
      otpRefs[index - 1].current.focus(); // go back to previous box
    }
  };

  const handleVerifyOTP = () => {
    const enteredOtp = otp.join("");
    console.log(`OTP Entered: ${enteredOtp}`);
  };

  const handleInfoDialog = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleResendCode = () => {
    console.log("Resending OTP...");
    setCountdown(300); // reset
    setIsCountdownActive(true); // start
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

        <TouchableOpacity onPress={handleInfoDialog}>
          <Ionicons name="information-circle-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Password Reset Verification</Text>
      <Text style={styles.subtitle}>
        Please enter the One-Time Password (OTP) sent to your email to reset
        your password.
      </Text>

      {/* OTP input boxes */}
      <View style={styles.otpContainer}>
        {Array(6)
          .fill()
          .map((_, index) => (
            <TextInput
              key={index}
              ref={otpRefs[index]}
              style={styles.otpInput}
              maxLength={1}
              keyboardType="number-pad"
              value={otp[index]} // controlled input for each digit
              onChangeText={(value) => handleOTPChange(value, index)}
            />
          ))}
      </View>

      <View style={styles.resendContainer}>
        <Text>Didn't get the code? </Text>
        <TouchableOpacity
          onPress={handleResendCode}
          disabled={isCountdownActive}
        >
          <Text style={styles.resendText}>
            {isCountdownActive ? `Resend code in ${countdown}s` : "Resend Code"}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signInRow}>
        <Text style={styles.link}>Remembered your password? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOTP}>
        <Text style={styles.verifyButtonText}>Verify OTP</Text>
      </TouchableOpacity>

      <ResetPasswordOTPModal isVisible={isModalVisible} onClose={closeModal} />
    </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default ResetPasswordOTPScreen;

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
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    width: 50,
    height: 50,
    textAlign: "center",
    fontSize: 22,
    backgroundColor: "#FFF",
    borderRadius: 10,
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  resendText: {
    color: "#537F19",
    fontWeight: "bold",
  },
  signInRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
  },
  signInText: {
    fontSize: 14,
    color: "#537F19",
    fontWeight: "bold",
  },
  verifyButton: {
    backgroundColor: "#537F19",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  verifyButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});
