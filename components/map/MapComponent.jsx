import React, { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import MapView, { UrlTile, Marker } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";

const municipalities = {
  "Agdangan": { latitude: 13.8798, longitude: 122.2019 },
  "Alabat": { latitude: 14.1072, longitude: 122.0111 },
  "Atimonan": { latitude: 14.0027, longitude: 121.9216 },
  "Buenavista": { latitude: 13.8283, longitude: 121.8126 },
  "Burdeos": { latitude: 14.8484, longitude: 121.9250 },
  "Calauag": { latitude: 13.9606, longitude: 122.2875 },
  "Candelaria": { latitude: 13.9276, longitude: 121.4237 },
  "Catanauan": { latitude: 13.5929, longitude: 122.3188 },
  "Dolores": { latitude: 13.9611, longitude: 121.4490 },
  "General Luna": { latitude: 13.6961, longitude: 122.1657 },
  "General Nakar": { latitude: 14.7678, longitude: 121.4894 },
  "Guinayangan": { latitude: 13.9123, longitude: 122.4311 },
  "Gumaca": { latitude: 13.8541, longitude: 122.0972 },
  "Infanta": { latitude: 14.7510, longitude: 121.6522 },
  "Jomalig": { latitude: 14.7200, longitude: 122.4328 },
  "Lopez": { latitude: 13.8809, longitude: 122.2594 },
  "Lucban": { latitude: 14.1131, longitude: 121.5511 },
  "Lucena City": { latitude: 13.9373, longitude: 121.6170 },
  "Macalelon": { latitude: 13.7421, longitude: 122.1815 },
  "Mauban": { latitude: 14.1916, longitude: 121.7304 },
  "Mulanay": { latitude: 13.5261, longitude: 122.3994 },
  "Padre Burgos": { latitude: 13.8690, longitude: 121.8123 },
  "Pagbilao": { latitude: 13.9673, longitude: 121.6912 },
  "Panukulan": { latitude: 14.8082, longitude: 121.7420 },
  "Patnanungan": { latitude: 14.6700, longitude: 122.3084 },
  "Perez": { latitude: 14.0227, longitude: 121.8137 },
  "Pitogo": { latitude: 13.7833, longitude: 122.1277 },
  "Plaridel": { latitude: 13.9894, longitude: 122.1226 },
  "Polillo": { latitude: 14.7168, longitude: 121.9242 },
  "Quezon": { latitude: 13.9240, longitude: 122.2072 },
  "Real": { latitude: 14.6637, longitude: 121.6074 },
  "Sampaloc": { latitude: 14.1164, longitude: 121.4975 },
  "San Andres": { latitude: 13.5031, longitude: 122.6803 },
  "San Antonio": { latitude: 13.9805, longitude: 121.3761 },
  "San Francisco": { latitude: 13.5800, longitude: 122.4801 },
  "San Narciso": { latitude: 13.4814, longitude: 122.4958 },
  "Sariaya": { latitude: 13.9644, longitude: 121.5261 },
  "Tagkawayan": { latitude: 14.0759, longitude: 122.4453 },
  "Tayabas City": { latitude: 14.0269, longitude: 121.5945 },
  "Tiaong": { latitude: 13.9628, longitude: 121.3277 },
  "Unisan": { latitude: 13.8324, longitude: 122.0618 }
};

const MapComponent = ({ selectedMunicipality, intercroppingSelections }) => {
  const { coffeeSelected, cacaoSelected, bananaSelected, cornSelected } = intercroppingSelections;

  const defaultRegion = {
    latitude: 13.9603,
    longitude: 122.1114,
    latitudeDelta: 2,
    longitudeDelta: 2,
  };

  const [region, setRegion] = useState(defaultRegion);
  const [markerPosition, setMarkerPosition] = useState(null);

  //Effect to update map region when a municipality is selected
  useEffect(() => {
    if (selectedMunicipality && municipalities[selectedMunicipality]) {
      const newRegion = {
        latitude: municipalities[selectedMunicipality].latitude,
        longitude: municipalities[selectedMunicipality].longitude,
        latitudeDelta: 0.5,  //Adjust zoom level
        longitudeDelta: 0.5,
      };
      setRegion(newRegion);
      setMarkerPosition({
        latitude: municipalities[selectedMunicipality].latitude,
        longitude: municipalities[selectedMunicipality].longitude,
      });
    } else {
      setRegion(defaultRegion);
      setMarkerPosition(null);
    }
  }, [selectedMunicipality]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region} //Use the controlled `region` state here
        onRegionChangeComplete={setRegion} //Update region state on manual changes
        zoomEnabled={true}
        minZoomLevel={8}
        maxZoomLevel={15}
      >
        <UrlTile urlTemplate={"http://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"} maximumZ={19} />
        {markerPosition && (
          <Marker
            coordinate={markerPosition}
            title={selectedMunicipality}
            description={`Location of ${selectedMunicipality}`}
          />
        )}
      </MapView>

      {/* Zoom Controls */}
      <View style={styles.zoomButtons}>
        <TouchableOpacity style={styles.zoomButton} onPress={() => setRegion((prev) => ({ ...prev, latitudeDelta: prev.latitudeDelta / 2, longitudeDelta: prev.longitudeDelta / 2 }))}>
          <MaterialIcons name="add" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.zoomButton} onPress={() => setRegion((prev) => ({ ...prev, latitudeDelta: prev.latitudeDelta * 2, longitudeDelta: prev.longitudeDelta * 2 }))}>
          <MaterialIcons name="remove" size={30} color="white" />
        </TouchableOpacity>
      </View>

      {/* Chat Icon */}
      <TouchableOpacity style={styles.chatButton} onPress={() => {/* Add chat functionality here */}}>
        <MaterialIcons name="chat-bubble-outline" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  zoomButtons: {
    position: "absolute",
    bottom: 50,
    right: 10,
    zIndex: 10,
    alignItems: "center",
  },
  zoomButton: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 50,
    padding: 10,
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  chatButton: {
    position: 'absolute',
    top: 150,
    left: 10,
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default MapComponent;
