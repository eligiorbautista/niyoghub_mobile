import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const OTPScreen = ({ navigation }) => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [isModalVisible, setIsModalVisible] = useState(false);
  const otpRefs = Array(6).fill().map(() => useRef(null));

  const handleOTPChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    if (value.length === 1 && index < otpRefs.length - 1) {
      otpRefs[index + 1].current.focus(); // move to next box
    }
    if (value === '' && index > 0) {
      otpRefs[index - 1].current.focus(); // go back to previous box
    }
  };

  const handleVerifyOTP = () => {
    const enteredOtp = otp.join('');
    console.log(`OTP Entered: ${enteredOtp}`);
  };

  const handleInfoDialog = () => {
    setIsModalVisible(true); // Show the modal
  };

  const closeModal = () => {
    setIsModalVisible(false); // Hide the modal
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <Image
          source={require('../../assets/niyoghub_banner_1.png')}
          style={styles.headerImage}
        />

        <TouchableOpacity onPress={handleInfoDialog}>
          <Ionicons name="information-circle-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.subtitle}>
        Please enter the One-Time Password (OTP) sent to your email or mobile number.
      </Text>

      {/* OTP input boxes */}
      <View style={styles.otpContainer}>
        {Array(6).fill().map((_, index) => (
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
        <TouchableOpacity>
          <Text style={styles.resendText}>Resend Code</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signInRow}>
        <Text style={styles.link}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOTP}>
        <Text style={styles.verifyButtonText}>Verify</Text>
      </TouchableOpacity>

      {/* modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>What is an OTP?</Text>
            <Text style={styles.modalText}>
              An OTP (One-Time Password) is a temporary code sent to your email or phone. It is used
              to verify your identity when logging in or completing a transaction. Each OTP can only
              be used once and usually expires after a short period of time.
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>Got it!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  headerImage: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
    lineHeight: 22,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    width: 50,
    height: 50,
    textAlign: 'center',
    fontSize: 22,
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  resendText: {
    color: '#537F19',
    fontWeight: 'bold',
  },
  signInRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  signInText: {
    fontSize: 14,
    color: '#537F19',
    fontWeight: 'bold',
  },
  verifyButton: {
    backgroundColor: '#537F19',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifyButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#537F19',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
