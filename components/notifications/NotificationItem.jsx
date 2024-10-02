import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';

const NotificationItem = ({ notification }) => {
  const formattedTime = moment(notification.createdAt).fromNow(); // format time  

  return (
    <View style={styles.notificationItem}>
      <Ionicons name={notification.icon} size={24} color="#4CAF50" style={styles.icon} />
      <View style={styles.notificationDetails}>
        <Text style={styles.notificationTitle}>{notification.title}</Text>
        <Text style={styles.notificationTime}>{formattedTime}</Text>
      </View>
    </View>
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
});

export default NotificationItem;