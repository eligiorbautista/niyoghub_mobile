import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

const AboutScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <Image
          source={require("../../../assets/niyoghub_banner_1.png")}
          style={styles.headerImage}
        />

       
          <Ionicons name="settings-outline" size={24} color="#F0F0F0" />
     
      </View>


      {/* about section */}
      <View style={styles.contentContainer}>
        <Image
          source={require('../../../assets/niyoghub_logo_1.png')} 
          style={styles.icon}
        />
        <Text style={styles.title}>ABOUT</Text>
        <Text style={styles.paragraph}>
          NiyogHub's mission is to empower coconut farmers by providing them with essential tools and resources to thrive in their livelihood and farming endeavors. Through our comprehensive web and mobile application, farmers gain access to features such as disease identification, a sustainability guide map, and real-time chat support, enabling informed decision-making and efficient farming practices.
        </Text>
        <Text style={styles.paragraph}>
          Aligned with four key Sustainable Development Goals (SDGs), NiyogHub aims to address the multifaceted challenges faced by coconut farmers. We strive to reduce poverty by providing access to vital information, resources, and government support, thereby optimizing resource utilization and improving livelihoods.
        </Text>
        <Text style={styles.paragraph}>
          Additionally, we promote sustainable farming methods to enhance food security, foster economic growth by offering timely information and tools for disease detection and sustainable practices, and drive technological innovation by introducing modern solutions to traditional agricultural practices, empowering farmers with innovative tools for enhanced productivity and decision-making.
        </Text>
        <Text style={styles.paragraph}>
          Ultimately, NiyogHub aims to enable coconut farmers to thrive by equipping them with the necessary resources and support to succeed in the coconut agriculture industry.
        </Text>
      </View>

      {/* team section */}
      <View style={styles.teamContainer}>
        <Text style={styles.teamTitle}>Our Product Team</Text>
        <View style={styles.teamRow}>
          <View style={styles.teamMember}>
            <Image
              source={{ uri: 'https://www.ui-avatars.com/api/?name=Leonna+Almendras&background=random' }}
              style={styles.avatar}
              resizeMode="cover"
            />
            <Text style={styles.teamName}>Leonna Almendras</Text>
          </View>
          <View style={styles.teamMember}>
            <Image
              source={{ uri: 'https://www.ui-avatars.com/api/?name=Eli+Bautista&background=random' }}
              style={styles.avatar}
              resizeMode="cover"
            />
            <Text style={styles.teamName}>Eli Bautista</Text>
          </View>
          <View style={styles.teamMember}>
            <Image
              source={{ uri: 'https://www.ui-avatars.com/api/?name=Marianne+Bernardo&background=random' }}
              style={styles.avatar}
              resizeMode="cover"
            />
            <Text style={styles.teamName}>Marianne Bernardo</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  /* header */
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
    marginBottom : 10,
  },
  headerImage: {
    width: 150,
    height: 50,
    resizeMode: "contain",
  },

  /* content */
  contentContainer: {
    padding: 20,
    alignItems: 'center',
  },
  icon: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#537F19',
    textAlign: 'center',
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 15,
    textAlign: 'justify',
  },
  teamContainer: {
    padding: 20,
    alignItems: 'center',
  },
  teamTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#537F19',
    marginBottom: 40,
  },
  teamRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    flexWrap: 'wrap',
  },
  teamMember: {
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 20,
    width: screenWidth / 3 - 20,
  },
  avatar: {
    width: screenWidth / 3 - 40,
    height: screenWidth / 3 - 40,
    borderRadius: (screenWidth / 3 - 40) / 2,
    marginBottom: 10,
  },
  teamName: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
});
