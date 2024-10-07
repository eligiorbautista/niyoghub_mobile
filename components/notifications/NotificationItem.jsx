import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';

const NotificationItem = ({ notification, onPress }) => {
  const formattedTime = moment(notification.createdAt).fromNow(); // Format time  

  return (
    <TouchableOpacity style={styles.notificationItem} onPress={onPress}>
      <Ionicons name={notification.icon} size={24} color="#4CAF50" style={styles.icon} />
      <View style={styles.notificationDetails}>
        <Text style={styles.notificationTitle}>{notification.title}</Text>
        <Text style={styles.notificationDetailsText}>{notification.details}</Text>
        <Text style={styles.notificationTime}>{formattedTime}</Text>
      </View>
      {!notification.read && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#F9F9F9',
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
