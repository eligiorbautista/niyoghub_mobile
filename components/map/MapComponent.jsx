import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import MapView, { UrlTile } from 'react-native-maps';
import { FontAwesome } from '@expo/vector-icons'; 

const MapComponent = () => {
  const [region, setRegion] = useState({
    latitude: 13.9603, // Center of Quezon Province
    longitude: 122.1114,
    latitudeDelta: 2,
    longitudeDelta: 2,
  });

  const zoomIn = () => {
    setRegion({
      ...region,
      latitudeDelta: region.latitudeDelta / 2,
      longitudeDelta: region.longitudeDelta / 2,
    });
  };

  const zoomOut = () => {
    setRegion({
      ...region,
      latitudeDelta: region.latitudeDelta * 2,
      longitudeDelta: region.longitudeDelta * 2,
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        zoomEnabled={true}
        minZoomLevel={8}
        maxZoomLevel={15}
      >
        <UrlTile
          urlTemplate={"http://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"}
          maximumZ={19}
        />
      </MapView>

      {/* Zoom Controls */}
      <View style={styles.zoomControls}>
        <TouchableOpacity style={styles.zoomButton} onPress={zoomIn}>
          <FontAwesome name="plus" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.zoomButton} onPress={zoomOut}>
          <FontAwesome name="minus" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  zoomControls: {
    position: 'absolute',
    bottom: 50,
    right: 10,
    flexDirection: 'column',
  },
  zoomButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    padding: 10,
    marginBottom: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MapComponent;
