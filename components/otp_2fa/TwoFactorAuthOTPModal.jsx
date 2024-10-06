import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TwoFactorAuthOTPModal = ({ isVisible, onClose }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>WHAT IS TWO-FACTOR AUTHENTICATION (2FA)?</Text>
          <Text style={styles.subTitle}>Last Updated October 2024</Text>
          <View style={styles.divider} />

          <Text style={styles.modalTextTitle}>Definition:</Text>
          <Text style={styles.modalText}>
            Two-Factor Authentication (2FA) is a security process in which the user provides two different authentication factors to verify themselves.
            It adds an additional layer of security to your account beyond just a password.
          </Text>

          <Text style={styles.modalTextTitle}>Purpose of this OTP:</Text>
          <Text style={styles.modalText}>
            This OTP is specifically generated to ensure that only you can access your account after entering your password.
            By requiring a second verification step, it significantly reduces the risk of unauthorized access, even if someone knows your password.
          </Text>

          <Text style={styles.modalText}>
            Please enter the OTP in the provided field to securely access your account.
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

export default TwoFactorAuthOTPModal;

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
