import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ResetPasswordOTPModal = ({ isVisible, onClose }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>WHAT IS A ONE-TIME PASSWORD (OTP)?</Text>
          <Text style={styles.subTitle}>Last Updated October 2024</Text>
          <View style={styles.divider} />
          
          <Text style={styles.modalTextTitle}>Definition:</Text>
          <Text style={styles.modalText}>
            A One-Time Password (OTP) is a temporary code sent to your registered email or phone number. 
            It is used to verify your identity and authorize sensitive actions, such as resetting your password. 
            Each OTP can only be used once and typically expires within a short time frame.
          </Text>
          
          <Text style={styles.modalTextTitle}>Purpose of this OTP:</Text>
          <Text style={styles.modalText}>
            This OTP is generated specifically for your password reset request. It ensures that you are the one 
            initiating the change, providing an additional layer of security to your account.
          </Text>
          
          <Text style={styles.modalText}>
            To reset your password, please enter the OTP in the designated field on the password reset screen. 
            If you do not receive the OTP, check your spam folder or request a new one.
          </Text>

          <Text style={styles.modalText}>
            Remember, this OTP is valid only for a limited time. Make sure to use it promptly to ensure your request is successful.
          </Text>

          <TouchableOpacity style={styles.modalButton} onPress={onClose}>
            <Text style={styles.modalButtonText}>Got it!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ResetPasswordOTPModal;

const styles = StyleSheet.create({
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
    alignItems: 'start',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'start',
    marginTop: 20,
  },
  modalTextTitle: {
    fontSize: 14,
    textAlign: 'start',
    marginBottom: 0,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 13,
    textAlign: 'start',
    marginBottom: 8,
    color: '#666',
  },
  modalText: {
    fontSize: 14,
    textAlign: 'start',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#537F19',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 16,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  divider: {
    borderTopWidth: 1, 
    borderColor: '#d1d5db', 
    marginVertical: 12, 
  },
});
