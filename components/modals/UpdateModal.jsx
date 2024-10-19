import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const UpdateModal = ({ visible, onClose, onSubmit, infoType, currentValue }) => {
  const [newValue, setNewValue] = useState(currentValue);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  useEffect(() => {
    setNewValue(currentValue);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  }, [currentValue]);

  const handleSubmit = () => {
    if (infoType.toLowerCase() === 'password') {
      if (!currentPassword || !newPassword || !confirmNewPassword) {
        alert('Please fill in all password fields.');
        return;
      }
      if (newPassword !== confirmNewPassword) {
        alert('New password and confirmation do not match.');
        return;
      }
      onSubmit({ currentPassword, newPassword, confirmNewPassword });
    } else {
      onSubmit(newValue);
    }
    onClose();
  };

  const quezonCitiesAndMunicipalities = [
    "Lucena City",
    "Tayabas City",
    "Agdangan",
    "Alabat",
    "Atimonan",
    "Buenavista",
    "Burdeos",
    "Calauag",
    "Candelaria",
    "Catanauan",
    "Dolores",
    "General Luna",
    "General Nakar",
    "Guinayangan",
    "Gumaca",
    "Infanta",
    "Jomalig",
    "Lopez",
    "Lucban",
    "Macalelon",
    "Mauban",
    "Mulanay",
    "Padre Burgos",
    "Pagbilao",
    "Panukulan",
    "Patnanungan",
    "Perez",
    "Pitogo",
    "Plaridel",
    "Polillo",
    "Quezon",
    "Real",
    "Sampaloc",
    "San Andres",
    "San Antonio",
    "San Francisco",
    "San Narciso",
    "Sariaya",
    "Tagkawayan",
    "Tiaong",
    "Unisan"
  ];

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

          {infoType.toLowerCase() === 'password' ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Current Password"
                value={currentPassword}
                onChangeText={setCurrentPassword}
                secureTextEntry
                placeholderTextColor="#888"
              />
              <TextInput
                style={styles.input}
                placeholder="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
                placeholderTextColor="#888"
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm New Password"
                value={confirmNewPassword}
                onChangeText={setConfirmNewPassword}
                secureTextEntry
                placeholderTextColor="#888"
              />
            </>
          ) : infoType.toLowerCase() === 'language' ? (
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
          ) : infoType.toLowerCase() === 'city / municipality' ? (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={newValue}
                onValueChange={(itemValue) => setNewValue(itemValue)}
                style={styles.picker}
              >
                {quezonCitiesAndMunicipalities.map((city, index) => (
                  <Picker.Item key={index} label={city} value={city} />
                ))}
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

export default UpdateModal;
