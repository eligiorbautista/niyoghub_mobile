import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import PSDisplayNameModal from '../../../components/modals/ProfileSettingsModal';

const ProfileSettingsScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [displayName, setDisplayName] = useState('Juan Dela Cruz');
  const [modalVisible, setModalVisible] = useState(false);

  // Handle image picking from the gallery
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Handle display name update
  const handleSubmit = (newDisplayName) => {
    setDisplayName(newDisplayName);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>General Settings</Text>
      </View>

      {/* Profile Settings Section */}
      <View style={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>Profile Settings</Text>
        <Text style={styles.subSectionTitle}>Customize Profile</Text>

        {/* Display Name Setting */}
        <ProfileSettingItem
          label="Display Name"
          value={displayName}
          onEdit={() => setModalVisible(true)}
        />

        {/* Display Name Modal */}
        <PSDisplayNameModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSubmit={handleSubmit}
        />

        {/* Profile Picture Upload */}
        <ProfileImage
          image={image}
          onPickImage={pickImage}
        />
      </View>
    </View>
  );
};

// Reusable Component for Profile Settings Items
const ProfileSettingItem = ({ label, value, onEdit }) => (
  <View style={styles.itemContainer}>
    <View style={styles.itemTextContainer}>
      <Text style={styles.itemLabel}>{label}</Text>
      <Text style={styles.itemValue}>{value}</Text>
    </View>
    <TouchableOpacity onPress={onEdit}>
      <Text style={styles.editButton}>Set</Text>
    </TouchableOpacity>
  </View>
);

// Reusable Component for Profile Image
const ProfileImage = ({ image, onPickImage }) => (
  <View style={styles.profileImageContainer}>
    <Text style={styles.sectionTitle}>Profile Picture</Text>
    <Text style={styles.subtitle}>Update your profile picture</Text>
    <View style={styles.profileImageWrapper}>
      <Image
        source={image ? { uri: image } : require('../../../assets/farmer.png')}
        style={styles.profileImage}
      />
      <TouchableOpacity style={styles.uploadBox} onPress={onPickImage}>
        <Ionicons name="image" size={60} color="#6FA542" />
        <Button title="Browse" onPress={onPickImage} color="#6FA542" /> 
      </TouchableOpacity>
    </View>
  </View>
);

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  itemTextContainer: {
    flex: 1,
  },
  itemLabel: {
    fontSize: 14,
    color: '#777',
  },
  itemValue: {
    fontSize: 16,
    color: '#333',
  },
  editButton: {
    color: '#6FA542',
    borderWidth: 1,
    borderColor: '#6FA542',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 4,
    textAlign: 'center',
  },
  profileImageContainer: {
    marginTop: 20,
  },
  profileImageWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 20,
  },
  uploadBox: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    width: 150,
    height: 150,
  }, 
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
});

export default ProfileSettingsScreen;
