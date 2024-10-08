import { StyleSheet, Text, View, TouchableOpacity, Image  } from 'react-native';
import React from 'react';
import { Ionicons } from "@expo/vector-icons";

const CopraPriceScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <Image
          source={require("../../../assets/niyoghub_banner_1.png")}
          style={styles.headerImage}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate("NotificationSettings")}
        >
          <Ionicons name="settings-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.text}>Copra Price Watch Screen</Text>
    </View>
  );
};

export default CopraPriceScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
    flex: 1,
  },
  text: {
    fontSize: 24, 
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#F0F0F0",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    marginTop: 35,
  },
  headerImage: {
    width: 150,
    height: 50,
    resizeMode: "contain",
  },
});