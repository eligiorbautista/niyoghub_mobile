import { StyleSheet, Text, View, TouchableOpacity, Image, Button } from 'react-native';
import React, { useState } from 'react';
import DiseaseIdentification from '../../../components/modals/IdentificationModal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native'; 

const IdentificationScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const navigation = useNavigation(); 

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const captureImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      cameraType: ImagePicker.CameraType.front,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
  
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      navigation.navigate('DiagnoseScreen', { imageUri: result.assets[0].uri }); 
    }
  };
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
  
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      navigation.navigate('DiagnoseScreen', { imageUri: result.assets[0].uri }); 
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Disease Identification</Text>
        <TouchableOpacity onPress={toggleModal}>
          <Ionicons name="information-circle-outline" size={24} color="gray" />
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />

      <Text style={styles.instructionText}>
        To learn how to use NiyogHub's Disease Identification feature, click the help button.
      </Text>
      <View style={styles.uploadBodyContainer}>
        <View style={styles.imageContainer}>
            <View style={styles.placeholder}>
              <Ionicons name="camera" size={60} color="#6FA542" />
              <TouchableOpacity style={styles.uploadBox} onPress={captureImage}>
                <Button title="Capture" onPress={captureImage} color="#6FA542" />
              </TouchableOpacity>
              <Text style={styles.title}>Upload an image using your camera.</Text>
            </View>
        </View>

        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          <Ionicons name="image-outline" size={24} color="#6FA542" />
          <Text style={styles.uploadButtonText}>Upload Image</Text>
        </TouchableOpacity>
      </View>

      <DiseaseIdentification visible={isModalVisible} onClose={toggleModal} />
    </View>
  );
};

export default IdentificationScreen;

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
  uploadBodyContainer: {
    justifyContent: 'center',
  },
  instructionText: {
    fontSize: 14,
  },
  title: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    height: '78%',
    borderColor: '#ccc',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    alignItems: 'center',

    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  captureButton: {
    backgroundColor: '#6FA542',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 2,
    marginTop: 10,
  },
  captureButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderColor: '#6FA542',
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  uploadButtonText: {
    color: '#6FA542',
    marginLeft: 10,
    fontWeight: 'bold',
  },
});
