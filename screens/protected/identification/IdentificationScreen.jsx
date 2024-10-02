import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const IdentificationScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Identification Screen</Text>
    </View>
  );
};

export default IdentificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 24, 
  },
});
