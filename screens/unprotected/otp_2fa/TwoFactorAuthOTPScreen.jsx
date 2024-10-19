import React, { useRef, useState, useEffect, useContext } from "react";
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
  ActivityIndicator,
  BackHandler
} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import TwoFactorAuthOTPModal from "../../../components/otp_2fa/TwoFactorAuthOTPModal";
import useVerifyTwoFactorOTP from "../../../hooks/useVerifyTwoFactorOTP";
import useLogin from "../../../hooks/useLogin";
import { AuthContext } from '../../../contexts/AuthContext';

const TwoFactorAuthOTPScreen = ({ navigation }) => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { user } = useContext(AuthContext);

  const otpRefs = Array(6)
    .fill()
    .map(() => useRef(null));

  // countdown state
  const [countdown, setCountdown] = useState(300); // 5 minutes
  const [isCountdownActive, setIsCountdownActive] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    const fetchUserEmail = async () => {
      if (user) {
        setEmail(user.email);
      }
    };
    fetchUserEmail();
  }, []);

  // Using the custom hook for OTP verification
  const { verifyTwoFactorOTP, loading, error } = useVerifyTwoFactorOTP();

  const { login } = useLogin();

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

  const handleVerifyOTP = async () => {
    const enteredOtp = otp.join("");
    console.log(`OTP Entered: ${enteredOtp}`);
    console.log(`Email: ${email}`);

    if (email) {
      const response = await verifyTwoFactorOTP(email, enteredOtp);
 
      if (response.status === 200) {
        navigation.navigate("Layout");
      } else { 
        console.log("OTP verification failed:", error);
      }
    }
  };


  const handleInfoDialog = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleResendCode = async () => {
    console.log("Resending OTP...");

    await login(email, password);

    setCountdown(300); // reset
    setIsCountdownActive(true); // start
  };

  // Handle hardware back button press
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('Login'); // Navigate to Login screen
        return true; // Prevent default behavior
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );

      return () => subscription.remove(); // Clean up the listener on unmount
    }, [navigation])
  );

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
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>

          <Image
            source={require("../../../assets/niyoghub_banner_1.png")}
            style={styles.headerImage}
          />

          <TouchableOpacity onPress={handleInfoDialog}>
            <Ionicons
              name="information-circle-outline"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Two-Factor Authentication</Text>
        <Text style={styles.subtitle}>
          Please enter the One-Time Password (OTP) sent to your registered email
          to complete the sign-in process.
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
              {isCountdownActive
                ? `Resend code in ${countdown}s`
                : "Resend Code"}
            </Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="rgba(83, 127, 25, 0.8)" />
        ) : (
          <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOTP}>
            <Text style={styles.verifyButtonText}>Verify OTP</Text>
          </TouchableOpacity>
        )}

        {error && <Text style={styles.errorText}>{error}</Text>}

        <TwoFactorAuthOTPModal
          isVisible={isModalVisible}
          onClose={closeModal}
        />
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default TwoFactorAuthOTPScreen;

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
    marginBottom: 40,
  },
  resendText: {
    color: 'rgba(83, 127, 25, 0.8)',
    fontWeight: "bold",
  },
  verifyButton: {
    backgroundColor: 'rgba(83, 127, 25, 0.8)',
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
  errorText: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
});
