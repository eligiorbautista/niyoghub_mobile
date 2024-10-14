import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import NotificationItem from "../../../components/notifications/NotificationItem";

const fetchNotifications = async () => {
  return [
    {
      id: "1",
      type: "price",
      title: "Copra Price Update",
      createdAt: "2024-9-28T14:30:00Z",
      icon: "time-outline",
      read: false,
      details: "The latest copra price has been updated.",
      actionUrl: "CopraPrice",
    },
    {
      id: "2",
      type: "message",
      title: "Reply from PCA",
      createdAt: "2024-08-28T14:00:00Z",
      icon: "mail-outline",
      read: true,
      details: "You have a new reply from PCA.",
      actionUrl: "MessageDetails",
    },
    {
      id: "3",
      type: "update",
      title: "App Version 1.1 Released",
      createdAt: "2024-04-28T12:00:00Z",
      icon: "cloud-download-outline",
      read: false,
      details: "A new version of the app is available for download.",
      actionUrl: "UpdateDetails",
    },
    {
      id: "4",
      type: "message",
      title: "Reply from PCA",
      createdAt: "2023-08-28T14:00:00Z",
      icon: "mail-outline",
      read: true,
      details: "You have a new reply from PCA.",
      actionUrl: "MessageDetails",
    },
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

  const handleNotificationPress = (item) => {
    Alert.alert(item.title, item.details);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <Image
          source={require("../../../assets/niyoghub_banner_1.png")}
          style={styles.headerImage}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate("NotificationSettings")}
        >
          <Ionicons name="settings-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Notifications</Text>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        // renderItem={({ item }) => <NotificationItem notification={item} onPress={() => navigation.navigate(item.actionUrl)} />}
        renderItem={({ item }) => (
          <NotificationItem
            notification={item}
            onPress={() => handleNotificationPress(item)}
          />
        )}
        contentContainerStyle={styles.notificationList}
      />
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#F0F0F0",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    marginTop: 0,
  },
  headerImage: {
    width: 150,
    height: 50,
    resizeMode: "contain",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    textAlign: "start",
  },
  notificationList: {
    paddingHorizontal: 20,
  },
});
