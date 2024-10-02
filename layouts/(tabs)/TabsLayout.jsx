import { StyleSheet } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../../screens/protected/home/HomeScreen';
import IdentificationScreen from '../../screens/protected/identification/IdentificationScreen';
import SoilMapScreen from '../../screens/protected/map/SoilMapScreen';
import ChatScreen from '../../screens/protected/chat/ChatScreen';
import SettingsScreen from '../../screens/protected/settings/SettingsScreen';

const Tab = createBottomTabNavigator();

const TabsLayout = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Identification') {
                        iconName = focused ? 'search' : 'search-outline';
                    } else if (route.name === 'SoilMap') {
                        iconName = focused ? 'map' : 'map-outline';
                    } else if (route.name === 'Chat') {
                        iconName = focused ? 'chatbox' : 'chatbox-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
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
                name="Identification" 
                component={IdentificationScreen} 
                options={{ headerShown: false }} 
            />
            <Tab.Screen 
                name="SoilMap" 
                component={SoilMapScreen} 
                options={{ headerShown: false }} 
            />
            <Tab.Screen 
                name="Chat" 
                component={ChatScreen} 
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
    },
});
