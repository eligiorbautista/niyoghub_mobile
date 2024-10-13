import { ScrollView, View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import React, { useState } from 'react';
import SDGModal from '../../../components/modals/SDGModals';
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from 'react-native';
import ImageCarousel from './CarouselAnnouncement';

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredContent, setFilteredContent] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSDG, setSelectedSDG] = useState(null);

  const content = [
    { id: 1, category: 'News & Programs', title: 'PCA Embraces Culture of Excellence, Undergoes ISO 9001:2015 Reorientation', date: 'April 24, 2024', time: '3 min read' }
  ];

  const sdgs = [
    { 
      id: 1, 
      title: 'REDUCING POVERTY', 
      description: 'NiyogHub aims to reduce poverty among coconut farmers by providing access to vital information, resources, and government support. To optimize resource utilization, and improve their livelihoods through the use of this platform.', 
      image: require('../../../assets/reducing_poverty.png') 
    },
    { 
      id: 2, 
      title: 'SUSTAINABLE FARMING', 
      description: 'NiyogHub encourages coconut farmers to use sustainable farming methods to increase food security.', 
      image: require('../../../assets/sustainable_farming.png') 
    },
    { 
      id: 3, 
      title: 'ECONOMIC GROWTH', 
      description: 'NiyogHub can promote economic growth by providing timely information, disease detection tools, and sustainable farming practices. It enables farmers to increase their yields and quality of produce, leading to higher incomes.', 
      image: require('../../../assets/economic_growth.png') 
    },
    { 
      id: 4, 
      title: 'TECHNOLOGICAL INNOVATION', 
      description: 'NiyogHub introduces technological solutions to traditional agricultural practices. This platform empowers coconut farmers with innovative tools to enhance their farming techniques and decision-making processes. ', 
      image: require('../../../assets/tech_innovation.png') 
    }
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

  const handlePress = (cardText) => {
    console.log(`${cardText} pressed!`);
  };

  // RECENT NEWS AND PROGRAMS
  const newsData = [
    {
      id: 1,
      category: 'News & Programs',
      date: "April 10, 2024",
      description: "8.5 million coconut seedlings set to be planted in 2024 under the PCA’s Massive Coconut Planting and Replanting Project",
      image: require("../../../assets/newsprograms1.png"),
    },
    {
      id: 2,
      category: 'News & Programs',
      date: "April 8, 2024",
      description: "Updated Copra and wholenut prices in Region - IV.",
      image: require("../../../assets/newsprograms2.png"),
    },
    {
      id: 3, 
      category: 'News & Programs',
      date: "April 3, 2023",
      description: "May Anak ka ba na Kolehiyo? Isali sa CoScho.",
      image: require("../../../assets/newsprograms3.png"),
    },
  ];
  
  const handleReadMore = (newsItem) => {
    navigation.navigate('ReadNewsPrograms', { newsItem }); 
  };
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.greeting}>Hello, User!</Text>
      <Text style={styles.subGreeting}>Have a nice Monday</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* RECENT ARTICLE SECTION */}
      <Text style={styles.recentPost}>Recent post</Text>
      {filteredContent.length > 0 ? (
        filteredContent.map(item => (
          <Pressable style={[]}
            onPress={() => navigation.navigate('Article')}>
            <View key={item.id} style={styles.postContainer}>
              <Image source={require('../../../assets/post.png')} style={styles.postImage} />
              <Text style={styles.postCategory}>{item.category}</Text>
              <Text style={styles.postTitle}>{item.title}</Text>
              <Text style={styles.postMeta}>{`${item.date} - ${item.time}`}</Text>
            </View>
          </Pressable>
        ))
      ) : (
        <Pressable style={[]}
          onPress={() => navigation.navigate('Article')}>
          <View style={styles.postContainer}>
            <Image source={require('../../../assets/post.png')} style={styles.postImage} />
            <Text style={styles.postCategory}>News & Programs</Text>
            <Text style={styles.postTitle}>PCA Embraces Culture of Excellence, Undergoes ISO 9001:2015 Reorientation</Text>
            <Text style={styles.postMeta}>April 24, 2024 - 3 min read</Text>
          </View>
        </Pressable>
      )}

      {/* SDG BUTTONS SECTION */}
      <Text style={styles.sdgTitle}>Four Global SDG's</Text>
      <View style={styles.sdgContainer}>
        {sdgs.map(sdg => (
          <TouchableOpacity key={sdg.id} style={styles.sdgButton} onPress={() => openModal(sdg)}>
            <View style={styles.sdgCard}>
              <Image source={sdg.image} style={styles.sdgImage} />
              <Text style={styles.sdgText}>{sdg.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {modalVisible && (
        <SDGModal
          visible={modalVisible}
          setVisible={setModalVisible}
          selectedSDG={selectedSDG}
        />
      )}

      {/* ANNOUNCEMENT SECTION */}
      <Text style={styles.announcement}>Announcements</Text>
      <SafeAreaView>
        <ImageCarousel />
      </SafeAreaView>

      {/* NEWS AND PROGRAMS */}
      <View style={styles.headerNewsPrograms}>
        <Text style={styles.recentTitle}>Recent News & Programs</Text>
        <Pressable
          style={styles.seeAllButton}
          onPress={() => navigation.navigate('SeeAllNewsPrograms', { newsData })}
        >
          <Text style={styles.seeAllText}>See all news & programs</Text>
        </Pressable>
      </View>
      <View style={styles.containerNewsPrograms}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.scrollContainer}
        >
          {newsData.map((news, index) => (
            <View key={index} style={styles.card}>
              <Image source={news.image} style={styles.image} />
              <Text style={styles.categoryText}>{news.category}</Text>
              <Text style={styles.dateText}>{news.date}</Text>
              <Text style={styles.descriptionText} numberOfLines={3}>{news.description}</Text>
              <Pressable style={styles.readButton}
                onPress={() => handleReadMore(news)}> 
                <Text style={styles.readButtonText}>Read</Text>
              </Pressable>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* UPDATES SECTION */}
      <Text style={styles.updates}>Updates</Text>
      <View style={styles.updatesContainer}>
        <View style={styles.row}>
          <Pressable
            style={[styles.item, styles.intercroppingCard]}
            onPress={() => navigation.navigate('Intercropping')}
          >
            <Image source={require('../../../assets/intercropping.png')} style={styles.intercroppingImage} />
            <Text style={styles.title}>Coconut Intercropping</Text>
            <Text style={styles.description}>
              A multiple cropping practice involving growing two or more crops.
            </Text>
            <Pressable style={styles.knowMoreButton} onPress={() => navigation.navigate('Intercropping')}>
              <Text style={styles.knowMoreText}>Know more</Text>
              <Ionicons name="arrow-forward-outline" size={16} color="black" />
            </Pressable>
          </Pressable>

          <Pressable
            style={[styles.item, styles.priceWatchCard]}
            onPress={() => navigation.navigate('CopraPrice')}
          >
            <Image source={require('../../../assets/copra.png')} style={styles.copraImage} />
            <Text style={styles.title}>Copra Price Watch</Text>
            <Text style={styles.description}>
              Track the daily update of copra and wholenut prices.
            </Text>
            <Pressable style={styles.knowMoreButton} onPress={() => navigation.navigate('CopraPrice')}>
              <Text style={styles.knowMoreText}>Know more</Text>
              <Ionicons name="arrow-forward-outline" size={16} color="black" />
            </Pressable>
          </Pressable>
        </View>
      </View>
      
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  subGreeting: {
    fontSize: 16,
    color: '#777'
  },
  searchInput: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    fontSize: 16
  },
  recentPost: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold'
  },
  postContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    paddingVertical: 10,
  },
  postImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  postCategory: {
    marginTop: 5,
    fontSize: 14,
    color: '#777'
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  postMeta: {
    fontSize: 12,
    color: '#aaa'
  },
  sdgTitle: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: 'bold'
  },
  sdgContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 10,
  },
  sdgButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  sdgCard: {
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
    height: 150,
  },
  sdgImage: {
    width: 60,
    height: 60,
    marginBottom: 10,
    borderRadius: 5,
  },
  sdgText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#537F19',
    textAlign: 'center',
  },
  announcement: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: 'bold'
  },
  updates: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: 'bold'
  },
  updatesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 40,
  },
  item: {
    flex: 1,
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    alignItems: 'flex-start',
    marginHorizontal: 5,
  },
  intercroppingCard: {
    backgroundColor: '#6F9B35',
  },
  priceWatchCard: {
    backgroundColor: '#D2D792',
  },
  icon: {
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  description: {
    fontSize: 14,
    color: 'black',
    marginBottom: 20,
  },
  knowMoreButton: {
    flexDirection: 'row',
    alignItems: 'start',
    backgroundColor: '#F0F0F0',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  knowMoreText: {
    color: '#2C2C2C',
    fontWeight: 'bold',
    marginRight: 5,
  },
  intercroppingImage: {
    width: 60,
    height: 60,
    marginBottom: 10,
    marginTop: 15,
  },
  copraImage: {
    width: 60,
    height: 60,
    marginBottom: 10,
    marginTop: 15,
  },
  headerNewsPrograms: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center', 
  },
  recentTitle: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: 'bold'
  },
  seeAllButton: {
    paddingVertical: 5,
    flexShrink: 1,
  },
  seeAllText: {
    color: 'black',
    fontSize: 12,
    marginTop: 30,
  },
  containerNewsPrograms: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 10,
  },
  scrollContainer: {
    paddingTop: 10,
    paddingHorizontal: 5,
  },
  card: {
    width: 220,
    backgroundColor: 'white',
    borderRadius: 10,
    marginRight: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 3,
    justifyContent: 'space-between',
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 12,
    color: '#666',
  },
  dateText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
    fontWeight: 'bold'
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
