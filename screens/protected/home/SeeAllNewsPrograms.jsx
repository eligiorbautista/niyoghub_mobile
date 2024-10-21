import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Pressable } from 'react-native';
import React from 'react';
import { Ionicons } from "@expo/vector-icons";
import useArticles from '../../../hooks/useArticles';
import moment from 'moment';

const SeeAllNewsProgramsScreen = ({ navigation }) => {
  const { articles, loading, error, fetchArticles } = useArticles();

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
      <Image
        source={{ uri: `https://niyoghub-server.onrender.com/uploads/images/${item.image}` }}
        style={styles.newsImage}
      />
      <View style={styles.textContainer}>

      <Text style={styles.categoryText}>News & Programs</Text>
        <Text style={styles.titleText} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.descriptionText} numberOfLines={3}>
          {item.subtitle}
        </Text>
        <Text style={styles.dateText}>{moment(item.createdAt).format('MMMM D, YYYY')}</Text>
        <Pressable style={styles.readButton} onPress={() => navigation.navigate('ReadNewsPrograms', { newsItem: item })}>
          <Text style={styles.readButtonText}>Read More</Text>
          <Ionicons name="arrow-forward-circle-outline" size={16} color="#537F19" style={styles.readButtonIcon} />
        </Pressable>
      </View>
    </Pressable>
  );

  return (
    <FlatList
      data={articles}
      keyExtractor={(item) => item._id}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
      contentContainerStyle={styles.container}
      ListEmptyComponent={!loading && !articles.length && <Text style={styles.emptyText}>No articles available.</Text>}
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
    width: 130,
    height: "auto",
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
    backgroundColor: 'transparent',
    borderRadius: 25,
    paddingVertical: 8,
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
  emptyText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
    marginTop: 20,
  }, titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
});
