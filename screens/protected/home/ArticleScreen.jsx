import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Share } from 'react-native';
import React from 'react';
import { Ionicons } from "@expo/vector-icons";

const ArticleScreen = ({ navigation }) => {

  // Share functionality
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'You might find this article from NiyogHub worth sharing.', 
        url: 'https://example.com/article', // link nung mismong article dito
        title: 'PCA Embraces Culture of Excellence'
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      {/* Header */}
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

      {/* Article Content */}
      <ScrollView style={styles.container}>
        <View style={styles.postContainer}>
          <Image source={require('../../../assets/post.png')} style={styles.postImage} />
          <Text style={styles.postCategory}>News & Programs</Text>
          <Text style={styles.postMeta}>April 24, 2024 - 3 min read</Text>
          <Text style={styles.postTitle}>
            PCA Embraces Culture of Excellence, Undergoes ISO 9001:2015 Reorientation
          </Text>

          {/* Main Article Text */}
          <Text style={styles.content}>
            In its quest for quality service delivery, the employees of the Philippine Coconut Authority underwent a reorientation workshop on ISO 9001:2015-Quality Management System on April 18-19, 2024.
          </Text>

          <Text style={styles.content}>
            To harmonize with President Ferdinand E. Marcos’ initiatives on quality management, PCA Administrator Dr. Dexter R. Buted led the orientation workshop to enhance the agency’s quality management system along with its plan to undergo ISO Certification.
          </Text>

          <Text style={styles.content}>
            The activity was participated by PCA employees, primarily targeting the process owners of their respective units, who are expected to effectively implement the insights gained to boost operations and services management.
          </Text>

          {/* Share Button */}
          <TouchableOpacity style={styles.shareButton} onPress={onShare}>
            <Text style={styles.shareButtonText}>Share Article</Text>
            <Ionicons name="share-social-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default ArticleScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 15,
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
  postContainer: {
    paddingVertical: 20,
  },
  postImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 15,
  },
  postCategory: {
    fontSize: 16,
    color: 'black',
    marginBottom: 5,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  postMeta: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  shareButton: {
    flexDirection: 'row',
    backgroundColor: '#537F19',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  shareButtonText: {
    color: 'white',
    fontSize: 14,
    marginRight: 10,
  },
});
