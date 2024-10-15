import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Modal } from 'react-native';

const IdentificationModal = ({ visible, onClose }) => { 
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose} 
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>HOW TO USE DISEASE IDENTIFICATION?</Text>
          <Text style={styles.subTitle}>Last Updated October 2024</Text>
          <View style={styles.divider} />
          <Text style={styles.modalTextTitle}>
            Uploading an Image:
          </Text>
          <Text style={styles.modalText}>
            • Look for the option to "Upload" or "Capture" an image. {'\n'}
            • If you have a photo of a leaf with a disease on your device, click on "Upload" and select the image from your device's storage.
          </Text>
          <Text style={styles.modalTextTitle}>
            Submitting the Image:
          </Text>
          <Text style={styles.modalText}>
          • After uploading or capturing the image, look for a button that says "Diagnose". {'\n'}
          • Click on this button to send the image to the app for analysis.

          </Text>
          <Text style={styles.modalTextTitle}>
            Viewing the Diagnosis:
          </Text>
          <Text style={styles.modalText}>
            • Once the analysis is complete, the app will display the diagnosis result.{'\n'}
            • Read the diagnosis to understand what disease or condition is affecting the leaf.
          </Text>
          <TouchableOpacity style={styles.modalButton} onPress={onClose}>
            <Text style={styles.modalButtonText}>I understand</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default IdentificationModal;

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