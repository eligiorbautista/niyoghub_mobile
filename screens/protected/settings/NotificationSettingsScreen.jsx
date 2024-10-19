import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import useUpdateUser from '../../../hooks/useUpdateUser';
import { AuthContext } from '../../../contexts/AuthContext';

const NotificationSettingsScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const { updateUser, error } = useUpdateUser();

  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isAnnouncementsEnabled, setIsAnnouncementsEnabled] = useState(user?.notifications?.announcements || true);
  const [isEventsEnabled, setIsEventsEnabled] = useState(user?.notifications?.events || true);
  const [isNewsProgramsEnabled, setIsNewsProgramsEnabled] = useState(user?.notifications?.newsAndPrograms || true);
  const [isChatMessagesEnabled, setIsChatMessagesEnabled] = useState(user?.notifications?.chatMessages || true);

  const updateNotificationSettings = async (updatedNotifications) => {
    const updatedUserData = { ...user, notifications: updatedNotifications };

    await updateUser(updatedUserData);

    if (error) {
      Alert.alert('Update Failed', 'An error occurred while updating notification settings.');
    }
  };

  // Toggle the main notifications setting
  const toggleNotifications = () => {
    const newStatus = !isNotificationsEnabled;
    setIsNotificationsEnabled(newStatus);

    if (!newStatus) {
      // If disabling notifications, turn all specific notifications off
      setIsAnnouncementsEnabled(false);
      setIsEventsEnabled(false);
      setIsNewsProgramsEnabled(false);
      setIsChatMessagesEnabled(false);

      updateNotificationSettings({
        announcements: false,
        events: false,
        newsAndPrograms: false,
        chatMessages: false,
      });
    } else {
      // If enabling notifications, revert to the previous state or enable all
      setIsAnnouncementsEnabled(true);
      setIsEventsEnabled(true);
      setIsNewsProgramsEnabled(true);
      setIsChatMessagesEnabled(true);

      updateNotificationSettings({
        announcements: true,
        events: true,
        newsAndPrograms: true,
        chatMessages: true,
      });
    }
  };

  // Toggle notification settings and update in the backend
  const toggleAnnouncements = () => {
    const newStatus = !isAnnouncementsEnabled;
    setIsAnnouncementsEnabled(newStatus);
    updateNotificationSettings({
      announcements: newStatus,
      events: isEventsEnabled,
      newsAndPrograms: isNewsProgramsEnabled,
      chatMessages: isChatMessagesEnabled
    });
  };

  const toggleEvents = () => {
    const newStatus = !isEventsEnabled;
    setIsEventsEnabled(newStatus);
    updateNotificationSettings({
      announcements: isAnnouncementsEnabled,
      events: newStatus,
      newsAndPrograms: isNewsProgramsEnabled,
      chatMessages: isChatMessagesEnabled
    });
  };

  const toggleNewsPrograms = () => {
    const newStatus = !isNewsProgramsEnabled;
    setIsNewsProgramsEnabled(newStatus);
    updateNotificationSettings({
      announcements: isAnnouncementsEnabled,
      events: isEventsEnabled,
      newsAndPrograms: newStatus,
      chatMessages: isChatMessagesEnabled
    });
  };

  const toggleChatMessages = () => {
    const newStatus = !isChatMessagesEnabled;
    setIsChatMessagesEnabled(newStatus);
    updateNotificationSettings({
      announcements: isAnnouncementsEnabled,
      events: isEventsEnabled,
      newsAndPrograms: isNewsProgramsEnabled,
      chatMessages: newStatus
    });
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
                style={[styles.customSwitch, isAnnouncementsEnabled ? styles.switchOn : styles.switchOff]}
                onPress={toggleAnnouncements}
              >
                <View style={isAnnouncementsEnabled ? styles.thumbOn : styles.thumbOff} />
              </TouchableOpacity>
            </View>
            <View style={styles.item}>
              <Text style={styles.itemText}>Events</Text>
              <TouchableOpacity
                style={[styles.customSwitch, isEventsEnabled ? styles.switchOn : styles.switchOff]}
                onPress={toggleEvents}
              >
                <View style={isEventsEnabled ? styles.thumbOn : styles.thumbOff} />
              </TouchableOpacity>
            </View>
            <View style={styles.item}>
              <Text style={styles.itemText}>News & Programs</Text>
              <TouchableOpacity
                style={[styles.customSwitch, isNewsProgramsEnabled ? styles.switchOn : styles.switchOff]}
                onPress={toggleNewsPrograms}
              >
                <View style={isNewsProgramsEnabled ? styles.thumbOn : styles.thumbOff} />
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle2}>MESSAGES</Text>
            <View style={styles.item}>
              <Text style={styles.itemText}>Chat Messages</Text>
              <TouchableOpacity
                style={[styles.customSwitch, isChatMessagesEnabled ? styles.switchOn : styles.switchOff]}
                onPress={toggleChatMessages}
              >
                <View style={isChatMessagesEnabled ? styles.thumbOn : styles.thumbOff} />
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
    paddingTop: 30,
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
