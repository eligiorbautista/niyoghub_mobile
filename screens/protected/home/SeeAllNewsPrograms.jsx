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
    <Pressable
      style={styles.postContainer}
      onPress={() => navigation.navigate('ReadNewsPrograms', { newsItem: item })}
    >
      <Image source={item.image} style={styles.newsImage} />
      <View style={styles.textContainer}>
        <Text style={styles.categoryText}>{item.category}</Text>
        <Text style={styles.dateText}>{item.date}</Text>
        <Text style={styles.descriptionText} numberOfLines={3}>
          {item.description}
        </Text>
        <Pressable style={styles.readButton} onPress={() => navigation.navigate('ReadNewsPrograms', { newsItem: item })}>
          <Text style={styles.readButtonText}>Read More</Text>
          <Ionicons name="arrow-forward" size={16} color="#537F19" style={styles.readButtonIcon} />
        </Pressable>
      </View>
    </Pressable>
  );

  return (
    <FlatList
      data={newsData}
      keyExtractor={(item) => item.id.toString()}
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
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#F7F7F7",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    paddingTop: 40,
  },
  headerImage: {
    width: 150,
    height: 50,
    resizeMode: "contain",
  },
  postContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  newsImage: {
    width: 100,
    height: '100%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  textContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#537F19',
    marginBottom: 5,
  },
  dateText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  readButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'start',
    backgroundColor: 'transparent',
    borderRadius: 25,
    paddingVertical: 8,
    marginLeft: 5,
    marginTop: 10,
  },
  readButtonText: {
    color: '#537F19',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 5,
  },
  readButtonIcon: {
    marginLeft: 5,
  },
});
