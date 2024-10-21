import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import DiseaseIdentification from '../../../components/modals/IdentificationModal';

import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import DiseaseInfoDropdown from './DiseaseInfoDropdown';

const DiagnosedResultScreen = ({ route }) => {
  const { imageUri } = route.params;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [highestConfidenceClass, setHighestConfidenceClass] = useState(null);

  const navigation = useNavigation();

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleSubmit = async (imageUri) => {
    if (!imageUri) return;

    try {
      // to compress the image
      const manipulatedImagePromise = ImageManipulator.manipulateAsync(imageUri, [], { compress: 0.5 });

      // Read as base64
      const base64Promise = manipulatedImagePromise.then((manipulatedImage) =>
        FileSystem.readAsStringAsync(manipulatedImage.uri, {
          encoding: FileSystem.EncodingType.Base64,
        })
      );

      const base64Image = await base64Promise;

      const response = await axios({
        method: 'POST',
        url: 'https://detect.roboflow.com/niyoghub/2',
        params: {
          api_key: 'zxo5ISsmlDjsnYJo36jv',
        },
        data: base64Image,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        timeout: 10000,
      });

      setPrediction(response.data);

      const classes = response.data.predicted_classes;
      if (classes && classes.length > 0) {
        const highestConfidence = classes.reduce((prev, current) => {
          return prev.confidence > current.confidence ? prev : current;
        });
        setHighestConfidenceClass(highestConfidence);
      }
    } catch (error) {
      console.error('Error predicting disease:', error.message);
      Alert.alert('Error', 'Error predicting disease: ' + error.message);
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
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Disease Identification</Text>
          <TouchableOpacity onPress={toggleModal}>
            <Ionicons name="information-circle-outline" size={24} color="gray" />
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
          {highestConfidenceClass && (
            <View style={{ padding: 10 }}>
              <Text style={styles.diseaseText}>
                {highestConfidenceClass === 'WCLWD_Yellowing' && 'Yellowing'}
                {highestConfidenceClass === 'WCLWD_DryingofLeaflets' && 'Drying of Leaflets'}
                {highestConfidenceClass === 'WCLWD_Flaccidity' && 'Flaccidity'}
                {highestConfidenceClass === 'CCI_Caterpillars' && 'Caterpillars'}
                {highestConfidenceClass === 'CCI_Leaflets' && 'Leaflets'}
              </Text>
              {/* Dropdown */}
              <DiseaseInfoDropdown highestConfidenceClass={highestConfidenceClass} />
            </View>
          )}
        </View>

        <DiseaseIdentification
          visible={isModalVisible}
          onClose={toggleModal}
        />
      </ScrollView>
    </>
  );
};

export default DiagnosedResultScreen;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 20,
    marginTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 4,
    paddingHorizontal: 20,
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
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // padding: 5
  },
  diseaseText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#537F19',
    textAlign: 'center',
    marginVertical: 10,
  },
});


