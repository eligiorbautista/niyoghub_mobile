import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const SoilMapScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Soil Map Screen</Text>
    </View>
  );
};

export default SoilMapScreen;

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