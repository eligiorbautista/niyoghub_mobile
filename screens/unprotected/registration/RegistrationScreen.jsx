

import React, { useState } from 'react';
import {
  ImageBackground, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView, ActivityIndicator, Keyboard
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import useRegister from '../../../hooks/useRegister';

const RegistrationScreen = ({ navigation }) => {
  const { register, loading } = useRegister();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [city, setCity] = useState('');
  const [language, setLanguage] = useState('');

  const handleSignUp = async () => {

    if (!firstName || !lastName || !email || !password || !confirmPassword || !city || !language) {
      Alert.alert('Error', 'Please fill in all the fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    const userDetails = {
      fullName: `${firstName} ${lastName}`,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      city: city,
      language: language,
    }

    try {
      await register(userDetails);
      Keyboard.dismiss();
      navigation.navigate('Layout');
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

    } catch (error) {
      Alert.alert('Registration Failed', 'An error occurred during registration.');
    }
  };

  const quezonCitiesAndMunicipalities = [
    "Select city / municipality",
    "Lucena City",
    "Tayabas City",
    "Agdangan",
    "Alabat",
    "Atimonan",
    "Buenavista",
    "Burdeos",
    "Calauag",
    "Candelaria",
    "Catanauan",
    "Dolores",
    "General Luna",
    "General Nakar",
    "Guinayangan",
    "Gumaca",
    "Infanta",
    "Jomalig",
    "Lopez",
    "Lucban",
    "Macalelon",
    "Mauban",
    "Mulanay",
    "Padre Burgos",
    "Pagbilao",
    "Panukulan",
    "Patnanungan",
    "Perez",
    "Pitogo",
    "Plaridel",
    "Polillo",
    "Quezon",
    "Real",
    "Sampaloc",
    "San Andres",
    "San Antonio",
    "San Francisco",
    "San Narciso",
    "Sariaya",
    "Tagkawayan",
    "Tiaong",
    "Unisan"
  ];

  return (
    <ImageBackground source={require('../../../assets/background.png')} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Create Account</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>First name</Text>
            <TextInput
              placeholder="Enter your first name"
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Last name</Text>
            <TextInput
              placeholder="Enter your last name"
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email address</Text>
            <TextInput
              placeholder="Enter your email address"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder="Enter your password"
              secureTextEntry
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm password</Text>
            <TextInput
              placeholder="Re-enter your password"
              secureTextEntry
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>City / Municipality</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={city}
                onValueChange={(itemValue) => setCity(itemValue)}
                style={styles.picker}
              >
                {quezonCitiesAndMunicipalities.map((city, index) => (
                  <Picker.Item key={index} label={city} value={city} />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Preferred language</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={language}
                onValueChange={(itemValue) => setLanguage(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Select language" value="" />
                <Picker.Item label="English" value="English" />
                <Picker.Item label="Filipino" value="Filipino" />
              </Picker>
            </View>
          </View>

          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign Up</Text>}
          </TouchableOpacity>

          <View style={styles.signInRow}>
            <Text style={styles.link}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default RegistrationScreen;
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    paddingBottom: 40,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#6BBE44",
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 5,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  picker: {
    height: 50,
    color: "#000",
  },
  signUpButton: {
    marginTop: 15,
    backgroundColor: 'rgba(83, 127, 25, 0.8)',
    padding: 12,
    alignItems: "center",
    borderRadius: 25,
    marginBottom: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  signInRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  link: {
    fontSize: 14,
    color: "#000",
  },
  signInText: {
    fontSize: 14,
    color: 'rgba(83, 127, 25, 0.8)',
    fontWeight: "bold",
  },
});
