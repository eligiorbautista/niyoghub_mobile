import React, { useState, useRef, useEffect, useContext } from 'react';
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
  Linking,
  Modal,
  RefreshControl,
} from 'react-native';
import { scale } from "react-native-size-matters";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import ChatModal from '../../../components/modals/ChatModal';
import useChat from '../../../hooks/useChat';
import ImageViewer from 'react-native-image-zoom-viewer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Video } from 'expo-av';
import { Audio } from 'expo-av';
import { AuthContext } from '../../../contexts/AuthContext';


export default function ChatScreen({ navigation }) {
 
  const {admin} = useContext(AuthContext) 
  const { messages, isLoading, sendMessage, fetchMessages } = useChat(admin);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedAttachment, setSelectedAttachment] = useState(null);
  const [attachmentSuccessMessage, setAttachmentSuccessMessage] = useState('');
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const scrollViewRef = useRef();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => { fetchMessages() }, []);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleSendMessage = () => {
    Keyboard.dismiss();
    if (inputMessage.trim() || selectedAttachment) {
      setIsSendingMessage(true);
      sendMessage(inputMessage, selectedAttachment)
        .then(() => {
          setInputMessage('');
          setSelectedAttachment(null);
          setAttachmentSuccessMessage('');
          setIsSendingMessage(false);
        })
        .catch((error) => {
          console.error('Error sending message:', error);
          setIsSendingMessage(false);
        });
    }
  };

  const handleSelectAttachment = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: '*/*',
      });

      if (res.type === 'cancel') {
        console.log('File selection was canceled');
        return;
      }

      setSelectedAttachment(res);
      setAttachmentSuccessMessage('File attached successfully!');
      console.log('File selected:', res);
    } catch (error) {
      console.error('Error selecting file:', error);
    }
  };

  const handleImageClick = (imageUrl) => {
    setCurrentImageUrl(imageUrl);
    setIsImageModalVisible(true);
  };

  const handleAudioPlayback = async (fileUrl) => {
    try {
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
        setIsPlaying(false);
        return;
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: fileUrl },
        { shouldPlay: true }
      );

      setSound(newSound);
      setIsPlaying(true);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          newSound.unloadAsync();
          setIsPlaying(false);
        }
      });
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const renderAttachment = (attachment) => { 
    const fileUrl = `https://niyoghub-server.onrender.com/uploads/chat/${attachment}`;
    const fileExtension = attachment.split('.').pop().toLowerCase();
    const fileName = attachment.split('/').pop();

    if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(fileExtension)) {
      return (
        <TouchableOpacity onPress={() => handleImageClick(fileUrl)}>
          <Image source={fileUrl ? { uri: fileUrl } : require('../../../assets/image_placeholder.png')} style={styles.attachmentImage} />
        </TouchableOpacity>
      );
    } else if (['mp4', 'mov', 'avi', 'mkv', 'webm'].includes(fileExtension)) {
      return (
        <View style={styles.videoContainer}>
          <Video
            source={{ uri: fileUrl }}
            style={styles.attachmentVideo}
            useNativeControls
            resizeMode="contain"
          />
        </View>
      );
    } else {
      return (
        <Text
          selectable
          style={styles.fileLinkText}
          onPress={() => Linking.openURL(fileUrl)}
        >
          {fileName}
        </Text>
      );
    }
  };

  const renderMessageBubble = (message) => {
    const hasMessageText = !!message.message;
    const hasAttachment = !!message.attachment;

    const bubbleStyle = [
      styles.messageBubble,
      message.senderId === admin ? styles.adminMessage : styles.userMessage,
      !hasMessageText && hasAttachment ? { paddingVertical: 5 } : {},
    ];

    return (
      <View style={bubbleStyle}>
        {hasMessageText && (
          <Text
            selectable
            style={[styles.messageText, message.senderId === admin ? styles.adminText : styles.userText]}
          >
            {message.message}
          </Text>
        )}
        {hasAttachment && renderAttachment(message.attachment)}
        <Text style={styles.timestamp}>
          {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
        </Text>
      </View>
    );
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    fetchMessages().then(() => {
      setIsRefreshing(false);
    });
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  useEffect(() => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  }, []);

  return (
    <KeyboardAvoidingView style={styles.mainContainer} behavior="padding">
      <View style={styles.header}>
        <Text style={styles.headerText}>Chat with PCA</Text>
        <View style={styles.headerIcons}>
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

      <ScrollView
        style={styles.chatContainer}
        ref={scrollViewRef}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
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
              style={[styles.messageContainer, message.senderId === admin ? styles.adminContainer : styles.userContainer]}
            >
              {message.senderId === admin && (
                <Image
                  source={require('../../../assets/niyoghub_logo_2.png')}
                  style={styles.chatImage}
                />
              )}
              {renderMessageBubble(message)}
            </View>
          ))
        )}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#000" />
          </View>
        )}
        {isSendingMessage && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#000" />
          </View>
        )}
      </ScrollView>

      <View style={styles.divider} />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputMessage}
          onChangeText={setInputMessage}
          placeholder="Type your message..."
          placeholderTextColor="#999"
        />

        <TouchableOpacity style={styles.attachmentButton} onPress={handleSelectAttachment}>
          <MaterialCommunityIcons name="attachment" size={24} color="black" />
        </TouchableOpacity>

        {selectedAttachment && (
          <View style={styles.attachmentStatus}>
            <Text style={styles.attachmentText}>{selectedAttachment.name}</Text>
            {attachmentSuccessMessage && (
              <Text style={styles.successMessage}>{attachmentSuccessMessage}</Text>
            )}
          </View>
        )}

        {isSendingMessage ? (
          <ActivityIndicator style={styles.sendButton} size="small" color="#000" />
        ) : (
          <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
            <MaterialCommunityIcons name="send" size={24} color="#000" />
          </TouchableOpacity>
        )}
      </View>

      <Modal visible={isImageModalVisible} transparent={true}>
        <ImageViewer
          imageUrls={[{ url: currentImageUrl }]}
          onCancel={() => setIsImageModalVisible(false)}
          enableSwipeDown
          renderIndicator={() => null}
        />
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setIsImageModalVisible(false)}
        >
          <Ionicons name="close" size={30} color="#fff" />
        </TouchableOpacity>
      </Modal>

      <ChatModal visible={isModalVisible} onClose={toggleModal} />
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
  loadingContainer: {
    alignItems: 'center',
    marginVertical: 10,
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
    marginBottom: 10,
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
    marginBottom: 10,
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
    marginBottom: 5
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
    paddingTop: 10,
    paddingBottom: 20,
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
  attachmentStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  attachmentText: {
    color: 'gray',
    fontSize: 12,
  },
  successMessage: {
    color: 'green',
    fontSize: 12,
    marginLeft: 5,
  },
  attachmentImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginTop: 10,
  },
  fileLinkText: {
    color: '#537F19',
    textDecorationLine: 'underline',
    marginTop: 5,
  },
  aiButton: {
    marginRight: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    right: 20,
    zIndex: 1,
  },
  videoContainer: {
    width: 200,
    height: 200,
    backgroundColor: '#000',
    marginTop: 10,
  },
  attachmentVideo: {
    width: '100%',
    height: '100%',
  },
});
