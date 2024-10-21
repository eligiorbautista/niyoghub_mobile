import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Linking, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthProvider } from "./contexts/AuthContext";
import SplashScreen from "./screens/unprotected/splashscreen/SplashScreen";
import OnboardingScreen from "./screens/unprotected/onboarding/OnboardingScreen";
import LoginScreen from "./screens/unprotected/login/LoginScreen";
import RegistrationScreen from "./screens/unprotected/registration/RegistrationScreen";
import TwoFactorAuthOTPScreen from "./screens/unprotected/otp_2fa/TwoFactorAuthOTPScreen";
import ResetPasswordRequestScreen from "./screens/unprotected/reset_password_request/ResetPasswordRequestScreen";
import ChangePasswordScreen from "./screens/unprotected/change_password/ChangePasswordScreen";
import DrawerLayout from "./layouts/drawer/DrawerLayout";
import NotificationsScreen from "./screens/protected/notifications/NotificationsScreen";
import SettingsScreen from "./screens/protected/settings/SettingsScreen";
import AccountSettingsScreen from "./screens/protected/settings/AccountSettingsScreen";
import ProfileSettingsScreen from "./screens/protected/settings/ProfileSettingsScreen";
import NotificationSettingsScreen from "./screens/protected/settings/NotificationSettingsScreen";
import HomeScreen from "./screens/protected/home/HomeScreen";
import IntercroppingScreen from "./screens/protected/home/IntercroppingScreen";
import CopraPriceScreen from "./screens/protected/home/CopraPriceScreen"; 
import SeeAllNewsProgramsScreen from "./screens/protected/home/SeeAllNewsPrograms";
import ReadNewsProgramsScreen from "./screens/protected/home/ReadNewsPrograms";
import ChatAssistantScreen from "./screens/protected/virtual_ai_assistant/ChatAssistantScreen";
import VoiceAssistantScreen from "./screens/protected/virtual_ai_assistant/VoiceAssistantScreen";


const Stack = createNativeStackNavigator();
const navigationRef = React.createRef();

const App = () => {
  const [isShowSplash, setIsShowSplash] = useState(true);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);

  useEffect(() => {
    // Hide splash screen after a few seconds
    setTimeout(() => {
      setIsShowSplash(false);
    }, 3000);
  }, []);

  // Deep linking handler
  useEffect(() => {
    const handleDeepLink = (event) => {
      const url = event.url;
      let token = null;

      // Parse the URL based on the scheme
      if (url.startsWith("niyoghub://")) {
        const path = url.split("niyoghub://")[1];
        if (path && path.startsWith("ChangePassword/")) {
          token = path.split("ChangePassword/")[1];
        }
      }

      if (token) {
        // Navigate to ChangePassword screen with the resetToken parameter
        navigationRef.current?.navigate("ChangePassword", { resetToken: token });
      }
    };

    // Listen for deep linking events
    Linking.addEventListener("url", handleDeepLink);

    // Handle initial URL when the app starts
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink({ url });
      }
    });

    // Cleanup listener
    return () => {
      Linking.removeEventListener("url", handleDeepLink);
    };
  }, []);


  const getInitialScreen = () => {
    if (isUserLoggedIn && isUserLoggedIn._id) {
      if (isUserLoggedIn.isTwoFactorEnabled) {
        return isShowSplash ? SplashScreen : TwoFactorAuthOTPScreen;
      }
      return isShowSplash ? SplashScreen : DrawerLayout;
    } else {
      return isShowSplash ? SplashScreen : OnboardingScreen;
    }
  };

  return (
    <AuthProvider>
      <NavigationContainer  ref={navigationRef}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* --------------- UNPROTECTED SCREENS --------------- */}
          <Stack.Screen
            name="Onboarding"
            component={getInitialScreen()}
          />
          <Stack.Screen name="Registration" component={RegistrationScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen
            name="TwoFactorAuthOTP"
            component={TwoFactorAuthOTPScreen}
          />
          <Stack.Screen
            name="RequestPasswordReset"
            component={ResetPasswordRequestScreen}
          />
          <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
          <Stack.Screen name="Layout" component={DrawerLayout} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />

          {/* --------------- PROTECTED SCREENS --------------- */}
          <Stack.Screen name="Voice Assistant" component={VoiceAssistantScreen} />
          <Stack.Screen name="AI Assistant" component={ChatAssistantScreen} />

          {/* settings-related screens */}
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen
            name="AccountSettings"
            component={AccountSettingsScreen}
          />
          <Stack.Screen
            name="ProfileSettings"
            component={ProfileSettingsScreen}
          />
          <Stack.Screen
            name="NotificationSettings"
            component={NotificationSettingsScreen}
          />

          {/* home-related screens */}
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Intercropping" component={IntercroppingScreen} />
          <Stack.Screen name="CopraPrice" component={CopraPriceScreen} />

          {/* article-related screens under home */} 
          <Stack.Screen
            name="SeeAllNewsPrograms"
            component={SeeAllNewsProgramsScreen}
          />
          <Stack.Screen
            name="ReadNewsPrograms"
            component={ReadNewsProgramsScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
