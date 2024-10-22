import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import DiseaseIdentification from "../../../components/modals/IdentificationModal";
import LottieView from "lottie-react-native";

import axios from "axios";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";
import DiseaseInfoDropdown from "./DiseaseInfoDropdown";
import { scale } from "react-native-size-matters";

const DiagnosedResultScreen = ({ route }) => {
  const { imageUri } = route.params;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [highestConfidenceClass, setHighestConfidenceClass] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleSubmit = async (imageUri) => {
    if (!imageUri) return;

    setLoading(true);
    try {
      // Compress the image
      const manipulatedImagePromise = ImageManipulator.manipulateAsync(
        imageUri,
        [],
        { compress: 0.5 }
      );

      // Read as base64
      const base64Promise = manipulatedImagePromise.then((manipulatedImage) =>
        FileSystem.readAsStringAsync(manipulatedImage.uri, {
          encoding: FileSystem.EncodingType.Base64,
        })
      );

      const base64Image = await base64Promise;

      const response = await axios({
        method: "POST",
        url: "https://detect.roboflow.com/niyoghub/2",
        params: {
          api_key: "zxo5ISsmlDjsnYJo36jv",
        },
        data: base64Image,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      // Log the API response to check the structure
      console.log("API Response:", response.data);

      // Extract predictions from the response
      const predictions = response.data.predictions;
      if (predictions && Object.keys(predictions).length > 0) {
        // Convert the predictions object into an array
        const predictionArray = Object.entries(predictions).map(
          ([key, value]) => ({
            className: key,
            confidence: value.confidence,
          })
        );

        // Find the prediction with the highest confidence
        const highestConfidence = predictionArray.reduce((prev, current) =>
          prev.confidence > current.confidence ? prev : current
        );

        // Set the highest confidence class name
        setHighestConfidenceClass(highestConfidence.className);
        console.log("Highest Confidence:", highestConfidence);
      } else {
        setHighestConfidenceClass(null); // If no predictions, set to null
      }

      setPrediction(response.data);
    } catch (error) {
      console.error("Error predicting disease:", error.message);
      Alert.alert("Error", "Error predicting disease: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (imageUri) {
      handleSubmit(imageUri);
    }
  }, [imageUri]);

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Disease Identification</Text>
          <TouchableOpacity onPress={toggleModal}>
            <Ionicons
              name="information-circle-outline"
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        <View style={styles.imageContainer}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.interImage} />
          ) : (
            <Text>No Image Selected</Text>
          )}
          <Text style={styles.imageText}>DIAGNOSED RESULT</Text>
        </View>

        <View style={styles.bodyContainer}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <LottieView
                source={require("../../../assets/animations/loading.json")}
                autoPlay
                loop={true}
                style={{ width: scale(250), height: scale(180) }}
              />
              <Text style={styles.loadingText}>Processing, please wait...</Text>
            </View>
          ) : highestConfidenceClass ? (
            <View style={{ padding: 10 }}>
              <Text style={styles.diseaseText}>
                {highestConfidenceClass === "WCLWD_Yellowing" && "Yellowing"}
                {highestConfidenceClass === "WCLWD_DryingofLeaflets" &&
                  "Drying of Leaflets"}
                {highestConfidenceClass === "WCLWD_Flaccidity" && "Flaccidity"}
                {highestConfidenceClass === "CCI_Caterpillars" &&
                  "Caterpillars"}
                {highestConfidenceClass === "CCI_Leaflets" && "Leaflets"}
              </Text>
              <DiseaseInfoDropdown
                highestConfidenceClass={highestConfidenceClass}
              />
            </View>
          ) : (
            <View style={{ padding: 15, alignItems: "center" }}>
              <Text style={styles.noResultText}>No results found.</Text>
              <Text style={styles.infoText}>
                Our app currently supports the identification of the following
                diseases:
              </Text>
              <Text style={styles.diseaseList}>
                - Yellowing{"\n"}- Drying of Leaflets{"\n"}- Flaccidity{"\n"}-
                Caterpillars{"\n"}- Leaflets
              </Text>
              <Text style={styles.additionalInfoText}>
                If the symptoms do not match any of these conditions, it may be
                outside the current detection capabilities of our app. Please
                consult a specialist for further diagnosis.
              </Text>
              <View style={styles.goBackButtonContainer}>
                <Button
                  title="Diagnose Again"
                  onPress={() => navigation.navigate("DiagnoseScreen")}
                  color="#537F19"
                />
              </View>
            </View>
          )}
        </View>

        <DiseaseIdentification visible={isModalVisible} onClose={toggleModal} />
      </ScrollView>
    </>
  );
};

export default DiagnosedResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 20,
    marginTop: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 4,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#537F19",
  },
  divider: {
    borderTopWidth: 1,
    borderColor: "#d1d5db",
    marginTop: 16,
  },
  bodyContainer: {
    paddingHorizontal: 20,
  },
  imageContainer: {
    position: "relative",
  },
  interImage: {
    width: "100%",
    height: 150,
  },
  imageText: {
    position: "absolute",
    bottom: 15,
    left: 20,
    fontSize: 22,
    fontWeight: "900",
    color: "#fff",
  },
  diseaseText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#537F19",
    textAlign: "center",
    marginVertical: 10,
  },
  noResultText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#d9534f",
    textAlign: "center",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "start",
    marginBottom: 5,
  },
  diseaseList: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    textAlign: "center",
    marginBottom: 15,
  },
  additionalInfoText: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "start",
    marginTop: 10,
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  loadingText: {
    fontSize: 16,
    color: "#537F19",
    marginTop: 10,
  },
  goBackButtonContainer: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
});
