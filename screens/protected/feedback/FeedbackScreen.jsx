import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';

const FeedbackScreen = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSendFeedback = () => {
    Alert.alert(`Rating: ${rating}, Comment: ${comment}`);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

      <View style={styles.header}>
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
          numberOfLines={12}
          placeholder="Tell us how we can improve..."
          value={comment}
          onChangeText={(text) => setComment(text)}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSendFeedback}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default FeedbackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 26,
    fontWeight: '400',
    textAlign: 'start',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
  },

  subLabel: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
    marginBottom: 20,
    textAlign: 'start',
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
    fontSize: 16,
    fontWeight: 'bold',
  },
});
