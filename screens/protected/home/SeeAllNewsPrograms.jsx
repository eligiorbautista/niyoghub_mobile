import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Pressable, TextInput, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from "@expo/vector-icons";
import useArticles from '../../../hooks/useArticles';
import moment from 'moment';

const SeeAllNewsProgramsScreen = ({ navigation }) => {
  const { articles, loading, error, fetchArticles } = useArticles();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const articlesPerPage = 10;

  
  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // index range of the articles to display for the current page
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

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

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <Ionicons name="search-outline" size={20} color="#888" style={styles.searchIcon} />
      <TextInput
        style={styles.searchInput}
        placeholder="Search articles"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        placeholderTextColor="#aaa"
      />
      {searchQuery.length > 0 && (
        <TouchableOpacity onPress={() => setSearchQuery('')}>
          <Ionicons name="close-circle" size={20} color="#888" style={styles.clearIcon} />
        </TouchableOpacity>
      )}
    </View>
  );

  const renderItem = (item) => (
    <Pressable
      key={item._id}
      style={styles.articleContainer}
      onPress={() => navigation.navigate('ReadNewsPrograms', { newsItem: item })}
    >
      <Image
        source={{ uri: `https://niyoghub-server.onrender.com/uploads/images/articles/${item.image}` }}
        style={styles.newsImage}
      />
      <View style={styles.textContainer}>
        <Text style={styles.articleCategory}>News & Programs</Text>
        <Text style={styles.articleTitle} numberOfLines={2} ellipsizeMode="tail">{item.title}</Text>
        <Text style={styles.articleSubtitle} numberOfLines={2} ellipsizeMode="tail">
          {item.subtitle}
        </Text>
        <View style={styles.footerContainer}>
          <Text style={styles.dateText}>{moment(item.createdAt).format('MMMM D, YYYY')}</Text>
          <Pressable style={styles.readButton} onPress={() => navigation.navigate('ReadNewsPrograms', { newsItem: item })}>
            <Text style={styles.readButtonText}>Read More</Text>
            <Ionicons name="arrow-forward-circle-outline" size={16} color="#537F19" style={styles.readButtonIcon} />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );

  const handleNextPage = () => {
    if (currentPage * articlesPerPage < filteredArticles.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {renderSearchBar()}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#537F19" />
            <Text style={styles.loadingText}>Loading articles...</Text>
          </View>
        ) : paginatedArticles.length ? (
          paginatedArticles.reverse().map((item) => renderItem(item))
        ) : (
          <Text style={styles.emptyText}>No articles available.</Text>
        )}
        {/* pagination */}
        {filteredArticles.length > articlesPerPage && (
          <View style={styles.paginationContainer}>
            <TouchableOpacity
              style={[styles.paginationButton, currentPage === 1 && styles.disabledButton]}
              onPress={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <Ionicons name="chevron-back-outline" size={18} color="#000" />
            </TouchableOpacity>
            <View style={styles.pageIndicator}>
              <Text style={styles.pageNumberText}>Page {currentPage} of {Math.ceil(filteredArticles.length / articlesPerPage)}</Text>
            </View>
            <TouchableOpacity
              style={[styles.paginationButton, currentPage * articlesPerPage >= filteredArticles.length && styles.disabledButton]}
              onPress={handleNextPage}
              disabled={currentPage * articlesPerPage >= filteredArticles.length}
            >
              <Ionicons name="chevron-forward-outline" size={18} color="#000" />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default SeeAllNewsProgramsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    paddingBottom: 0,
    paddingBottom: 10,
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    height: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  searchIcon: {
    marginRight: 8,
  },
  clearIcon: {
    marginLeft: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
    color: '#333',
  },
  articleContainer: {
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
    height: 130,
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
  articleCategory: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#537F19',
    marginBottom: 2,
  },
  dateText: {
    fontSize: 9,
    color: '#666',
    marginBottom: 0,
  },
  articleSubtitle: {
    fontSize: 11,
    color: '#333',
    marginBottom: 2,
  },
  readButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 25,
    paddingVertical: 8,
  },
  readButtonText: {
    color: '#537F19',
    fontSize: 11,
    fontWeight: 'bold',
    marginRight: 5,
  },
  readButtonIcon: {
    marginLeft: 5,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 13,
    marginTop: 20,
  },
  articleTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  paginationButton: {
    padding: 10,
    backgroundColor: 'transparent',
    borderRadius: 0,
    marginHorizontal: 15,
    elevation: 0,
    shadowColor: 'transparent',
  },
  pageIndicator: {
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  pageNumberText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  disabledButton: {
    backgroundColor: 'transparent',
    color: '#ccc',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#537F19',
  },
});
