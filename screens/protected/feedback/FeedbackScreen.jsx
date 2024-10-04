import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { Ionicons } from '@expo/vector-icons';

const FeedbackScreen = ({ navigation }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSendFeedback = () => {
    Alert.alert('Thank you for your feedback!', `Rating: ${rating}, Comment: ${comment}`);
    // Reset fields
    setRating(0);
    setComment('');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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

        {/* feedback section */}
        <View style={styles.headerTextContainer}>
          <Text style={styles.title}>Feedback</Text>
          <Text style={styles.headerText}>Rate Your Experience</Text>
        </View>
        <Text style={styles.subLabel}>Are you satisfied with your experience?</Text>

        <View style={styles.content}>
          <View style={styles.ratingContainer}>
            <AirbnbRating
              count={5}
              defaultRating={rating}
              size={35}
              onFinishRating={setRating}
              showRating={false}
            />
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
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default FeedbackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 20,
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

  /* content */
  headerTextContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 26,
    fontWeight: '400',
    textAlign: 'start',
  },
  subLabel: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
    marginBottom: 20,
    textAlign: 'start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#537F19',
    textAlign: 'start',
    marginBottom: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  ratingContainer: {
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 6,
    padding: 15,
    backgroundColor: '#FFF',
    textAlignVertical: 'top',
    fontSize: 14,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#537F19',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
