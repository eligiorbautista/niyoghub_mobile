import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

const SettingsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>General Settings</Text>

      <Pressable style={styles.item} onPress={() => navigation.navigate('AccountSettings')}>
        <Ionicons style={styles.icon} name="person-outline" size={22} color="gray" />
        <Text style={styles.text}>Account</Text>
        <Text style={styles.arrow}>›</Text>
      </Pressable>

      <Pressable style={styles.item} onPress={() => navigation.navigate('ProfileSettings')}>
        <Ionicons style={styles.icon} name="id-card-outline" size={22} color="gray" />
        <Text style={styles.text}>Profile</Text>
        <Text style={styles.arrow}>›</Text>
      </Pressable>

      <Pressable style={styles.item} onPress={() => navigation.navigate('NotificationSettings')}>
        <Ionicons style={styles.icon} name="notifications-outline" size={22} color="gray" />
        <Text style={styles.text}>Notifications</Text>
        <Text style={styles.arrow}>›</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    height: '100%',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 15,
    justifyContent: 'space-between',
  },
  icon: {
    width: 24,                 
    height: 24,                 
    marginRight: 15, 
    color: '#537F19',  
  },
  text: {
    fontSize: 18,
    flex: 1,                  
  },
  arrow: {
    fontSize: 22, 
    color: '#537F19',
  },
});

export default SettingsScreen;
