import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation, useRoute } from "@react-navigation/native"; // Import hooks to access navigation and route
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import HomeScreen from "../../screens/protected/home/HomeScreen";
import IdentificationScreen from "../../screens/protected/identification/IdentificationScreen";
import SoilMapScreen from "../../screens/protected/map/SoilMapScreen";
import ChatScreen from "../../screens/protected/chat/ChatScreen";
import SettingsScreen from "../../screens/protected/settings/SettingsScreen";
import VoiceAssistantScreen from "../../screens/protected/virtual_ai_assistant/VoiceAssistantScreen";
import ChatAssistantScreen from "../../screens/protected/virtual_ai_assistant/ChatAssistantScreen";

const Tab = createBottomTabNavigator();

const TabsLayout = () => {
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    // If the ChatAssistantScreen is opened, highlight the Voice Assistant tab
    if (route.name === "ChatAssistant") {
      navigation.navigate("Voice Assistant");
    }
  }, [route.name]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home";
          } else if (route.name === "Identification") {
            iconName = focused ? "search" : "search";
          } else if (route.name === "Soil Map") {
            iconName = focused ? "map" : "map";
          } else if (route.name === "Chat") {
            iconName = focused ? "chat" : "chat";
          } else if (route.name === "AI Assistant") {
            iconName = focused ? "assistant" : "assistant";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings";
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#537F19",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: styles.tabBar,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Identification"
        component={IdentificationScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Soil Map"
        component={SoilMapScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="AI Assistant"
        component={ChatAssistantScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: "white",
    borderTopWidth: 0,
    elevation: 5,
    paddingHorizontal: 10,
  },
});
