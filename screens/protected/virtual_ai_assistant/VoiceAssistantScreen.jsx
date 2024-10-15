import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Audio } from "expo-av";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { scale, verticalScale } from "react-native-size-matters";
import axios from "axios";
import * as Speech from "expo-speech";
import { useNavigation } from "@react-navigation/native";

export default function VoiceAssistantScreen() {
  const navigation = useNavigation();

  /* Record State */
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(null);

  /* AI State */
  const [AIResponse, setAIResponse] = useState(false); // kapag tapos na magsalita si AI
  const [AISpeaking, setAISpeaking] = useState(false); // kapag nagsasalita si AI

  /* Text State */
  const [userQuestion, setUserQuestion] = useState(""); // tanong ni user
  const [AIResponseText, setAIResponseText] = useState(""); // sagot ni AI

  /* Loading State */
  const [isLoading, setIsLoading] = useState(false);

  const getMicrophonePermission = async () => {
    try {
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) {
        Alert.alert(
          "Permission",
          "Please grant permission to access your microphone."
        );
        return false;
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const recordingOptions = {
    android: {
      extension: ".wav",
      outputFormat: Audio.AndroidOutputFormat.MPEG_4,
      androidEncoder: Audio.AndroidAudioEncoder.AAC,
      sampleRate: 44100,
      numberOfChannels: 1, // Mono recording
      bitRate: 128000,
    },
    ios: {
      extension: ".wav",
      audioQuality: Audio.IOSAudioQuality.HIGH,
      sampleRate: 44100,
      numberOfChannels: 1, // Mono recording
      bitRate: 128000,
      linearPCMBitDepth: 16,
      linearPCMIsBigEndian: false,
      linearPCMIsFloat: false,
    },
  };

  const startRecording = async () => {
    const hasPermission = await getMicrophonePermission();
    if (!hasPermission) return;

    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      setIsRecording(true);
      const { recording } = await Audio.Recording.createAsync(recordingOptions);
      setRecording(recording);
    } catch (error) {
      console.error("Failed to start recording", error);
      Alert.alert("Error", "Failed to start recording");
    }
  };

  const stopRecording = async () => {
    try {
      setIsRecording(false);
      setIsLoading(true);

      await recording?.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({ allowsRecordingIOS: false });

      const uri = recording?.getURI();

      if (uri) {
        // send to whisper to transcript the audio
        const transcript = await sendAudioToWhisper(uri);
        setUserQuestion(transcript);
        setAIResponseText("...");

        // send to gpt to get response from AI
        const gptResponse = await sendTextToGpt(transcript);
        setAIResponse(true);
        setAIResponseText(gptResponse);

        // text to speech to simulate that the AI is talking
        await speakText(gptResponse);
      }
    } catch (error) {
      console.error("Failed to stop recording", error);
      Alert.alert("Error", "Failed to stop recording");
    }
  };

  const sendAudioToWhisper = async (uri) => {
    console.log(`URI: ${uri}`);
    console.log(`Sending audio to Whisper...`);

    try {
      const formData = new FormData();
      formData.append("file", {
        uri,
        type: "audio/wav",
        name: "recording.wav",
      });
      formData.append("model", "whisper-1");

      const response = await axios.post(
        "https://api.openai.com/v1/audio/transcriptions",
        formData,
        {
          headers: {
            Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(`Transcribed audio: ${response.data.text}`);
      return response.data.text;
    } catch (error) {
      console.error("Error during transcription:", error);
      Alert.alert("Error", error.message);
    }
  };

  // Send transcripted text to GPT API
  const sendTextToGpt = async (text) => {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content:
                "You are NiyogHub's AI Assistant, a helpful, friendly assistant who always refers to yourself as 'NiyogHub's Virtual AI Assistant' when asked for your name. You respond in either English or Filipino based on the user's language. If the question is in Filipino, reply in Filipino. Otherwise, respond in English. Your goal is to provide simple, clear, and supportive answers to assist users, many of whom may be local farmers and may not be highly tech-savvy.",
            },
            {
              role: "system",
              content:
                "If the user asks about the Philippine Coconut Authority (PCA), always mention that they can connect with PCA administrators through NiyogHub's mobile app or website. For PCA-related questions, suggest adding NiyogHub for direct assistance. Also, provide relevant PCA contact information or office addresses to give users more options beyond NiyogHub.",
            },
            {
              role: "system",
              content:
                "If the user asks 'Who made NiyogHub or NiyogHub's Virtual AI Assistant?' respond with: 'NiyogHub is a capstone project developed by students from Manuel S Enverga University named Eligio Bautista, Enya Almendras, and Marianne Nikki Bernardo. The purpose of NiyogHub is to support local coconut farmers and the Philippine Coconut Authority (PCA) by providing them with easy access to resources, communication, and assistance through our platform.'",
            },
            {
              role: "system",
              content:
                "If the user asks about real-time data or information, check the internet to answer those questions.",
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
      setAIResponseText(response.data.choices[0].message.content);
      return response.data.choices[0].message.content;
    } catch (error) {
      console.log(`Error sending text to GPT-4: ${error}`);
    }
  };

  const replayResponse = () => {
    if (AIResponseText) {
      speakText(AIResponseText);
    }
  };

  const askAnotherQuestion = () => {
    setUserQuestion("");
    setAIResponse(false);
    setAIResponseText("");
  };

  const speakText = async (text) => {
    try {
      setIsLoading(false);
      const voices = await Speech.getAvailableVoicesAsync();
      const selectedVoice = voices.find((voice) => voice.language === "fil-PH");

      const options = {
        voice: selectedVoice?.identifier || undefined,
        language: "fil-PH",
        pitch: 1.2,
        rate: 1,
        onDone: () => {
          setAISpeaking(false);
        },
      };

      Speech.speak(text, options);
      setAISpeaking(true);
    } catch (error) {
      console.error("Error while speaking:", error);
      setAISpeaking(false);
    }
  };

  const cancelSpeaking = () => {
    Speech.stop();
    setAISpeaking(false);
    setAIResponse(false);
    setUserQuestion("");
    setAIResponseText("");
  };

  const renderAIResponse = (responseText) => {
    // regular expression to detect {{ }} expressions in the responseText
    return responseText.replace(/{{(.*?)}}/g, (match, code) => {
      try {
        return eval(code.trim());
      } catch (error) {
        console.error("Error evaluating expression:", error);
        return match;
      }
    });
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" />

      {/* Header Section */}
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Voice AI Assistant</Text>
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

      <View
        style={
          AIResponse
            ? styles.mainContentContainerWithResponse
            : styles.mainContentContainerWithoutResponse
        }
      >
        {/* Soundwave Placeholder */}
        <View style={styles.soundwaveContainer}>
          {/* TESTING */}
          {/* <LottieView
    source={require("../../../assets/animations/animation.json")}
    autoPlay
    loop={true}
    style={{ width: scale(250), height: scale(180) }}
/> */}

          {/* CHECK IF LOADING */}
          {isLoading && (
            <LottieView
              source={require("../../../assets/animations/loading.json")}
              autoPlay
              loop={true}
              style={{ width: scale(250), height: scale(180) }}
            />
          )}

          {/* CHECK IF RECORDING */}
          {!isRecording ? (
            /* IF PASSIVE */
            <View>
              {/* CHECK IF AI HAVE RESPONSE */}
              {AIResponse ? (
                /* IF AI WITH RESPONSE */
                <View>
                  {/* CHECK IF AI IS SPEAKING */}
                  {AISpeaking ? (
                    /* IF AI IS SPEAKING */
                    <LottieView
                      source={require("../../../assets/animations/soundwaves.json")}
                      autoPlay
                      loop={true}
                      style={{ width: scale(250), height: scale(180) }}
                    />
                  ) : (
                    <View>
                      {!isLoading && (
                        /* IF AI NOT SPEAKING AND NOT LOADING*/
                        <Image
                          source={require("../../../assets/animations/ai-passive.gif")}
                          style={{ width: scale(180), height: scale(180) }}
                        />
                      )}
                    </View>
                  )}
                </View>
              ) : (
                <View>
                  {!isLoading && (
                    /* IF AI NO RESPONSE AND NOT LOADING*/
                    <Image
                      source={require("../../../assets/animations/ai-passive.gif")}
                      style={{ width: scale(180), height: scale(180) }}
                    />
                  )}
                </View>
              )}
            </View>
          ) : (
            /* IF RECORDING*/
            <View>
              <Image
                source={require("../../../assets/animations/ai-passive.gif")}
                style={{ width: scale(180), height: scale(180) }}
              />
            </View>
          )}
        </View>

        {/* Text Placeholder */}
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {/* IF NOT RECORDING AND NO AI RESPONSE */}
            {!isRecording && !AIResponse
              ? `Ask NiyogHub AI Assistant by pressing the microphone.`
              : userQuestion}
          </Text>
        </View>

        {/* AI Response Placeholder */}
        {AIResponse && (
          <ScrollView style={styles.aiResponseContainer}>
            <Text style={styles.aiResponseText}>
              {AIResponse ? renderAIResponse(AIResponseText) : ``}
            </Text>
          </ScrollView>
        )}
      </View>

      {/* Microphone and Buttons Section */}
      <View style={styles.recordingContainer}>
        {/* Chat Button */}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate("AI Assistant")}
        >
          <MaterialIcons name="chat" size={24} color="#000" />
        </TouchableOpacity>

        {/* Microphone Button */}
        <View>
          {!isRecording ? (
            <TouchableOpacity
              style={styles.recordButton}
              onPress={startRecording}
            >
              <Ionicons name="mic" size={40} color="#000" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={stopRecording}
              style={styles.lottieContainer}
            >
              <LottieView
                source={require("../../../assets/animations/animation.json")}
                autoPlay
                loop
                style={styles.lottie}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Cancel button */}
        <TouchableOpacity style={styles.iconButton} onPress={cancelSpeaking}>
          <MaterialIcons name="stop-circle" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerContainer: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    zIndex: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: 'rgba(83, 127, 25, 0.8)',
  },
  divider: {
    borderTopWidth: 1,
    borderColor: "#d1d5db",
    marginVertical: 0,
    marginHorizontal: 20,
  },
  mainContentContainerWithResponse: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    marginBottom: scale(40),
  },
  mainContentContainerWithoutResponse: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    marginBottom: scale(110),
  },

  aiResponseContainer: {
    marginTop: 0,
    marginBottom: 80,
    paddingHorizontal: 20,
    maxHeight: 250,
  },
  aiResponseText: {
    fontSize: 16,
    color: "#000",
    textAlign: "justify",
    marginBottom: 10,
  },
  soundwaveContainer: {
    alignItems: "center",
    marginTop: 0,
    marginBottom: 10,
  },
  textContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  text: {
    fontSize: 20,
    textAlign: "center",
  },
  recordingContainer: {
    position: "absolute",
    bottom: 5,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 10,
    paddingHorizontal: 40,
    backgroundColor: "transparent",
  },
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
  },
  recordButton: {
    backgroundColor: "#fff",
    width: scale(80),
    height: scale(80),
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
  lottieContainer: {
    width: scale(80),
    height: scale(80),
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
});
