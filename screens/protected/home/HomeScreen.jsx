import { FlatList, View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Pressable, SafeAreaView } from 'react-native';
import React, { useState, useContext } from 'react';
import SDGModal from '../../../components/modals/SDGModals';
import { Ionicons } from "@expo/vector-icons";
import ImageCarousel from './CarouselAnnouncement';
import { AuthContext } from '../../../contexts/AuthContext';

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredContent, setFilteredContent] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSDG, setSelectedSDG] = useState(null);
  const { user } = useContext(AuthContext);

  const content = [
    { id: 1, category: 'News & Programs', title: 'PCA Embraces Culture of Excellence, Undergoes ISO 9001:2015 Reorientation', date: 'April 24, 2024', time: '3 min read' }
  ];

  const sdgs = [
    { id: 1, title: 'REDUCING POVERTY', description: 'NiyogHub aims to reduce poverty among coconut farmers...', image: require('../../../assets/reducing_poverty.png') },
    { id: 2, title: 'SUSTAINABLE FARMING', description: 'NiyogHub encourages coconut farmers to use sustainable farming methods...', image: require('../../../assets/sustainable_farming.png') },
    { id: 3, title: 'ECONOMIC GROWTH', description: 'NiyogHub can promote economic growth by providing timely information...', image: require('../../../assets/economic_growth.png') },
    { id: 4, title: 'TECHNOLOGICAL INNOVATION', description: 'NiyogHub introduces technological solutions to traditional agricultural practices...', image: require('../../../assets/tech_innovation.png') }
  ];

  const newsData = [
    { id: 1, category: 'News & Programs', date: "April 10, 2024", description: "8.5 million coconut seedlings set to be planted...", image: require("../../../assets/newsprograms1.png") },
    { id: 2, category: 'News & Programs', date: "April 8, 2024", description: "Updated Copra and wholenut prices in Region - IV.", image: require("../../../assets/newsprograms2.png") },
    { id: 3, category: 'News & Programs', date: "April 3, 2023", description: "May Anak ka ba na Kolehiyo? Isali sa CoScho.", image: require("../../../assets/newsprograms3.png") },
    { id: 4, category: 'News & Programs', date: "April 10, 2024", description: "8.5 million coconut seedlings set to be planted...", image: require("../../../assets/newsprograms1.png") },
    { id: 5, category: 'News & Programs', date: "April 8, 2024", description: "Updated Copra and wholenut prices in Region - IV.", image: require("../../../assets/newsprograms2.png") },
    { id: 6, category: 'News & Programs', date: "April 3, 2023", description: "May Anak ka ba na Kolehiyo? Isali sa CoScho.", image: require("../../../assets/newsprograms3.png") },
    { id: 7, category: 'News & Programs', date: "April 10, 2024", description: "8.5 million coconut seedlings set to be planted...", image: require("../../../assets/newsprograms1.png") },
    { id: 8, category: 'News & Programs', date: "April 8, 2024", description: "Updated Copra and wholenut prices in Region - IV.", image: require("../../../assets/newsprograms2.png") },
    { id: 9, category: 'News & Programs', date: "April 3, 2023", description: "May Anak ka ba na Kolehiyo? Isali sa CoScho.", image: require("../../../assets/newsprograms3.png") }
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = content.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
    setFilteredContent(filtered);
  };

  const openModal = (sdg) => {
    setSelectedSDG(sdg);
    setModalVisible(true);
  };

  const handleReadMore = (newsItem) => {
    navigation.navigate('ReadNewsPrograms', { newsItem });
  };

  const getCurrentDay = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDay = new Date().getDay();
    return days[currentDay];
  };

  const renderNewsItem = ({ item }) => (
    <Pressable onPress={() => handleReadMore(item)} style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.categoryText}>{item.category}</Text>
      <Text style={styles.dateText}>{item.date}</Text>
      <Text style={styles.descriptionText} numberOfLines={3}>{item.description}</Text>

      <Pressable style={styles.readButton} onPress={() => handleReadMore(item)}>
        <Text style={styles.readButtonText}>Read More</Text>
        <Ionicons name="arrow-forward" size={16} color="#537F19" style={styles.readButtonIcon} />
      </Pressable>
    </Pressable>
  );

  const renderHeader = () => (
    <View>
      <Text style={styles.greeting}>Hello, {user?.fullName || 'Guest'}</Text>
      <Text style={styles.subGreeting}>Have a nice {getCurrentDay()}</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* Newest Posts Section */}
      <Text style={styles.sectionTitle}>Newest Posts</Text>
    </View>
  );

  const renderFooter = () => (
    <View>
      {/* SDG Buttons Section */}
      <Text style={styles.sectionTitle}>Four Global SDGs</Text>
      <FlatList
        data={sdgs}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.sdgButton} onPress={() => openModal(item)}>
            <View style={styles.sdgCard}>
              <Image source={item.image} style={styles.sdgImage} />
              <Text style={styles.sdgText}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Announcement Section */}
      <Text style={styles.sectionTitle}>Announcements</Text>
      <ImageCarousel />

      {/* News and Programs Section */}
      <View style={styles.headerNewsPrograms}>
        <Text style={styles.sectionTitle}>News & Programs</Text>
        <Pressable onPress={() => navigation.navigate('SeeAllNewsPrograms', { newsData })}>
          <View style={{ flex: 1, flexDirection: 'row', marginTop: 32 }} >
            <Text style={styles.seeAllText}>See all</Text>
            <Ionicons
              style={{ marginTop: 2 }}
              name="chevron-forward-outline"
              size={18}
              color='rgba(83, 127, 25, 0.8)'
            />
          </View>
        </Pressable>
      </View>
      <FlatList
        data={newsData}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderNewsItem}
      />

      {/* Updates Section */}
      <Text style={styles.sectionTitle}>Updates</Text>
      <View style={styles.updatesContainer}>
        <Pressable style={[styles.updateCard, styles.intercroppingCard]} onPress={() => navigation.navigate('Intercropping')}>
          <Image source={require('../../../assets/intercropping.png')} style={styles.intercroppingImage} />
          <Text style={styles.title}>Coconut Intercropping</Text>
          <Text style={styles.description}>A multiple cropping practice involving growing two or more crops.</Text>
          <Pressable style={styles.knowMoreButton}>
            <Text style={styles.knowMoreText}>Know more</Text>
            <Ionicons name="arrow-forward-outline" size={16} color="#537F19" />
          </Pressable>
        </Pressable>
        <Pressable style={[styles.updateCard, styles.priceWatchCard]} onPress={() => navigation.navigate('CopraPrice')}>
          <Image source={require('../../../assets/copra.png')} style={styles.copraImage} />
          <Text style={styles.title}>Copra Price Watch</Text>
          <Text style={styles.description}>Track the daily update of copra and wholenut prices.</Text>
          <Pressable style={styles.knowMoreButton}>
            <Text style={styles.knowMoreText}>Know more</Text>
            <Ionicons name="arrow-forward-outline" size={16} color="#537F19" />
          </Pressable>
        </Pressable>
      </View>

      {modalVisible && (
        <SDGModal
          visible={modalVisible}
          setVisible={setModalVisible}
          selectedSDG={selectedSDG}
        />
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredContent.length > 0 ? filteredContent : content}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable style={styles.postContainer} onPress={() => navigation.navigate('Article')}>
            <Image source={require('../../../assets/post.png')} style={styles.postImage} />
            <Text style={styles.postCategory}>{item.category}</Text>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text style={styles.postMeta}>{`${item.date} - ${item.time}`}</Text>
          </Pressable>
        )}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subGreeting: {
    fontSize: 16,
    color: '#777',
  },
  searchInput: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    fontSize: 16,
  },
  sectionTitle: {
    marginTop: 30,
    marginBottom: 12,
    fontSize: 18,
    fontWeight: 'bold',
  },
  postContainer: {
    marginTop: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
    marginBottom: 20,
  },
  postImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  postCategory: {
    marginTop: 5,
    fontSize: 14,
    color: '#777',
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postMeta: {
    fontSize: 12,
    color: '#aaa',
  },
  sdgButton: {
    marginHorizontal: 5,
  },
  sdgCard: {
    width: 150,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
  },
  sdgImage: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  sdgText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#699F21',
  },
  headerNewsPrograms: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  seeAllText: {
    fontSize: 16,
    color: '#699F21',
    fontWeight: 'bold'
  },
  card: {
    width: 220,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginRight: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  dateText: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
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
  updatesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  updateCard: {
    flex: 1,
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  intercroppingCard: {
    backgroundColor: '#6F9B35',
  },
  priceWatchCard: {
    backgroundColor: '#D2D792',
  },
  intercroppingImage: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  copraImage: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginVertical: 10,
  },
  knowMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  knowMoreText: {
    color: '#699F21',
    fontWeight: 'bold',
    marginRight: 5,
  },
});
