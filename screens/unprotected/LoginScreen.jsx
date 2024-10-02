import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/niyoghub_logo_1.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>Continue your farming journey</Text>

      <TextInput
        placeholder="Email Address"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
      />

      <View style={styles.actionRow}>
        <TouchableOpacity onPress={() => navigation.navigate('OTP')}>
          <Text style={styles.link}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.signInButton} onPress={() => navigation.navigate('Layout')}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.googleButton}
        onPress={() => Alert.alert('Google sign-in is not available yet.')}
      >
        <View style={styles.googleButtonContent}>
          <Text style={styles.buttonText}><FontAwesome name="google" size={18} color="#fff" />{"  "}Continue with Google</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.signupRow}>
        <Text style={styles.link}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
          <Text style={styles.signupText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
  },
  logo: {
    width: '100%',
    height: 160,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 15,
  },
  link: {
    color: '#000000',
    fontWeight: '400',
    marginBottom : 10
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  signupText: {
    color: '#537F19',
    fontWeight: '500',
  },
  signInButton: {
    backgroundColor: '#537F19',
    padding: 12,
    alignItems: 'center',
    borderRadius: 25,
    marginBottom: 20,
  },
  googleButton: {
    backgroundColor: '#2e2e2e',
    padding: 12,
    alignItems: 'center',
    borderRadius: 25,
    marginBottom: 20,
  },
  googleButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
