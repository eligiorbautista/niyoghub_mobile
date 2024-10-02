import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NotificationItem from '../../../components/notifications/NotificationItem'

const fetchNotifications = async () => {
  return [
    { id: '1', type: 'price', title: 'Copra Price Update', createdAt: '2024-04-28T14:30:00Z', icon: 'time-outline' },
    { id: '2', type: 'message', title: 'Reply from PCA', createdAt: '2024-04-28T14:00:00Z', icon: 'mail-outline' },
    { id: '3', type: 'update', title: 'App Version 1.2 Released', createdAt: '2024-04-28T12:00:00Z', icon: 'cloud-download-outline' },
    { id: '4', type: 'password', title: 'Password Changed Successfully', createdAt: '2024-04-27T16:45:00Z', icon: 'lock-closed-outline' },
    { id: '5', type: 'reset', title: 'Password Reset Request', createdAt: '2024-04-26T15:30:00Z', icon: 'refresh-outline' },
    { id: '6', type: 'login', title: 'New Login from Lucena City', createdAt: '2024-04-25T14:45:00Z', icon: 'log-in-outline' },
    { id: '7', type: 'price', title: 'Copra Price Update', createdAt: '2024-04-24T17:45:00Z', icon: 'pricetags-outline' },
    { id: '8', type: 'system', title: 'Scheduled Maintenance on April 30th', createdAt: '2024-04-24T10:00:00Z', icon: 'construct-outline' },
    { id: '9', type: 'security', title: 'Two-factor Authentication Enabled', createdAt: '2024-04-23T08:30:00Z', icon: 'shield-checkmark-outline' },
    { id: '11', type: 'alert', title: 'Unusual Login Attempt Detected', createdAt: '2024-04-22T06:30:00Z', icon: 'warning-outline' },
    { id: '14', type: 'news', title: 'New Article: Coconut Farming Tips', createdAt: '2024-04-20T13:15:00Z', icon: 'book-outline' },
    { id: '17', type: 'reminder', title: 'Reminder: Monthly Account Review', createdAt: '2024-04-18T10:15:00Z', icon: 'calendar-outline' },
    { id: '18', type: 'event', title: 'Webinar: Innovations in Coconut Farming', createdAt: '2024-04-17T11:00:00Z', icon: 'videocam-outline' },
  ];
};

const NotificationsScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const loadNotifications = async () => {
      const data = await fetchNotifications();
      setNotifications(data);
    };
    loadNotifications();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <Image
          source={require('../../../assets/niyoghub_banner_1.png')}
          style={styles.headerImage}
        />

        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Text style={styles.screenTitle}>Notifications</Text>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NotificationItem notification={item} />}
        contentContainerStyle={styles.notificationList}
      />
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  headerImage: {
    width: 150,
    height: 50,
    resizeMode: 'contain',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    padding: 20,
  },
  notificationList: {
    paddingHorizontal: 20,
  },
});
