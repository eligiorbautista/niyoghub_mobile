import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable, Button } from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'; 
import DiseaseIdentification from '../../../components/modals/IdentificationModal';
import axios from 'axios';
import { Alert } from 'react-native';
import * as FileSystem from 'expo-file-system'; 

const DiagnoseScreen = ({ route }) => {
  const { imageUri } = route.params;  
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const navigation = useNavigation(); 

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const navigateToResult = () => {
    navigation.navigate('DiagnosedResultScreen', { imageUri });
  };

  return (
    <>
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
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

      <View style={styles.bodyContainer}>
        
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Text>No Image Selected</Text>
        )}

        <TouchableOpacity style={styles.diagnoseButton} onPress={navigateToResult}>
          <Text style={styles.diagnoseButtonText}>Diagnose</Text>
        </TouchableOpacity>
      </View>
      
      <DiseaseIdentification
        visible={isModalVisible}
        onClose={toggleModal}
      />
      </View>

    </>
  );
};

export default DiagnoseScreen;

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
    marginVertical: 16,
  },
  bodyContainer: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignContent: 'center',
    marginVertical: '35%',
  },
  image: {
    width: 300, 
    height: 300,
    resizeMode: 'contain', 
    alignSelf: 'center',
  },
  diagnoseButtonText: {
    backgroundColor: '#6FA542',
    padding: 10,
    color: 'white',
    fontWeight: '900',
    marginVertical: 20,
    textAlign: 'center',
    borderRadius: 5,
    marginTop: 50,
    fontSize: 14,
  },
});

