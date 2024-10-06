import React from "react";
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


const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const navigation = useNavigation();

  return (
    <DrawerContentScrollView {...props}>
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
            uri: "https://www.shutterstock.com/image-photo/smiling-elderly-man-asian-farmer-600nw-2327263875.jpg",
          }}
          style={styles.profileImage}
        />
        <Text style={styles.username}>Juan Dela Cruz</Text>
      </View>

      {/* drawer items */}
      <DrawerItemList {...props} />

      <View style={styles.logoutContainer}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            // handle logout
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
  const navigation = useNavigation();

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
          }
          return (
            <Ionicons
              name={iconName}
              size={size}
              color={focused ? "#537F19" : "gray"}
            />
          );
        },
        drawerActiveTintColor: "#537F19",
        drawerInactiveTintColor: "gray",
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Notifications")}
          >
            <Ionicons
              name="notifications-outline"
              size={24}
              color="gray"
              style={{ marginRight: 15 }}
            />
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
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 12,
  },
  username: {
    fontSize: 16,
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
});
