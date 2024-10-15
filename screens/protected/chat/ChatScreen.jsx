import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  KeyboardAvoidingView,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import { scale } from "react-native-size-matters";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import ChatModal from '../../../components/modals/ChatModal'

export default function ChatScreen({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  // Mock admin responses
  const mockAdminResponses = [
    "Hello! How can I assist you with your coconut farming today?",
    "Certainly! You can reach the PCA office at the following address...",
    "Thank you for reaching out. If you have any more questions, feel free to ask!",
    "We're here to support local coconut farmers. Let us know how we can help.",
    "For more detailed information, please visit our website or contact us directly.",
  ];

  // Function to get a random admin response
  const getAdminResponse = () => {
    const randomIndex = Math.floor(Math.random() * mockAdminResponses.length);
    return mockAdminResponses[randomIndex];
  };

  // Function to get current timestamp
  const getCurrentTimestamp = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  // Function to handle sending user message and receiving admin response
  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const timestamp = getCurrentTimestamp();

      // Add user's message
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'user', content: inputMessage, timestamp },
      ]);

      setInputMessage('');
      Keyboard.dismiss();

      // Simulate admin response after a short delay
      setIsLoading(true);
      setTimeout(() => {
        const adminResponse = getAdminResponse();
        const adminTimestamp = getCurrentTimestamp();

        setMessages((prevMessages) => [
          ...prevMessages,
          { role: 'admin', content: adminResponse, timestamp: adminTimestamp },
        ]);
        setIsLoading(false);

        // Scroll to bottom after receiving admin response
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 1000); // 1-second delay to simulate response time
    }
  };

  return (
    <KeyboardAvoidingView style={styles.mainContainer} behavior="padding">
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Chat with PCA</Text>
        <View style={styles.headerIcons}>
          {/* AI Assistant Button in the header */}
          <TouchableOpacity
            style={styles.voiceAssistantButton}
            onPress={() => navigation.navigate("Voice Assistant")}
          >
            <View style={styles.aiButtonContent}>
              <Image source={require('../../../assets/animations/ai-passive.gif')} style={styles.aiImage} />
              <Text style={styles.aiButtonText}>Talk with AI</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleModal}>
            <Ionicons name="information-circle-outline" size={24} color="gray" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Chat Section */}
      <ScrollView style={styles.chatContainer} ref={scrollViewRef}>
        {messages.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <Image
              source={require('../../../assets/niyoghub_logo_2.png')}
              style={styles.emptyStateImage}
            />
            <Text style={styles.emptyStateText}>
              How can we help you today? Just type your message.
            </Text>
          </View>
        ) : (
          messages.map((message, index) => (
            <View
              key={index}
              style={[styles.messageContainer, message.role === 'user' ? styles.userContainer : styles.adminContainer]}
            >
              {message.role === 'admin' && (
                <Image
                  source={require('../../../assets/niyoghub_logo_2.png')}
                  style={styles.chatImage}
                />
              )}
              <View
                style={[styles.messageBubble, message.role === 'user' ? styles.userMessage : styles.adminMessage]}
              >
                <Text
                  style={[styles.messageText, message.role === 'user' ? styles.userText : styles.adminText]}
                >
                  {message.content}
                </Text>
                <Text style={styles.timestamp}>{message.timestamp}</Text>
              </View>
            </View>
          ))
        )}
        {isLoading && (
          <View style={styles.adminContainer}>
            <Image
              source={require('../../../assets/niyoghub_logo_2.png')}
              style={styles.chatImage}
            />
            <View style={styles.messageBubble}>
              <ActivityIndicator size="small" color="#000" />
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.divider} />

      {/* Input Section */}
      <View style={styles.inputContainer}>


        <TextInput
          style={styles.textInput}
          value={inputMessage}
          onChangeText={setInputMessage}
          placeholder="Type your message..."
          placeholderTextColor="#999"
        />

        {/* Attachment Button */}
        <TouchableOpacity style={styles.attachmentButton}>
          <MaterialCommunityIcons name="attachment" size={24} color="black" />
        </TouchableOpacity>

        {/* Send Button */}
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <MaterialCommunityIcons name="send" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ChatModal
        visible={isModalVisible}
        onClose={toggleModal}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#537F19',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  voiceAssistantButton: {
    backgroundColor: 'rgba(83, 127, 25, 0.8)',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,   
  },
  aiButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 8,   
  },
  aiImage: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  divider: {
    borderTopWidth: 1,
    borderColor: '#d1d5db',
    marginVertical: 0,
    marginHorizontal: 20,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(90),
  },
  emptyStateImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  userContainer: {
    justifyContent: 'flex-end',
  },
  adminContainer: {
    justifyContent: 'flex-start',
  },
  chatImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
    marginTop: 5,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    maxWidth: '75%',
  },
  userMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  adminMessage: {
    backgroundColor: '#ECECEC',
  },
  messageText: {
    fontSize: 16,
  },
  userText: {
    color: '#000',
  },
  adminText: {
    color: '#000',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    marginRight: 10,
    color: '#000',
  },
  attachmentButton: {
    padding: 5,
  },
  sendButton: {
    padding: 5,
  },
  aiButton: {
    marginRight: 10,
  },
});
