import {
    Alert,
    StyleSheet,
    Text,
    View,
    StatusBar,
    TouchableOpacity,
    Image,
    ScrollView,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { scale, verticalScale } from "react-native-size-matters";
import { Audio } from "expo-av";
import axios from "axios";
import LottieView from "lottie-react-native";
import * as Speech from "expo-speech";
import { Ionicons } from "@expo/vector-icons";

export default function VirtualAssistantScreen() {
    const [text, setText] = useState("");
    const [isRecording, setIsRecording] = useState(false);
    const [recording, setRecording] = useState(null);
    const [loading, setLoading] = useState(false);
    const [AIResponse, setAIResponse] = useState(false);
    const [AISpeaking, setAISpeaking] = useState(false);
    const [responseText, setResponseText] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

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
            setLoading(true); // Show loading animation before processing

            await recording?.stopAndUnloadAsync();
            await Audio.setAudioModeAsync({ allowsRecordingIOS: false });

            const uri = recording?.getURI();

            if (uri) {
                const transcript = await sendAudioToWhisper(uri);
                setText(transcript);

                const gptResponse = await sendTextToGpt(transcript);
                setAIResponse(true);
                setResponseText(gptResponse);

                await speakText(gptResponse);
            }
        } catch (error) {
            console.error("Failed to stop recording", error);
            Alert.alert("Error", "Failed to stop recording");
        } finally {
            setLoading(false); // Hide loading animation when done
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

            console.log(response.data.text);
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
                                "You are NiyogHub's Virtual AI Assistant, a helpful, friendly assistant who always refers to yourself as 'NiyogHub's Virtual AI Assistant' when asked for your name. You respond in either English or Filipino based on the user's language. If the question is in Filipino, reply in Filipino. Otherwise, respond in English. Your goal is to provide simple, clear, and supportive answers to assist users, many of whom may be local farmers and may not be highly tech-savvy.",
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
            setText(response.data.choices[0].message.content);
            return response.data.choices[0].message.content;
        } catch (error) {
            console.log(`Error sending text to GPT-4: ${error}`);
        }
    };

    const replayResponse = () => {
        if (responseText) {
            speakText(responseText);
        }
    };

    const askAnotherQuestion = () => {
        setText("");
        setAIResponse(false);
        setResponseText("");
    };

    const speakText = async (text) => {
        try {
            const voices = await Speech.getAvailableVoicesAsync();
            const selectedVoice = voices.find((voice) => voice.language === "fil-PH");

            const options = {
                voice: selectedVoice?.identifier || undefined,
                language: "fil-PH",
                pitch: 1.2,
                rate: 1,
                onDone: () => {
                    setLoading(false);
                    setAISpeaking(false);
                },
            };

            Speech.speak(text, options);
            setAISpeaking(true); // Starting to speak
        } catch (error) {
            console.error("Error while speaking:", error);
            setAISpeaking(false);
        }
    };

    return (
        <View style={styles.mainContainer}>
            <StatusBar barStyle={"light-content"} />

            {/* Content Container */}
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.headerContainer}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Virtual AI Assistant</Text>
                        <TouchableOpacity onPress={toggleModal}>
                            <Ionicons
                                name="information-circle-outline"
                                size={24}
                                color="black"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.divider} />

                {loading ? (
                    <TouchableOpacity>
                        <LottieView
                            source={require("../../../assets/animations/loading.json")}
                            autoPlay
                            loop
                            speed={1.3}
                            style={{ width: scale(180), height: scale(180) }}
                        />
                    </TouchableOpacity>
                ) : !isRecording ? (
                    <>
                        {AIResponse ? (
                            <View>
                                {AISpeaking ? (
                                    <LottieView
                                        source={require("../../../assets/animations/ai-speaking.json")}
                                        autoPlay
                                        loop={AISpeaking}
                                        style={{ width: scale(250), height: scale(250) }}
                                    />
                                ) : (
                                    <Image
                                        source={require("../../../assets/animations/like.gif")}
                                        style={{ width: scale(250), height: scale(250) }}
                                    />
                                )}
                            </View>
                        ) : (
                            <TouchableOpacity
                                style={styles.microphoneButton}
                                onPress={startRecording}
                            >
                                <FontAwesome
                                    name="microphone"
                                    size={scale(50)}
                                    color="#2b3356"
                                />
                            </TouchableOpacity>
                        )}
                    </>
                ) : (
                    <TouchableOpacity onPress={stopRecording}>
                        <LottieView
                            source={require("../../../assets/animations/animation.json")}
                            autoPlay
                            loop
                            speed={1.3}
                            style={{ width: scale(250), height: scale(250) }}
                        />
                    </TouchableOpacity>
                )}

                {!isRecording && !AIResponse && (
                    <View style={styles.textContainer}>
                        <ScrollView>
                            <Text style={styles.text}>
                                {`Ask NiyogHub AI Virtual Assistant by pressing the microphone.`}
                            </Text>
                        </ScrollView>
                    </View>
                )}

                {AISpeaking && (
                    <View style={styles.responseContainer}>
                        <ScrollView>
                            <Text style={styles.responseText}>{text}</Text>
                        </ScrollView>
                    </View>
                )}

                {AIResponse && (
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={styles.button} onPress={replayResponse}>
                            <Text style={styles.buttonText}>Replay Response</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={askAnotherQuestion}>
                            <Text style={styles.buttonText}>Ask Another Question</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    contentContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    headerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 16,
        zIndex: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#537F19',
    },
    divider: {
        borderTopWidth: 1,
        borderColor: '#d1d5db',
        position: 'absolute',
        top: 60,
        left: 20,
        right: 20,
        backgroundColor: 'transparent',
        zIndex: 10,
    },
    textContainer: {
        alignItems: "center",
        width: scale(150),
        position: "absolute",
        bottom: verticalScale(90),
    },
    text: {
        color: "#0d0d0d",
        fontWeight: "bold",
        fontSize: scale(14),
        textAlign: "center",
    },
    responseContainer: {
        alignItems: "center",
        width: scale(150),
        position: "absolute",
        bottom: verticalScale(90),
    },
    responseText: {
        color: "#0d0d0d",
        fontWeight: "bold",
        fontSize: scale(14),
        textAlign: "center",
    },
    microphoneButton: {
        width: scale(100),
        height: scale(100),
        borderRadius: scale(50),
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        elevation: 5,
    },
    buttonsContainer: {
        position: "absolute",
        bottom: verticalScale(20),
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: scale(20),
    },
    button: {
        backgroundColor: "#80C325",
        paddingVertical: scale(12),
        paddingHorizontal: scale(20),
        borderRadius: scale(25),
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
});
