import React, { useRef, useState } from 'react';
import { View, Dimensions, Image, StyleSheet, ScrollView } from 'react-native';
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");

const data = [
  {image: require("../../../assets/announcement.png"),},
  {image: require("../../../assets/post.png"),},
  {image: require("../../../assets/announcement.png"),},
  {image: require("../../../assets/post.png"),},
];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null); 

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.carouselSection}>
        <View style={styles.carouselWrapper}>
          <Carousel
            ref={carouselRef} 
            width={width}
            height={110} 
            data={data}
            scrollAnimationDuration={1000}
            onSnapToItem={(index) => setCurrentIndex(index)}
            renderItem={({ index }) => (
              <View style={styles.slide}>
                <Image source={data[index].image} style={styles.image} />
              </View>
            )}
          />
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
    marginTop: 10,
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
    height: 110,   
    borderRadius: 0,
  },
});

export default ImageCarousel;


