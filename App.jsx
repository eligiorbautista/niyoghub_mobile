import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerLayout from "./layouts/DrawerLayout";
import NotificationsScreen from "./screens/protected/notifications/NotificationsScreen";
import OnboardingScreen from "./screens/unprotected/onboarding/OnboardingScreen";
import SplashScreen from "./screens/unprotected/splashscreen/SplashScreen";
import LoginScreen from "./screens/unprotected/login/LoginScreen";
import OTPScreen from "./screens/unprotected/otp/OTPScreen";
import RegistrationScreen from "./screens/unprotected/registration/RegistrationScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsShowSplash(false);
    }, 3000);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* unprotected */}
        <Stack.Screen
          name="Onboarding"
          component={isShowSplash ? SplashScreen : OnboardingScreen}
        />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="OTP" component={OTPScreen} />

        {/* protected  */}
        <Stack.Screen name="Layout" component={DrawerLayout} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;