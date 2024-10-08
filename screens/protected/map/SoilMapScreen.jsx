import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; // Icons
import MapComponent from '../../../components/map/MapComponent';

const SoilMapScreen = () => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <View style={styles.container}>
      {/* Header with Back and Help Icons */}
      <View style={styles.header}>

        {/* ginawa ko lang transparent para hindi makita at para hindi mamove yung text at information icon na nasa flex container */}
        <Ionicons name="arrow-back" size={28} color="transparent" />

        <Text style={styles.title}>Sustainability Map</Text>
        <TouchableOpacity style={styles.helpButton}>
          <MaterialIcons name="help-outline" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {/* Map Component */}
      <MapComponent />

      {/* Hamburger Menu */}
      <TouchableOpacity style={styles.menuButton} onPress={toggleDetails}>
        <Ionicons name="menu" size={28} color="white" />
      </TouchableOpacity>

      {/* Chat Icon (placed under the Hamburger Menu) */}
      <TouchableOpacity style={styles.chatButton}>
        <Ionicons name="chatbubble-outline" size={28} color="white" />
      </TouchableOpacity>


      {/* Soil Info (Toggles with Hamburger Menu) ALTERNATIVE WHILE WORKING ON OTHERS*/}
      {showDetails && (
        <View style={styles.soilInfo}>
          <Text style={styles.label}>Lucena City</Text>
          <Text>Depth: 0 - 30 cm</Text>
          <Text>Texture: Sandy Loam</Text>
          <Text>pH Level: 6.5</Text>
        </View>
      )}
    </View>
  );
};

export default SoilMapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 20,
    left: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    zIndex: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    flex: 1,
  },
  backButton: {
    padding: 5,
  },
  helpButton: {
    padding: 5,
  },
  menuButton: {
    position: 'absolute',
    top: 100,
    left: 10,
    padding: 10,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 10,
  },
  chatButton: {
    position: 'absolute',
    top: 150,
    left: 10,
    padding: 10,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 10,
  },
  soilInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});