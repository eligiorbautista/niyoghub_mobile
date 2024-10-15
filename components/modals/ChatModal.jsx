import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Modal } from 'react-native';

const ChatModal = ({ visible, onClose }) => { 
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose} 
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>WHAT IS REAL TIME CHAT SUPPORT?</Text>
          <Text style={styles.subTitle}>Last Updated October 2024</Text>
          <View style={styles.divider} />
          <Text style={styles.modalTextTitle}>
            Initiate the Chat:
          </Text>
          <Text style={styles.modalText}>
            Click on the chat option to start the conversation. You might need to provide some basic information like your name or email address.
          </Text>
          <Text style={styles.modalTextTitle}>
            Describe your Issue:
          </Text>
          <Text style={styles.modalText}>
            Once connected, briefly describe your issue or question. Be as clear and detailed as possible to help the support agent understand your problem.
          </Text>
          <Text style={styles.modalTextTitle}>
            Be Patient and Responsive:
          </Text>
          <Text style={styles.modalText}>
            Chat support can sometimes take a few moments between responses. Be patient and stay engaged in the conversation to ensure a quick resolution.
          </Text>
          <Text style={styles.modalTextTitle}>
            End the Chat:
          </Text>
          <Text style={styles.modalText}>
            Once your issue is resolved or you have all the information you need, thank the support agent and end the chat session.
          </Text>
          <TouchableOpacity style={styles.modalButton} onPress={onClose}>
            <Text style={styles.modalButtonText}>I understand</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ChatModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
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
    lineHeight: 22,
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
    backgroundColor: 'black',
  },
});