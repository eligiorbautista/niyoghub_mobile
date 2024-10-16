import React, { useState, useContext } from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ActivityIndicator, ImageBackground, Alert, Keyboard
} from 'react-native';
import { AuthContext } from '../../../contexts/AuthContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const LoginScreen = ({ navigation }) => {
  const { login, loading } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login(email, password);

      Keyboard.dismiss();
      navigation.navigate('Layout');
      setEmail('');
      setPassword('');
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid credentials.');
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
        <TextInput
          placeholder="Enter your password"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        {/* Aligning 'Forgot password?' to the right */}
        <View style={styles.actionRow}>
          <TouchableOpacity onPress={() => navigation.navigate('ResetPasswordOTP')}>
            <Text style={styles.forgotPasswordLink}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign In</Text>}
        </TouchableOpacity>

        <TouchableOpacity style={styles.googleButton}>
          <Text style={styles.buttonText}>
            <FontAwesome name="google" size={18} color="#fff" /> Continue with Google
          </Text>
        </TouchableOpacity>

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
  actionRow: {
    flexDirection: "row",
    justifyContent: "flex-end", // Aligns content to the right
    marginBottom: 15,
    marginRight: 20, // Adds some spacing to the right
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
});