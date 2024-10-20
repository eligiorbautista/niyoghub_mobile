import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import NotificationItem from "../../../components/notifications/NotificationItem";
import useNotifications from "../../../hooks/useNotifications";
import useMarkAllNotificationsAsRead from "../../../hooks/useMarkAllNotificationsAsRead";

const NotificationsScreen = ({ navigation }) => {
  const { notifications, loading, error, fetchNotifications } =
    useNotifications();
  const {
    markAllAsRead,
    loading: markingLoading,
    error: markingError,
  } = useMarkAllNotificationsAsRead();
  const [hasMarkedAsRead, setHasMarkedAsRead] = useState(false);

  // Function to detect if the user has seen all notifications
  const handleEndReached = () => {
    if (!hasMarkedAsRead) {
      markAllAsRead();
      setHasMarkedAsRead(true);
    }
  };

  const handleNotificationPress = (item) => {
    Alert.alert(item.type, item.message);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerButton}
        >
          <Ionicons name="chevron-back" size={24} color="#4CAF50" />
        </TouchableOpacity>

        <Image
          source={require("../../../assets/niyoghub_banner_1.png")}
          style={styles.headerImage}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate("NotificationSettings")}
          style={styles.headerButton}
        >
          <Ionicons name="settings-outline" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Notifications</Text>

      {loading || markingLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Loading notifications...</Text>
        </View>
      ) : error || markingError ? (
        <Text style={styles.error}>{error || markingError}</Text>
      ) : notifications.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="notifications-off-outline"
            size={48}
            color="#B0B0B0"
          />
          <Text style={styles.emptyText}>No notifications available</Text>
        </View>
      ) : (
        <FlatList
          data={[...notifications].reverse()} // Reverse the notifications array
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <NotificationItem
              notification={item}
              onPress={() => handleNotificationPress(item)}
            />
          )}
          contentContainerStyle={styles.notificationList}
          onEndReached={handleEndReached} // Mark as read when the user reaches the end
          onEndReachedThreshold={0.1} // Trigger when the user is 10% away from the end
        />
      )}
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    paddingTop: 40,
  },
  headerImage: {
    width: 160,
    height: 50,
    resizeMode: "contain",
  },
  headerButton: {
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: "#B0B0B0",
  },
  notificationList: {
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
});
