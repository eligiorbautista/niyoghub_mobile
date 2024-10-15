import React from "react";
import { View, Text, Pressable, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SettingsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>

          <Image
            source={require("../../../assets/niyoghub_banner_1.png")}
            style={styles.headerImage}
          />

          <Ionicons
            name="information-circle-outline"
            size={24}
            color="#F0F0F0"
          />
        </View>
      </View>
      <Text style={styles.subHeader}>General Settings</Text>

      <Pressable
        style={styles.item}
        onPress={() => navigation.navigate("AccountSettings")}
      >
        <Ionicons
          style={styles.icon}
          name="person-outline"
          size={22}
          color='rgba(83, 127, 25, 0.8)'
        />
        <Text style={styles.text}>Account</Text>
        <Ionicons
          style={styles.arrowIcon}
          name="chevron-forward-outline"
          size={22}
          color='rgba(83, 127, 25, 0.8)'
        />
      </Pressable>

      <Pressable
        style={styles.item}
        onPress={() => navigation.navigate("ProfileSettings")}
      >
        <Ionicons
          style={styles.icon}
          name="id-card-outline"
          size={22}
          color='rgba(83, 127, 25, 0.8)'
        />
        <Text style={styles.text}>Profile</Text>
        <Ionicons
          style={styles.arrowIcon}
          name="chevron-forward-outline"
          size={22}
          color='rgba(83, 127, 25, 0.8)'
        />
      </Pressable>

      <Pressable
        style={styles.item}
        onPress={() => navigation.navigate("NotificationSettings")}
      >
        <Ionicons
          style={styles.icon}
          name="notifications-outline"
          size={22}
          color='rgba(83, 127, 25, 0.8)'
        />
        <Text style={styles.text}>Notifications</Text>
        <Ionicons
          style={styles.arrowIcon}
          name="chevron-forward-outline"
          size={22}
          color='rgba(83, 127, 25, 0.8)'
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
  },
  /* header */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#F0F0F0",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    // paddingTop: 30,
    marginBottom: 10,
  },
  headerImage: {
    width: 150,
    height: 50,
    resizeMode: "contain",
  },
  subHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    marginBottom: 15,
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  text: {
    fontSize: 18,
    flex: 1,
  },
  arrowIcon: {
    width: 24,
    height: 24,
  },
});

export default SettingsScreen;
