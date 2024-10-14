import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform, 
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ThankYouModal from "../../../components/feedback/ThankYouModal";
import FeedbackInfoModal from "../../../components/feedback/FeedbackInfoModal";

const StarRating = ({ maxStars = 5, rating, onRatingChange }) => {
  return (
    <View style={{ flexDirection: "row", marginBottom: 20 }}>
      {Array(maxStars)
        .fill(0)
        .map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onRatingChange(index + 1)}
          >
            <Ionicons
              name={index < rating ? "star" : "star-outline"}
              size={35}
              color={index < rating ? "#537F19" : "#CCC"}
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>
        ))}
    </View>
  );
};

const FeedbackScreen = ({ navigation }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [isInfoModalVisible, setInfoModalVisible] = useState(false);

  const handleSendFeedback = () => {
    setModalVisible(true);
    setRating(0);
    setComment("");
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>

          <Image
            source={require("../../../assets/niyoghub_banner_1.png")}
            style={styles.headerImage}
          />

          <TouchableOpacity onPress={() => setInfoModalVisible(true)}>
            <Ionicons
              name="information-circle-outline"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>

        {/* feedback section */}
        <View style={styles.headerTextContainer}>
          <Text style={styles.title}>Feedback</Text>
          <Text style={styles.headerText}>Rate Your Experience</Text>
        </View>
        <Text style={styles.subLabel}>
          Are you satisfied with your experience?
        </Text>

        <View style={styles.content}>
          <View style={styles.ratingContainer}>
            <StarRating rating={rating} onRatingChange={setRating} />
          </View>

          <TextInput
            style={styles.commentInput}
            multiline={true}
            numberOfLines={8}
            placeholder="Tell us how we can improve..."
            value={comment}
            onChangeText={setComment}
          />

          <TouchableOpacity
            style={[styles.submitButton, { opacity: rating ? 1 : 0.5 }]}
            onPress={handleSendFeedback}
            disabled={!rating}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>

        {/* modals */}
        <ThankYouModal visible={isModalVisible} onClose={closeModal} />
        <FeedbackInfoModal
          isVisible={isInfoModalVisible}
          onClose={() => setInfoModalVisible(false)}
        />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default FeedbackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
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
    marginTop: 0,
  },
  headerImage: {
    width: 150,
    height: 50,
    resizeMode: "contain",
  },
  /* content */
  headerTextContainer: {
    marginTop: 20,
    marginBottom: 10,

    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 26,
    fontWeight: "400",
    textAlign: "start",
  },
  subLabel: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
    marginBottom: 20,
    textAlign: "start",

    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    textAlign: "start",
    marginBottom: 4,
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",

    paddingHorizontal: 20,
  },
  ratingContainer: {
    alignItems: "flex-start",
    marginBottom: 20,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 6,
    padding: 15,
    backgroundColor: "#FFF",
    textAlignVertical: "top",
    fontSize: 14,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "#537F19",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});
