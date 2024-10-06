import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, Button } from 'react-native';

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
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Update {infoType}</Text>
          <TextInput
            style={styles.input}
            placeholder={`Enter new ${infoType.toLowerCase()}`}
            value={newValue}
            onChangeText={setNewValue}
          />
          <View style={styles.buttonContainer}>
            <Button title="Submit" onPress={handleSubmit} color="green" />
            <Button title="Cancel" color="red" onPress={onClose} />
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
});

export default ASDisplayModal;
