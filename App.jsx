import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
import DiagnoseScreen from "./screens/protected/identification/Diagnose";
import DiagnosedResultScreen from "./screens/protected/identification/DiagnosedResult";
import { user } from './contexts/AuthContext'
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();
const navigationRef = React.createRef();

const App = () => {
  const [isShowSplash, setIsShowSplash] = useState(true);
  const token = AsyncStorage.getItem('userToken');

  useEffect(() => {
    setTimeout(() => {
      setIsShowSplash(false);
    }, 3000);
  }, []);

  const getInitialScreen = () => {
    if (isShowSplash) {
      return SplashScreen;
    }

    return token ? DrawerLayout : OnboardingScreen;
  };

  return (
    <AuthProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen
            name="InitialScreen"
            component={getInitialScreen()}
          />
          {/* Other screens */}
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


          <Stack.Screen name="DiagnoseScreen" component={DiagnoseScreen} />
          <Stack.Screen name="DiagnosedResultScreen" component={DiagnosedResultScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
