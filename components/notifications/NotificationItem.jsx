import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';

const NotificationItem = ({ notification, onPress }) => {
  const formattedTime = moment(notification.createdAt).fromNow();

  // Determine the icon based on the notification type
  const getIconName = (type) => {
    switch (type) {
      case 'Password Reset':
        return 'key-outline';
      case 'Password Reset Request':
        return 'lock-closed-outline';
      case 'Registration':
        return 'person-add-outline';
      case 'Chat Reply':
        return 'chatbubble-ellipses-outline';
      case 'App Update':
        return 'cloud-download-outline';
      case 'Posts':
        return 'document-text-outline';
      case 'Two Factor Enabled':
        return 'shield-checkmark-outline';
      case 'Change Password':
        return 'refresh-outline';
      default:
        return 'notifications-outline';
    }
  };

  // Check if the notification should be pressable (only for "Posts" and "Chat Reply")
  const isPressable = notification.type === 'Posts' || notification.type === 'Chat Reply';

  // Render the notification item
  const NotificationContent = (
    <>
      <Ionicons name={getIconName(notification.type)} size={24} color="#4CAF50" style={styles.icon} />
      <View style={styles.notificationDetails}>
        <Text style={styles.notificationTitle}>{notification.type}</Text>
        <Text style={styles.notificationDetailsText}>{notification.message}</Text>
        <Text style={styles.notificationTime}>{formattedTime}</Text>
      </View>
      {!notification.read && <View style={styles.unreadDot} />}
    </>
  );

  return isPressable ? (
    <TouchableOpacity style={styles.notificationItem} onPress={onPress}>
      {NotificationContent}
    </TouchableOpacity>
  ) : (
    <View style={styles.notificationItem}>
      {NotificationContent}
    </View>
  );
};

const styles = StyleSheet.create({
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    marginRight: 15,
  },
  notificationDetails: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  notificationTime: {
    fontSize: 12,
    color: '#4CAF50',
  },
  notificationDetailsText: {
    fontSize: 14,
    color: '#555',
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
    position: 'absolute',
    top: 15,
    right: 15,
  },
});

export default NotificationItem;
