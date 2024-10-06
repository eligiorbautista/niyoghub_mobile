import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, Image } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import PSDisplayNameModal from '../../../components/modals/ProfileSettingsModal';


const ProfileSettingsScreen = ({ navigation }) => {
  const [image, setImage] = useState(null); 
  const [displayName, setDisplayName] = useState('Juan Dela Cruz');
  const [modalVisible, setModalVisible] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = (newDisplayName) => {
    setDisplayName(newDisplayName);
    setModalVisible(false); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>General Settings</Text>
        </View>
      </View>

      <View style={styles.scrollContainer}>
        <Text style={styles.settingsTitle}>Profile Settings</Text>
        <Text style={styles.customizeProfile}>Customize Profile</Text>
        <Text style={styles.sectionTitle1}>PROFILE INFORMATION</Text>

        <View style={styles.containerName}>
          <View style={styles.item}>
            <Text style={styles.itemText}>
              Display Name {'\n'}
              <Text style={styles.displayName}>{displayName}</Text>
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text style={styles.setButtonText}>Set</Text>
            </TouchableOpacity>
          </View>

          <PSDisplayNameModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onSubmit={handleSubmit}
          />
        </View>

        <View style={styles.containerUploadImg}>
          <Text style={styles.title}>Profile Picture</Text>
          <Text style={styles.subtitle}>Update your profile picture</Text>

          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label1}>Current Profile Picture</Text>
              <View style={styles.imageContainer}>
                <Image
                  source={image ? { uri: image } : require('../../../assets/farmer.png')}
                  style={styles.profileImage}
                />
              </View>
            </View>

            <View style={styles.column}>
              <Text style={styles.label2}>Update Picture</Text>
              <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
                <Ionicons name="image" size={60} color="#6FA542" />
                <Button title="Browse" onPress={pickImage} color="#6FA542"/>
                {image && <Image source={{ uri: image }} style={styles.browseText} />}
                <Text style={styles.dragText}>or drag a file here</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',    
    alignItems: 'center',     
    justifyContent: 'space-between', 
    paddingHorizontal: 20,    
    paddingVertical: 15,     
    position: 'relative',
    backgroundColor: 'gray',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: '#F0F0F0',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginTop: 35,
  },
  titleContainer: {
    flex: 1,          
    alignItems: 'center', 
    paddingVertical: 5,   
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 8,
  },
  back: {
    fontSize: 18,
    color: 'green',
    marginBottom: 20,
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 30,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  customizeProfile: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  sectionTitle1: {
    fontSize: 12,
    marginBottom: 8,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomColor: '#E0E0E0',
  },
  itemText: {
    fontSize: 16,
  },
  displayName: {
    fontSize: 12,
  },
  setButtonText: {
    color: '#6FA542',
    borderWidth: 1,
    borderColor: '#6FA542', 
    borderRadius: 10, 
    paddingVertical: 1, 
    paddingHorizontal: 20,
    textAlign: 'center', 
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    alignItems: 'center',
    width: '45%',
  },
  label1: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label2: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 0,
  },
  imageContainer: {
    borderWidth: 2,
    borderColor: '#ccc',
    padding: 5,
    borderRadius: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  uploadBox: {
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10,
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    marginLeft: 40,
  },
  uploadIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  browseText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    backgroundColor: '#90B74B',
  },
  dragText: {
    fontSize: 12,
    color: '#999',
  },
});

export default ProfileSettingsScreen;
