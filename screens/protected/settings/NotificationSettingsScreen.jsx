import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import useUpdateUser from '../../../hooks/useUpdateUser';
import { AuthContext } from '../../../contexts/AuthContext';

const NotificationSettingsScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const { updateUser, error } = useUpdateUser();

  // Initialize notifications state from the user's data
  const [notifications, setNotifications] = useState({
    announcements: user?.notifications?.announcements || true,
    events: user?.notifications?.events || true,
    newsAndPrograms: user?.notifications?.newsAndPrograms || true,
    chatMessages: user?.notifications?.chatMessages || true,
  });

  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);

  const updateNotificationSettings = async (updatedNotifications) => {
    // Update only the notifications field
    const response = await updateUser({ notifications: updatedNotifications });

    if (response && !error) {
      Alert.alert('Success', 'Notification settings updated successfully.');
    } else {
      Alert.alert('Update Failed', 'An error occurred while updating notification settings.');
    }
  };

  // Toggle the main notifications setting
  const toggleNotifications = () => {
    const newStatus = !isNotificationsEnabled;
    setIsNotificationsEnabled(newStatus);

    if (!newStatus) {
      // If disabling notifications, turn all specific notifications off
      const updatedNotifications = {
        announcements: false,
        events: false,
        newsAndPrograms: false,
        chatMessages: false,
      };
      setNotifications(updatedNotifications);
      updateNotificationSettings(updatedNotifications);
    } else {
      // If enabling notifications, revert to the previous state or enable all
      const updatedNotifications = {
        announcements: true,
        events: true,
        newsAndPrograms: true,
        chatMessages: true,
      };
      setNotifications(updatedNotifications);
      updateNotificationSettings(updatedNotifications);
    }
  };

  // Generic toggle function for individual notification settings
  const toggleNotificationSetting = (key) => {
    const updatedNotifications = {
      ...notifications,
      [key]: !notifications[key],
    };
    setNotifications(updatedNotifications);
    updateNotificationSettings(updatedNotifications);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>General Settings</Text>
        </View>
      </View>

      <Text style={styles.settingsTitle}>Notification Settings</Text>

      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.sectionTitle1}>ALLOW NOTIFICATIONS</Text>
        <View style={styles.item}>
          <Text style={styles.itemText}>Allow notifications on NiyogHub</Text>
          <TouchableOpacity
            style={[styles.customSwitch, isNotificationsEnabled ? styles.switchOn : styles.switchOff]}
            onPress={toggleNotifications}
          >
            <View style={isNotificationsEnabled ? styles.thumbOn : styles.thumbOff} />
          </TouchableOpacity>
        </View>

        {isNotificationsEnabled && (
          <>
            <Text style={styles.sectionTitle1}>UPDATES</Text>
            <View style={styles.item}>
              <Text style={styles.itemText}>Announcements</Text>
              <TouchableOpacity
                style={[styles.customSwitch, notifications.announcements ? styles.switchOn : styles.switchOff]}
                onPress={() => toggleNotificationSetting('announcements')}
              >
                <View style={notifications.announcements ? styles.thumbOn : styles.thumbOff} />
              </TouchableOpacity>
            </View>
            <View style={styles.item}>
              <Text style={styles.itemText}>Events</Text>
              <TouchableOpacity
                style={[styles.customSwitch, notifications.events ? styles.switchOn : styles.switchOff]}
                onPress={() => toggleNotificationSetting('events')}
              >
                <View style={notifications.events ? styles.thumbOn : styles.thumbOff} />
              </TouchableOpacity>
            </View>
            <View style={styles.item}>
              <Text style={styles.itemText}>News & Programs</Text>
              <TouchableOpacity
                style={[styles.customSwitch, notifications.newsAndPrograms ? styles.switchOn : styles.switchOff]}
                onPress={() => toggleNotificationSetting('newsAndPrograms')}
              >
                <View style={notifications.newsAndPrograms ? styles.thumbOn : styles.thumbOff} />
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle2}>MESSAGES</Text>
            <View style={styles.item}>
              <Text style={styles.itemText}>Chat Messages</Text>
              <TouchableOpacity
                style={[styles.customSwitch, notifications.chatMessages ? styles.switchOn : styles.switchOff]}
                onPress={() => toggleNotificationSetting('chatMessages')}
              >
                <View style={notifications.chatMessages ? styles.thumbOn : styles.thumbOff} />
              </TouchableOpacity>
            </View>
          </>
        )}
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
  settingsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 30,
    marginLeft: 20,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  sectionTitle1: {
    fontSize: 12,
    marginTop: 20,
  },
  sectionTitle2: {
    fontSize: 12,
    marginTop: 25,
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

export default NotificationSettingsScreen;
