import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import ASDisplayModal from '../../../components/modals/AccountSettingsModal';

const AccountSettingsScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentInfo, setCurrentInfo] = useState({ type: '', value: '' });

  const handleChangePress = (infoType, currentValue) => {
    setCurrentInfo({ type: infoType, value: currentValue });
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleModalSubmit = (newValue) => {
    setCurrentInfo(prev => ({ ...prev, value: newValue }));
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

      <ScrollView style={styles.accountContent}>
        <Text style={styles.settingsTitle}>Account Settings</Text>
        <Text style={styles.sectionTitle1}>USER PREFERENCES</Text>

        {/* User Info sections */}
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
            <Text style={styles.value}>{currentInfo.type === 'Email Address' ? currentInfo.value : 'juandelacruz@gmail.com'}</Text>
          </Text>
          <TouchableOpacity onPress={() => handleChangePress('Email Address', 'juandelacruz@gmail.com')}>
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
            Address {'\n'}
            <Text style={styles.value}>{currentInfo.type === 'Address' ? currentInfo.value : 'Lucena City, Quezon'}</Text>
          </Text>
          <TouchableOpacity onPress={() => handleChangePress('Address', 'Lucena City, Quezon')}>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  },
  accountContent: {
    paddingHorizontal: 20,
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
  },
  sectionTitle1: {
    fontSize: 12,
    marginBottom: 20,
    color: '#555',
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
    flex: 1,
    flexWrap: 'wrap',
    fontWeight: '600',
  },
  value: {
    fontSize: 12,
    color: '#555',
    marginBottom: 5,
    flexWrap: 'wrap',
    fontWeight: '400'
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
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 20,
  },
});

export default AccountSettingsScreen;
