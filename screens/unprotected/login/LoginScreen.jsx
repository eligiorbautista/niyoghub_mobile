import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ActivityIndicator, ImageBackground, Alert, Keyboard
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../../contexts/AuthContext';
import useLogin from '../../../hooks/useLogin';

const LoginScreen = ({ navigation }) => {
  const { login, loading } = useLogin();
  const { user, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showWebView, setShowWebView] = useState(false);
  const [webViewLoading, setWebViewLoading] = useState(false);

  // Check for token and redirect to the Layout if token exists
  useEffect(() => {
    const checkToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('userToken');
        if (storedToken && user?._id) {
          navigation.navigate('Layout');
        }
      } catch (error) {
        console.error('Failed to check token', error);
      }
    };

    checkToken();
  }, []);

  const handleLogin = async () => {
    try {
      Keyboard.dismiss();
      const response = await login(email, password);

      if (response.status === '2fa') {
        navigation.navigate('TwoFactorAuthOTP');
      }

      if (response.status === 'ok') {
        navigation.navigate('Layout');
      }

      setEmail('');
      setPassword('');
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid credentials.');
    }
  };

  const handleGoogleLogin = () => {
    setShowWebView(true);
  };

  const handleWebViewNavigationStateChange = async (newNavState) => {
    const { url } = newNavState;

    if (url.includes('https://niyoghub-server.onrender.com/api/auth/google/callback')) {
      setShowWebView(false);
      setWebViewLoading(true);

      try {
        const tokenMatch = url.match(/token=([^&]+)/);
        if (tokenMatch) {
          const token = tokenMatch[1];

          const response = await fetch('https://niyoghub-server.onrender.com/api/user', {
            headers: { Authorization: `Bearer ${token}` }
          });
          const user = await response.json();

          await AsyncStorage.setItem('userToken', token);
          setUser(user);
        } else {
          Alert.alert('Google Sign-In Failed', 'Unable to authenticate with Google.');
        }
      } catch (error) {
        Alert.alert('Google Sign-In Failed', 'An error occurred during authentication.');
      } finally {
        setWebViewLoading(false);
      }
    }
  };

  return (
    <ImageBackground source={require('../../../assets/background.png')} style={styles.background}>
      <View style={styles.container}>
        <Image source={require('../../../assets/niyoghub_logo_1.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Continue your farming journey</Text>

        <Text style={styles.inputLabel}>Email address</Text>
        <TextInput
          placeholder="Enter your email address"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.inputLabel}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Enter your password"
            secureTextEntry={!showPassword}
            style={styles.passwordInput}
            value={password}
            onChangeText={setPassword}
          />
          {password && password.length > 0 && (<TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={20} color="#555" />
          </TouchableOpacity>)}
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity onPress={() => navigation.navigate('RequestPasswordReset')}>
            <Text style={styles.forgotPasswordLink}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign In</Text>}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleLogin}
        >
          {webViewLoading ? <ActivityIndicator color="#fff" /> : (
            <Text style={styles.buttonText}>
              <Image source={require('../../../assets/icons/google.png')} style={{ width: 18, height: 18 }} />   Continue with Google
            </Text>
          )}
        </TouchableOpacity>

        {showWebView && (
          <View style={styles.webViewContainer}>
            <WebView
              source={{ uri: 'https://niyoghub-server.onrender.com/api/auth/google' }}
              onNavigationStateChange={handleWebViewNavigationStateChange}
              style={styles.webView}
            />
          </View>
        )}

        <View style={styles.signupRow}>
          <Text style={styles.signUpLink}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
            <Text style={styles.signupText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: 10,
  },
  logo: {
    width: "100%",
    height: 160,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
  },
  inputLabel: {
    marginBottom: 5,
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
    marginLeft: 20,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    backgroundColor: "#fff",
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    marginHorizontal: 20,
    backgroundColor: '#fff',
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
  },
  eyeButton: {
    padding: 10,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 15,
    marginRight: 20,
  },
  signUpLink: {
    color: "#000000",
    fontWeight: "400",
    marginBottom: 10,
  },
  forgotPasswordLink: {
    color: "#000000",
    fontWeight: "400",
    marginBottom: 10,
  },
  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  signupText: {
    color: 'rgba(83, 127, 25, 0.8)',
    fontWeight: "500",
  },
  signInButton: {
    backgroundColor: 'rgba(83, 127, 25, 0.8)',
    padding: 12,
    alignItems: "center",
    borderRadius: 25,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  googleButton: {
    backgroundColor: "#2e2e2e",
    padding: 12,
    alignItems: "center",
    borderRadius: 25,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  webViewContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    zIndex: 10,
  },
  webView: {
    flex: 1,
    marginVertical: 50, marginHorizontal: 30
  },
});
