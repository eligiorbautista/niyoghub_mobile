import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const FAQScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>

          <Image
            source={require('../../../assets/niyoghub_banner_1.png')}
            style={styles.headerImage}
          />

          <TouchableOpacity>
            <Ionicons name="information-circle-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.text}>FAQ Screen</Text>
    </View>
  );
};

export default FAQScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 24,
  },

  /* header */
  headerContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingTop: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  headerImage: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
});
