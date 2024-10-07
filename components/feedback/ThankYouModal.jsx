import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ThankYouModal = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Ionicons name="checkmark-circle" size={80} color="#537F19" style={styles.icon} />
          
          <Text style={styles.thankYouText}>Thank You!</Text>
          <Text style={styles.messageText}>We appreciate your feedback.</Text>
          
          <Image
            source={require('../../assets/niyoghub_logo_2.png')}
            style={styles.image}
          />

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ThankYouModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#FFF',
    borderRadius: 4,
    padding: 20,
    alignItems: 'center',
  },
  icon: {
    marginBottom: 20,
  },
  thankYouText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#537F19',
    marginBottom: 10,
  },
  messageText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginBottom: 20,
  },
  image: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#537F19',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
