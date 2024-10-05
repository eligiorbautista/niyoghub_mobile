import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const FeedbackInfoModal = ({ isVisible, onClose }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>WHAT IS FEEDBACK?</Text>
          <Text style={styles.subTitle}>Last Updated October 2024</Text>
          <View style={styles.divider} />
          <Text style={styles.modalTextTitle}>Feedback Purpose:</Text>
          <Text style={styles.modalText}>
            Feedback helps us improve our service based on your experience. It provides us with insights about what we are doing well and areas that need improvement.
          </Text>
          <Text style={styles.modalTextTitle}>Types of Feedback:</Text>
          <Text style={styles.modalText}>
            Your feedback could be about features, ease of use, performance, or anything else that matters to you.
          </Text>
          <TouchableOpacity style={styles.modalButton} onPress={onClose}>
            <Text style={styles.modalButtonText}>Got it!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default FeedbackInfoModal;

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
  subTitle: {
    fontSize: 13,
    textAlign: 'start',
    marginBottom: 8,
    color: '#666',
    lineHeight: 22,
  },
  modalTextTitle: {
    fontSize: 14,
    textAlign: 'start',
    marginBottom: 0,
    fontWeight: 'bold',
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
    borderRadius: 4,
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
