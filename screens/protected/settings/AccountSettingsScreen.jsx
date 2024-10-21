import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import UpdateModal from '../../../components/modals/UpdateModal';
import { AuthContext } from '../../../contexts/AuthContext';
import useUpdateUser from '../../../hooks/useUpdateUser';
import useChangePassword from '../../../hooks/useChangePassword';

const AccountSettingsScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentInfo, setCurrentInfo] = useState({ type: '', value: '' });
  const [passwordInput, setPasswordInput] = useState('');
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);

  const { user } = useContext(AuthContext);
  const { updateUser, loading, error } = useUpdateUser();
  const { changePassword, loading: passwordLoading, error: passwordError } = useChangePassword(); // Destructure the custom hook

  // Initialize two-factor authentication state from user context
  useState(() => {
    setIsTwoFactorEnabled(user?.isTwoFactorEnabled || false);
  }, [user]);

  const handleChangePress = (infoType, currentValue) => {
    setCurrentInfo({ type: infoType, value: currentValue });
    setPasswordInput(''); // Reset password input when showing the modal
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setPasswordInput(''); // Clear password input when closing the modal
  };

  const handleModalSubmit = async (newValue) => {
    if (currentInfo.type === 'Password') {
      // Handle password change separately
      const response = await changePassword(newValue);
      if (response?.success) {
        Alert.alert('Success', response.message);
      } else {
        Alert.alert('Failed', passwordError || 'Password change failed.');
      }
    } else {
      const fieldToUpdate = currentInfo.type === 'Email Address' ? 'email' :
        currentInfo.type === 'City / Municipality' ? 'city' :
          currentInfo.type === 'Language' ? 'language' : '';

      if (!fieldToUpdate) {
        Alert.alert('Error', 'Unable to update the selected field.');
        return;
      }
      console.log(fieldToUpdate);
      // Merge the existing user data with the new updated field
      const updatedUserData = { ...user, [fieldToUpdate]: newValue };
      await updateUser(updatedUserData);

      if (error) {
        Alert.alert('Update Failed', error);
      } else {
        Alert.alert('Success', `${currentInfo.type} updated successfully.`);
      }
    }

    setModalVisible(false);
  };



  const handleTwoFactorToggle = async () => {
    const newTwoFactorStatus = !isTwoFactorEnabled;
    setIsTwoFactorEnabled(newTwoFactorStatus);

    // Merge the existing user data with the new two-factor authentication status
    const updatedUserData = { ...user, isTwoFactorEnabled: newTwoFactorStatus };
    await updateUser(updatedUserData);

    if (error) {
      Alert.alert('Update Failed', error);
      setIsTwoFactorEnabled(!newTwoFactorStatus); // revert back on error
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="black" />
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
            Email Address {'\n'}
            <Text style={styles.value}>{user?.email || 'juandelacruz@gmail.com'}</Text>
          </Text>
          <TouchableOpacity onPress={() => handleChangePress('Email Address', user?.email || 'juandelacruz@gmail.com')}>
            <Text style={styles.changeButton}>Change</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>
            City / Municipality {'\n'}
            <Text style={styles.value}>{user?.city || 'Lucena City'}</Text>
          </Text>
          <TouchableOpacity onPress={() => handleChangePress('City / Municipality', user?.city || 'Lucena City')}>
            <Text style={styles.changeButton}>Change</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>
            Language {'\n'}
            <Text style={styles.value}>{user?.language || 'English (US)'}</Text>
          </Text>
          <TouchableOpacity onPress={() => handleChangePress('Language', user?.language || 'English (US)')}>
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

        <UpdateModal
          visible={modalVisible}
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
          infoType={modalVisible ? currentInfo.type : ''}
          currentValue={modalVisible ? currentInfo.value : ''}
        />

        <View style={{ marginTop: 10 }} />
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Two-Factor Authentication</Text>
          <TouchableOpacity
            style={[styles.customSwitch, isTwoFactorEnabled ? styles.switchOn : styles.switchOff]}
            onPress={handleTwoFactorToggle}
          >
            <View style={isTwoFactorEnabled ? styles.thumbOn : styles.thumbOff} />
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
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
  accountContent: {
    paddingHorizontal: 20,
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
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
    flex: 1,
    flexWrap: 'wrap',
    fontWeight: '600',
  },
  value: {
    fontSize: 12,
    color: '#555',
    marginBottom: 5,
    flexWrap: 'wrap',
    fontWeight: '400',
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
  customSwitch: {
    width: 40,
    height: 20,
    borderRadius: 15,
    justifyContent: 'center',
    padding: 5,
    borderWidth: .5,
  },
  switchOn: {
    backgroundColor: '#90B74B',
  },
  switchOff: {
    backgroundColor: 'white',
  },
  thumbOn: {
    width: 15,
    height: 15,
    borderRadius: 12.5,
    backgroundColor: 'white',
    alignSelf: 'flex-end',
  },
  thumbOff: {
    width: 15,
    height: 15,
    borderRadius: 12.5,
    backgroundColor: 'gray',
    alignSelf: 'flex-start',
  },
});

export default AccountSettingsScreen;
