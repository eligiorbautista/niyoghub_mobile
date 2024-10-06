import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import ASDisplayModal from '../../../components/modals/AccountSettingsModal';

const AccountSettingsScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentInfo, setCurrentInfo] = useState({ type: '', value: '' });
  const [image, setImage] = useState(null); 

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Camera permission is required to change the profile picture');
      }
    })();
  }, []);

  const handleChangePress = (infoType, currentValue) => {
    setCurrentInfo({ type: infoType, value: currentValue });
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleModalSubmit = (newValue) => {
    setCurrentInfo(prev => ({ ...prev, value: newValue }));
    console.log(`Updated ${currentInfo.type}: ${newValue}`);
    setModalVisible(false);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.log(`Updated profile picture: ${result.assets[0].uri}`); // Log the updated profile picture
    }
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

      <ScrollView style={styles.accountContent}>
        <Text style={styles.settingsTitle}>Account Settings</Text>
        <Text style={styles.sectionTitle1}>USER PREFERENCES</Text>

        {/* Profile image */}
        <View style={styles.profileSection}>
          <View style={styles.imageContainer}>
            <View style={styles.profilePictureContainer}>
              <Image
                source={image ? { uri: image } : require('../../../assets/farmer.png')}
                style={styles.profileImage}
              />
              <TouchableOpacity style={styles.editIconContainer} onPress={pickImage}>
                <Ionicons name="pencil" size={20} color="green" />
                <Text style={styles.label2}>Update Profile Picture</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Other user info sections */}
        <View style={styles.infoContainer}>
          <Text style={styles.label}>
            Full Name {'\n'}
            <Text style={styles.value}>{currentInfo.type === 'Full Name' ? currentInfo.value : 'Juan Dela Cruz'}</Text>
          </Text>
          <TouchableOpacity onPress={() => handleChangePress('Full Name', 'Juan Dela Cruz')}>
            <Text style={styles.changeButton}>Change</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>
            Email Address {'\n'}
            <Text style={styles.value}>{currentInfo.type === 'Email Address' ? currentInfo.value : 'currentemail@example.com'}</Text>
          </Text>
          <TouchableOpacity onPress={() => handleChangePress('Email Address', 'currentemail@example.com')}>
            <Text style={styles.changeButton}>Change</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>
            Contact Number {'\n'}
            <Text style={styles.value}>{currentInfo.type === 'Contact Number' ? currentInfo.value : '+63 912 245 6789'}</Text>
          </Text>
          <TouchableOpacity onPress={() => handleChangePress('Contact Number', '+63 912 245 6789')}>
            <Text style={styles.changeButton}>Change</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>
            City / Municipality Address {'\n'}
            <Text style={styles.value}>{currentInfo.type === 'City / Municipality' ? currentInfo.value : 'Lucena City'}</Text>
          </Text>
          <TouchableOpacity onPress={() => handleChangePress('City / Municipality', 'Lucena City')}>
            <Text style={styles.changeButton}>Change</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>
            Language {'\n'}
            <Text style={styles.value}>{currentInfo.type === 'Language' ? currentInfo.value : 'English (US)'}</Text>
          </Text>
          <TouchableOpacity onPress={() => handleChangePress('Language', 'English (US)')}>
            <Text style={styles.changeButton}>Change</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>
            Role {'\n'}
            <Text style={styles.value}>User</Text>
          </Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Change Password</Text>
          <TouchableOpacity onPress={() => handleChangePress('Password', '******')}>
            <Text style={styles.changeButton}>Change</Text>
          </TouchableOpacity>
        </View>

        <ASDisplayModal
          visible={modalVisible}
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
          infoType={modalVisible ? currentInfo.type : ''}
          currentValue={modalVisible ? currentInfo.value : ''}
        />
      </ScrollView>
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
  accountContent: {
    paddingHorizontal: 20,
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 30,
  },
  sectionTitle1: {
    fontSize: 12,
    marginBottom: 20,
  },

  infoContainer: {
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  changeButton: {
    color: '#6FA542',
    borderWidth: 1,
    borderColor: '#6FA542', 
    borderRadius: 10, 
    paddingVertical: 1, 
    paddingHorizontal: 20,
    textAlign: 'center', 
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 20,
  },
  profilePictureContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
      borderWidth: 2,
      borderColor: '#ccc',
  },
  editIconContainer: {
      // position: 'absolute',
      bottom: 5,
      right: 5, 
      flexDirection: 'row',
      borderRadius: 15,
      padding: 5,
      marginVertical: 10,
  },
  label2: {
      fontSize: 16,
      color: '#333',
      textAlign: 'center', 
  },
});

export default AccountSettingsScreen;
