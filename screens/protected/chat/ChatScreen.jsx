import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, TextInput, Image } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import ChatModal from './ChatModal';

const ChatScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerText}>Chat Support</Text>
        <TouchableOpacity onPress={toggleModal}>

          <Ionicons
            name="information-circle-outline"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <View style={styles.logoContainer}>
        <Image
          source={require('../../../assets/niyoghub_logo_2.png')}
          style={styles.logo}
        />
        <Text style={styles.helpMessage}>
          How can we help you today?
        </Text>
      </View>

      <View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonTextBold}>Common pests and diseases</Text>
          <Text style={styles.buttonText}>List of pests and disease from the database</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonTextBold}>Can I connect with copra producers?</Text>
          <Text style={styles.buttonText}>How to gain connection</Text>
        </TouchableOpacity>
      </View>

      {/* Message Input Box */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Message NiyogHub"
        />
        <TouchableOpacity style={styles.sendButtonAttach}>
          <Ionicons name="link" style={styles.sendButtonAttachIcon} size={22} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendButtonSend}>
          <Ionicons name="send" style={styles.sendButtonSendIcon} size={22} />
        </TouchableOpacity>
      </View>

      <ChatModal
        visible={isModalVisible}
        onClose={toggleModal}
      />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 4,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#537F19',
  },
  helpText: {
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#515151',
    padding: 6,
    width: 28,
    height: 28,
    borderRadius: 50,
    textAlign: 'center',
  },
  divider: {
    borderTopWidth: 1,
    borderColor: '#d1d5db',
    marginVertical: 16,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 80,
    width: 80,
  },
  helpMessage: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 16,
  },
  button: {
    backgroundColor: '#90B74B',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  buttonTextBold: {
    color: 'black',
    fontWeight: 'bold',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    borderWidth: .7,
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 4,
  },
  sendButtonAttach: {
    marginLeft: 0,
    padding: 12,
    backgroundColor: '#f3f4f6',
    borderRadius: 2,
    borderColor: 'black',
  },
  sendButtonSend: {
    marginLeft: 0,
    padding: 12,
    backgroundColor: '#f3f4f6',
    borderRadius: 2,
  },
});
