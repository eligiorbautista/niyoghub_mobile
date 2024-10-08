import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerLayout from "./layouts/drawer/DrawerLayout";
import NotificationsScreen from "./screens/protected/notifications/NotificationsScreen";
import OnboardingScreen from "./screens/unprotected/onboarding/OnboardingScreen";
import SplashScreen from "./screens/unprotected/splashscreen/SplashScreen";
import LoginScreen from "./screens/unprotected/login/LoginScreen";
import RegistrationScreen from "./screens/unprotected/registration/RegistrationScreen";
import SettingsScreen from "./screens/protected/settings/SettingsScreen";
import AccountSettingsScreen from "./screens/protected/settings/AccountSettingsScreen";
import ProfileSettingsScreen from "./screens/protected/settings/ProfileSettingsScreen";
import NotificationSettingsScreen from "./screens/protected/settings/NotificationSettingsScreen";
import ResetPasswordOTPScreen from "./screens/unprotected/otp_reset_password/ResetPasswordOTPScreen";
import TwoFactorAuthOTPScreen from "./screens/unprotected/otp_2fa/TwoFactorAuthOTPScreen";
import HomeScreen from "./screens/protected/home/HomeScreen";
import IntercroppingScreen from "./screens/protected/home/Intercropping";
import CopraPriceScreen from "./screens/protected/home/CopraPrice";
import ChangePasswordScreen from "./screens/unprotected/change_password/ChangePasswordScreen";

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
        <Stack.Screen name="TwoFactorAuthOTP" component={TwoFactorAuthOTPScreen} />
        <Stack.Screen name="ResetPasswordOTP" component={ResetPasswordOTPScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        <Stack.Screen name="Layout" component={DrawerLayout} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />

        {/* protected */}

        {/* settings-related screens */}
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="AccountSettings" component={AccountSettingsScreen} />
        <Stack.Screen name="ProfileSettings" component={ProfileSettingsScreen} />
        <Stack.Screen name="NotificationSettings" component={NotificationSettingsScreen} />

        {/* home-related screens */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Intercropping" component={IntercroppingScreen} />
        <Stack.Screen name="CopraPrice" component={CopraPriceScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
