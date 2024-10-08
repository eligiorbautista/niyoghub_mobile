import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image } from 'react-native';

const SDGModal = ({ visible, setVisible, selectedSDG }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={() => setVisible(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>

          {selectedSDG && (
            <Image source={selectedSDG.image} style={styles.sdgImage} />
          )}

          <Text style={styles.modalTitle}>{selectedSDG?.title}</Text>

          <Text style={styles.modalDescription}>
            {selectedSDG?.description}.
          </Text>
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
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 8,
    color: '#537F19',
  },
  modalDescription: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
    padding: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,  
    padding: 5,
    backgroundColor: '#2196F3',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 10,
    padding: 5,
    backgroundColor: 'white', 
    borderRadius: 15,
    width: 30,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0, 
  },
  closeButtonText: {
    color: 'black', 
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,   
  },
  sdgImage: {
    marginTop: 18,
    borderRadius: 30,
    width:'90%',
    height: 200,
    marginBottom: 5, 
    resizeMode: 'contain', 
  },
});

export default SDGModal;
