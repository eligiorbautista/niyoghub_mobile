import React, { useRef, useState } from 'react';
import { View, Dimensions, Image, StyleSheet, ScrollView, ActivityIndicator, Text } from 'react-native';
import Carousel from "react-native-reanimated-carousel";
import useAnnouncements from "../../../hooks/useAnnouncements";

const { width } = Dimensions.get("window");

const ImageCarousel = () => {
  const { announcements, loading, error } = useAnnouncements();
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
 
  const displayAnnouncements = announcements.slice(0, 3).reverse();

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.carouselSection}>
        <View style={styles.carouselWrapper}>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            <Carousel
              ref={carouselRef}
              width={width}
              height={110}
              data={displayAnnouncements}
              scrollAnimationDuration={1000}
              onSnapToItem={(index) => setCurrentIndex(index)}
              renderItem={({ item }) => (
                <View style={styles.slide}>
                  <Image source={{ uri: `https://niyoghub-server.onrender.com/uploads/images/announcements/${item.image}` }} style={styles.image} />
                </View>
              )}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  carouselSection: {
    alignItems: 'center',
  },
  carouselWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: width,
    height: 150,
    borderRadius: 0,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ImageCarousel;
