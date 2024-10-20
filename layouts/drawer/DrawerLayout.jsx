import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import TabsLayout from "../tabs/TabsLayout";
import { useNavigation } from "@react-navigation/native";
import ProfileScreen from "../../screens/protected/profile/ProfileScreen";
import FeedbackScreen from "../../screens/protected/feedback/FeedbackScreen";
import FAQScreen from "../../screens/protected/faq/FAQScreen";
import AboutScreen from "../../screens/protected/about/AboutScreen";
import LoginScreen from "../../screens/unprotected/login/LoginScreen";
import SettingsScreen from "../../screens/protected/settings/SettingsScreen";
import { AuthContext } from "../../contexts/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useUnreadNotifications from "../../hooks/useUnreadNotifications"; // Custom hook

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const { user, logout } = useContext(AuthContext);
  const navigation = useNavigation();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("userToken");
        setToken(storedToken);

        // Navigate to login if token doesn't exist
        if (!storedToken) {
          navigation.navigate("Login");
        }
      } catch (error) {
        console.error("Failed to retrieve token", error);
      }
    };

    checkToken();
  }, [user]);

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/niyoghub_banner_1.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.headerContainer}>
        <Image
          source={{
            uri: user?.profilePicture || `https://www.pngarts.com/files/10/Default-Profile-Picture-Download-PNG-Image.png`,
          }}
          style={styles.profileImage}
        />
        <Text style={styles.username}>{user?.fullName || `full name`}</Text>
      </View>

      {/* Drawer items */}
      <DrawerItemList {...props} />

      <View style={styles.logoutContainer}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            logout();
            navigation.navigate("Login");
          }}
        >
          <Ionicons name="log-out-outline" size={22} color="gray" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const DrawerLayout = () => {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();
  const unreadCount = useUnreadNotifications(user?._id); // Fetch unread count

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ route }) => ({
        drawerIcon: ({ focused, size }) => {
          let iconName;
          switch (route.name) {
            case "HomeTabs":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Profile":
              iconName = focused ? "person" : "person-outline";
              break;
            case "Feedback":
              iconName = focused ? "chatbubble" : "chatbubble-outline";
              break;
            case "FAQ":
              iconName = focused ? "help-circle" : "help-circle-outline";
              break;
            case "About":
              iconName = focused
                ? "information-circle"
                : "information-circle-outline";
              break;
            case "Settings":
              iconName = focused ? "settings" : "settings-outline";
              break;
          }
          return (
            <Ionicons
              name={iconName}
              size={size}
              color={focused ? 'rgba(83, 127, 25, 0.8)' : "gray"}
            />
          );
        },
        drawerActiveTintColor: 'rgba(83, 127, 25, 0.8)',
        drawerInactiveTintColor: "gray",
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Notifications")}
            style={styles.notificationButton}
          >
            <Ionicons
              name="notifications-outline"
              size={24}
              color="gray"
              style={{ marginRight: 15 }}
            />
            {unreadCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{unreadCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        ),
      })}
    >
       <Drawer.Screen
        name="HomeTabs"
        component={TabsLayout}
        options={{ title: "Home", headerTitle: "", drawerItemStyle: { display: 'none' } }}
      />
      <Drawer.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Login", headerTitle: "", drawerItemStyle: { display: 'none' } }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Profile", headerShown: false }}
      />
      <Drawer.Screen
        name="Feedback"
        component={FeedbackScreen}
        options={{ title: "Feedback", headerShown: false }}
      />
      <Drawer.Screen
        name="FAQ"
        component={FAQScreen}
        options={{ title: "FAQ", headerShown: false }}
      />
      <Drawer.Screen
        name="About"
        component={AboutScreen}
        options={{ title: "About", headerShown: false }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: "Settings", headerShown: false }}
      /> 
    </Drawer.Navigator>
  );
};

export default DrawerLayout;

const styles = StyleSheet.create({
  logoContainer: {
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  logo: {
    width: "60%",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  username: {
    fontSize: 18,
    fontWeight: "500",
  },
  logoutContainer: {
    marginTop: "auto",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    padding: 15,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoutText: {
    fontSize: 16,
    color: "gray",
    marginLeft: 10,
  },
  notificationButton: {
    position: "relative",
    marginRight: 5
  },
  badge: {
    position: "absolute",
    right: 5,
    top: -5,
    backgroundColor: "red",
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});
