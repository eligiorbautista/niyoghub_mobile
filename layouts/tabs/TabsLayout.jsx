import { StyleSheet } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import HomeScreen from '../../screens/protected/home/HomeScreen';
import IdentificationScreen from '../../screens/protected/identification/IdentificationScreen';
import SoilMapScreen from '../../screens/protected/map/SoilMapScreen';
import ChatScreen from '../../screens/protected/chat/ChatScreen';
import SettingsScreen from '../../screens/protected/settings/SettingsScreen';
import VirtualAssistantScreen from '../../screens/protected/virtual_ai_assistant/VirtualAssistantScreen';
import TestScreen from '../../screens/protected/virtual_ai_assistant/Test';

const Tab = createBottomTabNavigator();

const TabsLayout = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home';
                    } else if (route.name === 'Leaf Disease Identification') {
                        iconName = focused ? 'search' : 'search';
                    } else if (route.name === 'Soil Map') {
                        iconName = focused ? 'map' : 'map';
                    } else if (route.name === 'Chat') {
                        iconName = focused ? 'chat' : 'chat';
                    } else if (route.name === 'AI Assistant') {
                        iconName = focused ? 'assistant' : 'assistant';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'settings' : 'settings';
                    }

                    return <MaterialIcons name={iconName} size={size} color={color} />; // Use MaterialIcons instead of Ionicons
                },
                tabBarActiveTintColor: '#537F19',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: styles.tabBar,
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="Leaf Disease Identification"
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
                component={TestScreen}
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
        backgroundColor: 'white',
        borderTopWidth: 0,
        elevation: 5,
        paddingHorizontal: 10,
    },
});
