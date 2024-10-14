import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
  Image,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons"; // Import MaterialIcons for voice assistant icon
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native"; // For Voice Assistant navigation

export default function ChatAssistantScreen() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const savedMessages = await AsyncStorage.getItem("chatHistory");
        if (savedMessages) {
          setMessages(JSON.parse(savedMessages));
        }
      } catch (error) {
        console.error("Failed to load chat history:", error);
      }
    };
    loadMessages();
  }, []);

  useEffect(() => {
    const saveMessages = async () => {
      try {
        await AsyncStorage.setItem("chatHistory", JSON.stringify(messages));
      } catch (error) {
        console.error("Failed to save chat history:", error);
      }
    };
    if (messages.length > 0) {
      saveMessages();
    }
  }, [messages]);

  const getCurrentTimestamp = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const sendMessageToGpt = async (text) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content:
                "You are NiyogHub's Virtual AI Assistant, a helpful, friendly assistant who always refers to yourself as 'NiyogHub's Virtual AI Assistant' when asked for your name...",
            },
            {
              role: "user",
              content: text,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const aiResponse = response.data.choices[0].message.content;
      const timestamp = getCurrentTimestamp();

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "user", content: text, timestamp },
        { role: "assistant", content: aiResponse, timestamp },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = () => {
    if (userInput.trim()) {
      sendMessageToGpt(userInput);
      setUserInput("");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.mainContainer} behavior="padding">
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.subHeaderContainer}>
        <View style={styles.subHeader}>
          <Text style={styles.subHeaderText}>Chat AI Assistant</Text>
          <TouchableOpacity>
            <Ionicons
              name="information-circle-outline"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Chat Section */}
      <ScrollView style={styles.chatContainer}>
        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageContainer,
              message.role === "user"
                ? styles.userContainer
                : styles.aiContainer,
            ]}
          >
            {message.role === "assistant" && (
              <Image
                source={require("../../../assets/niyoghub_logo_2.png")}
                style={styles.chatImage}
              />
            )}
            <View
              style={[
                styles.messageBubble,
                message.role === "user" ? styles.userMessage : styles.aiMessage,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  message.role === "user" ? styles.userText : styles.aiText,
                ]}
              >
                {message.content}
              </Text>
              <Text style={styles.timestamp}>{message.timestamp}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.divider} />

      {/* User Input Section with Send and Voice Assistant Buttons */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={userInput}
          onChangeText={setUserInput}
          placeholder="Ask NiyogHub's AI Assistant"
          placeholderTextColor="#999"
        />
        {isLoading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="small" color="#000" />
          </View>
        ) : (
          <>
            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleSendMessage}
            >
              <MaterialIcons name="send" size={21} color="#000" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.voiceAssistantButton}
              onPress={() => navigation.navigate("Voice Assistant")}
            >
              <Image source={require('../../../assets/animations/ai-passive.gif')} style={{height: 35, width : 35}} />
            </TouchableOpacity>
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  subHeaderContainer: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    zIndex: 10,
  },
  subHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#537F19",
  },
  divider: {
    borderTopWidth: 1,
    borderColor: "#d1d5db",
    marginVertical: 0,
    marginHorizontal: 20,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    marginBottom: 20,
  },
  messageContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  userContainer: {
    justifyContent: "flex-end",
  },
  aiContainer: {
    justifyContent: "flex-start",
  },
  chatImage: {
    width: 36,
    height: 36,
    marginRight: 10,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    maxWidth: "80%",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
  },
  aiMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#EEE",
  },
  messageText: {
    fontSize: 16,
  },
  userText: {
    color: "#000",
  },
  aiText: {
    color: "#000",
  },
  timestamp: {
    fontSize: 12,
    color: "#999",
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#fff",
    borderColor: "#d1d5db",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
    fontSize: 14,
    backgroundColor: "#F5F5F5",
  },
  sendButton: {
    width: 30,
    height: 30,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  voiceAssistantButton: {
    width: 30,
    height: 30,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    width: 30,
    height: 30,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
