import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Image, Animated, ImageBackground } from "react-native";
import icon from "../../../assets/niyoghub_logo_1.png";
import background from "../../../assets/splashbg.gif"; 

export default function SplashScreen() {
  const fadeAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      // in
      Animated.timing(fadeAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      // hold image 
      Animated.delay(1800),
      // out
      Animated.timing(fadeAnimation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnimation]);

  return (
    <ImageBackground source={background} style={styles.background}>
      <View style={styles.container}>
        <Animated.View
          style={[styles.imageContainer, { opacity: fadeAnimation }]}
        >
          <Image style={styles.image} source={icon} />
        </Animated.View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    borderRadius: 20,
    overflow: "hidden",
  },
  image: {
    width: 180,
    height: 180,
    resizeMode: "cover",
  },
});
