import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.faqItem}>
      <TouchableOpacity
        style={styles.faqHeader}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={styles.questionText}>{question}</Text>
        <Ionicons
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={24}
          color="black"
        />
      </TouchableOpacity>
      {isOpen && <Text style={styles.answerText}>{answer}</Text>}
    </View>
  );
};

const FAQScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
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
      <Text style={styles.title}>Frequently asked questions</Text>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* faq Items */}
        <FAQItem
          question="How do I reset my password?"
          answer="Go to Settings, then choose 'Account', and tap on 'Password Reset'. Follow the steps to change your password."
        />
        <FAQItem
          question="What should I do if the app isn't working?"
          answer="If the app is not working, please tell us through the 'Help' section in the app. Give as much detail as you can about what’s wrong."
        />
        <FAQItem
          question="Can I contact customer support from the app?"
          answer="Yes, you can message us directly in the app or call us through the 'Contact Us' page."
        />
        <FAQItem
          question="Can I use the app on more than one device?"
          answer="Yes, you can log into your account on different devices at the same time."
        />
      </ScrollView>
    </View>
  );
};

export default FAQScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginTop: 20,
    marginBottom: 20,
    textAlign: "start",
    paddingHorizontal: 20,
  },
  /* faq item */
  faqItem: {
    marginBottom: 10,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    padding: 10,
  },

  faqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  questionText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    paddingRight: 10,
  },
  answerText: {
    marginTop: 10,
    fontSize: 14,
    color: "#555",
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
    // paddingTop: 30,
  },
  headerImage: {
    width: 150,
    height: 50,
    resizeMode: "contain",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
