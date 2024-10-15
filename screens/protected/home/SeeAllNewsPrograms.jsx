import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Pressable } from 'react-native';
import React from 'react';
import { Ionicons } from "@expo/vector-icons";

const SeeAllNewsProgramsScreen = ({ navigation, route }) => {
  const { newsData } = route.params; 

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      <Image
        source={require("../../../assets/niyoghub_banner_1.png")}
        style={styles.headerImage}
      />

      <Ionicons name="settings-outline" size={24} color="transparent" />
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      <Image source={item.image} style={styles.newsImage} />
      <Text style={styles.categoryText}>{item.category}</Text>
      <Text style={styles.dateText}>{item.date}</Text>
      <Text style={styles.descriptionText}>{item.description}</Text>
      <Pressable 
        style={styles.readButton}
        onPress={() => navigation.navigate('ReadNewsPrograms', { newsItem: item })} // Pass the item here
      >
        <Text style={styles.readButtonText}>Read</Text>
      </Pressable>
    </View>
  );
  

  return (
    <FlatList
      data={newsData}
      keyExtractor={(item) => item.id.toString()} // Ensure unique key
      renderItem={renderItem}
      ListHeaderComponent={renderHeader} 
      contentContainerStyle={styles.container} 
    />
  );
};

export default SeeAllNewsProgramsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
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
  postContainer: {
    padding: 10,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 3,
    justifyContent: 'space-between',

    marginHorizontal: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  newsImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  categoryText: {
    fontSize: 14,
    color: 'black',
    marginTop: 8,
  },
  dateText: {
    fontSize: 14,
    color: '#666',
  },
  descriptionText: {
    fontSize: 16,
    marginTop: 5,
  },
  readButton: {
    backgroundColor: '#537F19', 
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 20, 
  },
  readButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
