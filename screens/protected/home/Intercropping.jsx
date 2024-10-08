import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import React from 'react';
import { Ionicons } from "@expo/vector-icons";
import Carousel from 'react-native-reanimated-carousel';

const { width } = Dimensions.get('window');

const data = [
  {
    title: 'Coffee Varieties',
    description: 'Coffee plants provide shade for young coconut trees...',
    image: require('../../../assets/economic_growth.png')
  },
  {
    title: 'Banana Varieties',
    description: 'Banana plants provide shade for young coconut trees...',
    image: require('../../../assets/economic_growth.png')
  },
  // Add more data items for other slides
];

const IntercroppingScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
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

      <View style={styles.imageContainer}>
        <Image
          source={require("../../../assets/intercroppingbg.png")}
          style={styles.interImage}
        />
        <Text style={styles.imageText}>COCONUT {'\n'} INTERCROPPING</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.sectionHeader}>Coconut Based Farming Systems</Text>
        <Text style={styles.sectionText}>
          • A system or practice in coconut production{'\n'}
          • All available farm resources like soil, water, farm labor, agricultural inputs are utilized and optimized{'\n'}
          • Production of food and non-food products{'\n'}
        </Text>

        <Text style={styles.sectionHeader}>Important Considerations</Text>
        <Text style={styles.sectionText}>
          • Suitable environmental conditions{'\n'}
          • Right technology (package of viable technologies){'\n'}
          • Available planting materials{'\n'}
          • Favorable market of farm produce{'\n'}
          • Available working capital{'\n'}
          • Timely extension service{'\n'}
          • Human capital endowment: skills/capacities and attitudes{'\n'}
        </Text>
      </View>

      <View style={styles.imgSection}>
        <Image
            source={require("../../../assets/solar_radiation.png")}
            style={styles.solarImage}
        />
        <Text style={styles.solarText}>On average, 56% of solar radiation reaches the ground (may vary with age of the stand)</Text>
        <Image
            source={require("../../../assets/root_system.png")}
            style={styles.rootImage}
        />
        <Text style={styles.rootText}>80% of active root system is located n 25-60 cm soil layer in a 2 m radius, leaving 70-75% for intercropping</Text>
      </View>

      <View style={styles.factorSection}>
        <Text style={styles.factorText}>MAIN FACTORS AFFECTING COCONUT PRODUCTION & QUALITY</Text>
        <Text style={styles.factorItem}>1. Environment or site selection</Text>
        <Text style={styles.factorItem}>2. Variety or species selection</Text>
        <Text style={styles.factorItem}>3. Management</Text>
      </View>

      <View style={styles.carouselSection}>
        <Text style={styles.carouselText}>RECOMMENDED INTERCROPS</Text>
          <Carousel
          width={width}
          height={400}
          data={data}
          scrollAnimationDuration={1000}
          renderItem={({ index }) => (
            <View style={styles.slide}>
              <Image source={data[index].image} style={styles.image} />
              <Text style={styles.title}>{data[index].title}</Text>
              <Text style={styles.description}>{data[index].description}</Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default IntercroppingScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
    flex: 1,
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
  imageContainer: {
    position: 'relative',
  },
  interImage: {
    width: '100%',
    height: 190,
  },
  imageText: {
    position: 'absolute',
    bottom: 35,
    left: 20,
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  infoContainer: {
    position: 'relative',
    backgroundColor: 'white',
    paddingHorizontal: 40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30, 
    marginTop: -20, 
    paddingTop: 50,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#006400',
  },
  sectionText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
    marginBottom: 10,
  },
  imgSection: {
    backgroundColor: '#EAEAEA',
    width: '80%',
    height: 750,
    marginHorizontal: 40,
    alignItems: 'center',
    marginBottom: 10,
  },
  solarImage: {
    width: '50%',
    height: 200,
    margin: 10,
    marginTop: 20,
  },
  solarText: {
    padding: 20,
    margin: 20,
    alignItems: 'center',
    backgroundColor: '#90B74B',
    color: 'white',
    fontSize: 16,
  },
  rootImage: {
    width: '60%',
    height: 200,
    margin: 10,
    marginTop: 10,
  },
  rootText: {
    padding: 20,
    margin: 20,
    alignItems: 'center',
    backgroundColor: '#90B74B',
    color: 'white',
    fontSize: 16,
  },
  factorSection: {
    marginHorizontal: 40,
    alignItems: 'center',
    textAlign: 'center',
    marginVertical: 20,
  },
  factorText: {
    fontSize: 18,
    color: '#537F19',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  factorItem: {
    fontSize: 16,
    backgroundColor: '#949494',
    width: '100%',
    paddingHorizontal: 50,
    marginBottom: 14,
    paddingVertical: 10,
    borderRadius: 20,
    color: 'white',
  },
  carouselSection: {
    alignItems: 'center',
  },
  carouselText: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 10,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9ccc65',
    padding: 20,
    marginHorizontal: 40,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
  },
});

