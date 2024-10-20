import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Share } from 'react-native';
import React from 'react';
import { Ionicons } from "@expo/vector-icons";

const ReadNewsProgramsScreen = ({ navigation, route }) => {
  const newsItem = route.params?.newsItem; 

  if (!newsItem) {
    return (
      <View style={styles.container}>
        <Text>Error: No news item found.</Text>
      </View>
    );
  }
  
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'You might find this article from NiyogHub worth sharing.', 
        url: 'https://example.com/article', 
        title: newsItem.title 
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
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

      {/* Article Content */}
      <ScrollView style={styles.container}>
        <View style={styles.postContainer}>
          <Image source={newsItem.image} style={styles.newsImage} />
          <Text style={styles.categoryText}>{newsItem.category}</Text>
          <Text style={styles.dateText}>{newsItem.date}</Text>
          <Text style={styles.descriptionText}>{newsItem.description}</Text>
          <TouchableOpacity style={styles.shareButton} onPress={onShare}>
            <Text style={styles.shareButtonText}>Share Article</Text>
            <Ionicons name="share-social-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default ReadNewsProgramsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 15,
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
    paddingTop: 30,
  },
  headerImage: {
    width: 150,
    height: 50,
    resizeMode: "contain",
  },
  postContainer: {
    paddingVertical: 20,
  },
  newsImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  categoryText: {
    fontSize: 14,
    color: 'black',
    marginTop: 5,
  },
  dateText: {
    fontSize: 14,
    color: '#666',
  },
  descriptionText: {
    fontSize: 16,
    marginTop: 5,
  },
  shareButton: {
    flexDirection: 'row',
    backgroundColor: '#537F19',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  shareButtonText: {
    color: 'white',
    fontSize: 14,
    marginRight: 10,
  },
});
