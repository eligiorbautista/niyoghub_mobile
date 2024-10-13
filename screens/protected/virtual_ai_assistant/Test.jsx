import React, { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    View,
    StatusBar,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { Audio } from "expo-av";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { scale } from "react-native-size-matters";
import LottieView from "lottie-react-native";

export default function TestScreen() {
    const [isRecording, setIsRecording] = useState(false);
    const [recording, setRecording] = useState(null);

    const startRecording = async () => {
        try {
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            const { recording } = await Audio.Recording.createAsync(
                Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
            );
            setRecording(recording);
            setIsRecording(true);
        } catch (err) {
            Alert.alert("Failed to start recording", err.message);
        }
    };

    const stopRecording = async () => {
        setIsRecording(false);
        try {
            await recording.stopAndUnloadAsync();
            const uri = recording.getURI();
            Alert.alert("Recording saved", `File location: ${uri}`);
        } catch (error) {
            Alert.alert("Error stopping recording", error.message);
        }
    };

    return (
        <View style={styles.mainContainer}>
            <StatusBar barStyle="light-content" />

            {/* Header Section */}
            <View style={styles.headerContainer}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Virtual AI Assistant</Text>
                    <TouchableOpacity>
                        <Ionicons name="information-circle-outline" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Soundwave Placeholder */}
            <View style={styles.soundwaveContainer}>
                <LottieView
                    source={require("../../../assets/animations/soundwaves.json")}
                    autoPlay
                    loop={true}
                    style={{ width: scale(250), height: scale(180) }}
                />
            </View>

            {/* Text Placeholder */}
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    What does the Philippine Coconut Authority do?
                </Text>
            </View>

            {/* AI Response Placeholder */}
            <ScrollView style={styles.aiResponseContainer}>
                <Text style={styles.aiResponseText}>
                    The Philippine Coconut Authority (PCA) is a key government agency tasked with overseeing the coconut industry in the Philippines, one of the largest coconut-producing countries in the world. Established in 1973, the PCA is responsible for formulating policies, programs, and regulations that promote the sustainable development of the coconut sector. Its primary objectives include enhancing coconut production, improving the quality of coconut products, and supporting the livelihoods of coconut farmers through various initiatives, such as training, research, and access to funding.
                </Text>
                <Text style={styles.aiResponseText}>
                    In addition to supporting farmers, the PCA plays a vital role in ensuring the efficient marketing of coconut products both domestically and internationally. The agency conducts research and development to innovate and improve coconut processing techniques, thereby increasing the competitiveness of Filipino coconut products in the global market. The PCA also collaborates with local and international organizations to promote sustainable practices and environmental conservation within the coconut industry, contributing to the overall economic growth of the agricultural sector in the Philippines.
                </Text>
            </ScrollView>



            {/* Microphone and Buttons Section */}
            <View style={styles.recordingContainer}>
                {/* Chat Button */}
                <TouchableOpacity style={styles.iconButton}>
                    <MaterialIcons name="chat" size={28} color="#000" />
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
                        <TouchableOpacity onPress={stopRecording} style={styles.lottieContainer}>
                            <LottieView
                                source={require("../../../assets/animations/animation.json")}
                                autoPlay
                                loop
                                style={styles.lottie}
                            />
                        </TouchableOpacity>
                    )}
                </View>

                {/* X (Close) Button */}
                <TouchableOpacity style={styles.iconButton}>
                    <MaterialIcons name="close" size={28} color="#000" />
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
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#537F19',
    },
    aiResponseContainer: {
        marginTop: 0,
        marginBottom: 10,
        paddingHorizontal: 20,
        maxHeight: 150,
    },
    aiResponseText: {
        fontSize: 16,
        color: '#000',
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
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingBottom: 20,
        paddingHorizontal: 40,
        backgroundColor: 'white',
        marginBottom: 10,
        marginTop: 20,
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
        position: 'absolute',
        top: 0,
        left: 0,
    },
});

