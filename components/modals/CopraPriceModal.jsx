import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';

const CopraPriceModal = ({ visible, setVisible }) => { 
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)} 
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            Keeping an eye on the daily prices of copra 
            and whole nuts are essential for you as a coconut farmer. It helps you make smarter decisions about when to sell your produce. By staying informed about price fluctuations, you can sell at the right time to maximize your profits and ensure financial stability.
          </Text>
          <TouchableOpacity onPress={() => setVisible(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CopraPriceModal;


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
  modalText: {
    fontSize: 16,
    textAlign: 'start',
    marginTop: 30,
    marginBottom: 10,
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
});