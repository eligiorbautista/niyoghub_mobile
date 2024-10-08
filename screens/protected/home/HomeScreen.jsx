import { ScrollView, View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import React, { useState } from 'react';
import SDGModal from '../../../components/modals/SDGModals';
import { Ionicons } from "@expo/vector-icons";

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

      {/* articles section */}
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

      {/* sdg section */}
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



      {/* updates section */}
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


      {/* announcements section */}
      <Text style={styles.recentTitle}>Recent News & Programs</Text>

      <Text style={styles.announcement}>Announcements</Text>
      <Image source={require('../../../assets/announcement.png')} style={styles.announcementImg} />

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
  announcementImg: {
    width: '100%',
    marginBottom: 50,
    marginTop: 10,
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
  recentTitle: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: 'bold'
  },
});
