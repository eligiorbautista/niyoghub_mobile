import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Import Picker for dropdown

const ASDisplayModal = ({ visible, onClose, onSubmit, infoType, currentValue }) => {
  const [newValue, setNewValue] = useState(currentValue);

  useEffect(() => {
    setNewValue(currentValue);
  }, [currentValue]);

  const handleSubmit = () => {
    onSubmit(newValue);
    onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Update {infoType}</Text>

          {/* render a dropdown for language selection */}
          {infoType.toLowerCase() === 'language' ? (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={newValue}
                onValueChange={(itemValue) => setNewValue(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="English (US)" value="English (US)" />
                <Picker.Item label="Filipino" value="Filipino" />
              </Picker>
            </View>
          ) : (
            <TextInput
              style={styles.input}
              placeholder={`Enter new ${infoType.toLowerCase()}`}
              value={newValue}
              onChangeText={setNewValue}
              placeholderTextColor="#888"
            />
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingVertical: 20,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    marginBottom: 25,
    fontSize: 16,
    color: '#333',
  },
  pickerContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 25,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginHorizontal: 8,
  },
  submitButton: {
    backgroundColor: '#537F19',
    paddingVertical: 12,
    paddingHorizontal: 0,
    borderRadius: 25,
    flex: 1,
    marginRight: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  cancelButton: {
    borderColor: '#537F19',
    borderWidth: 1.3,
    paddingVertical: 10,
    paddingHorizontal: 0,
    borderRadius: 25,
    flex: 1,
  },
  cancelButtonText: {
    color: '#537F19',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default ASDisplayModal;
