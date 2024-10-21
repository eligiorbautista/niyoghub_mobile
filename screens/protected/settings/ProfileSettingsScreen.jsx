import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import UpdateModal from '../../../components/modals/UpdateModal';
import { AuthContext } from '../../../contexts/AuthContext';
import useUpdateUser from '../../../hooks/useUpdateUser';

const ProfileSettingsScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const { updateUser, loading, error } = useUpdateUser();

  const [image, setImage] = useState(user?.profilePicture || null);
  const [fullName, setFullName] = useState(user?.fullName || 'Juan Dela Cruz');
  const [modalVisible, setModalVisible] = useState(false);

  // Set the profile picture state
  useEffect(() => {
    if (user?.image?.includes("https://ui-avatars.com/api/?name=")) {
      setImage(user.profilePicture);
    } else {
      setImage(`https://niyoghub-server.onrender.com/${user?.profilePicture}`);
    }
  }, [user?.profilePicture]);


  const onPickImage = async (source) => {
    let result;
    if (source === "camera") {
      result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    }

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setImage(imageUri);

      const updatedUserData = { ...user, fullName };
      await updateUser(updatedUserData, imageUri);

      if (error) {
        Alert.alert("Update Failed", error);
      } else {
        Alert.alert("Success", "Profile picture has been updated successfully.");
      }
    }
  };


  // Handle full name update
  const handleSubmit = async (newFullName) => {
    setFullName(newFullName);

    const updatedUserData = { ...user, fullName: newFullName };
    await updateUser(updatedUserData);

    if (error) {
      Alert.alert('Update Failed', error);
    } else {
      Alert.alert('Success', 'Full Name has been updated successfully.');
    }

    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>General Settings</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.settingsTitle}>Profile Settings</Text>
        <Text style={styles.subSectionTitle}>Customize Profile</Text>

        {/* Full Name Setting */}
        <View style={styles.itemContainer}>
          <View style={styles.itemTextContainer}>
            <Text style={styles.itemLabel}>Full name</Text>
            <Text style={styles.itemValue}>{fullName}</Text>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.changeButton}>Change</Text>
          </TouchableOpacity>
        </View>

        {/* Full Name Modal */}
        <UpdateModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSubmit={handleSubmit}
          infoType="Full Name"
          currentValue={fullName}
        />

        {/* Profile Picture Upload */}
        <View style={styles.profileImageContainer}>
          <Text style={styles.itemLabel}>Profile Picture</Text>
          <Text style={styles.subtitle}>Update your profile picture</Text>
          <View style={styles.profileImageWrapper}>
            <Image
              source={{ uri: image || `https://www.pngarts.com/files/10/Default-Profile-Picture-Download-PNG-Image.png` }}
              style={styles.profileImage}
            />
            <View style={styles.uploadOptions}>
              <TouchableOpacity style={styles.uploadBox} onPress={() => onPickImage('camera')}>
                <Ionicons name="camera" size={60} color="#6FA542" />
                <Text style={styles.uploadText}>Take Picture</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.uploadBox} onPress={() => onPickImage('gallery')}>
                <Ionicons name="image" size={60} color="#6FA542" />
                <Text style={styles.uploadText}>Browse Gallery</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: '#F0F0F0',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingTop: 40,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollContainer: {
    paddingHorizontal: 20,
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
  },
  subSectionTitle: {
    fontSize: 14,
    marginBottom: 15,
    color: '#555',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTextContainer: {
    flex: 1,
  },
  itemLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  itemValue: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  changeButton: {
    color: '#6FA542',
    borderWidth: 1,
    borderColor: '#6FA542',
    borderRadius: 25,
    paddingVertical: 3,
    paddingHorizontal: 10,
    textAlign: 'center',
    fontSize: 14,
  },
  profileImageContainer: {
    marginTop: 10,
  },
  profileImageWrapper: {
    flexDirection: 'row',
    alignItems: 'start',
    flexWrap: 'wrap',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 20,
    marginBottom: 20,
  },
  uploadOptions: {
    flexDirection: 'row',
  },
  uploadBox: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    width: 130,
    height: 130,
    marginRight: 10,
  },
  uploadText: {
    fontSize: 14,
    color: '#6FA542',
    marginTop: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
});

export default ProfileSettingsScreen;
