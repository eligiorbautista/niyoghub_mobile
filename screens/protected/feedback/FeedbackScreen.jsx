// import React, { useState } from 'react';
// import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
// import { AirbnbRating } from 'react-native-ratings';

// const FeedbackScreen = () => {
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState('');

//   const handleSendFeedback = () => {
//     Alert(`Rating: ${rating}, Comment: ${comment}`);
//   };

//   return (
//     <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

//       <View style={styles.header}>
//         <Text style={styles.headerText}>Feedback</Text>
//       </View>

//       <View style={styles.content}>
//         <Text style={styles.label}>Rate Your Experience</Text>
//         <AirbnbRating
//           count={5}
//           defaultRating={rating}
//           size={30}
//           onFinishRating={setRating}
//           showRating={false}
//         />

//         <Text style={styles.subLabel}>Are you satisfied with the service?</Text>

//         <TextInput
//           style={styles.commentInput}
//           multiline={true}
//           numberOfLines={4}
//           placeholder="Tell us how we can improve..."
//           value={comment}
//           onChangeText={(text) => setComment(text)}
//         />

//         <TouchableOpacity style={styles.submitButton} onPress={handleSendFeedback}>
//           <Text style={styles.submitButtonText}>Submit</Text>
//         </TouchableOpacity>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// export default FeedbackScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F9F9F9',
//     paddingHorizontal: 20,
//   },
//   header: {
//     marginTop: 50,
//     marginBottom: 20,
//   },
//   headerText: {
//     fontSize: 24, 
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   content: {
//     flex: 1,
//     justifyContent: 'flex-start',
//   },
//   label: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 10,
//   },
//   subLabel: {
//     fontSize: 14,
//     color: '#777',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   commentInput: {
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     borderRadius: 10,
//     padding: 15,
//     backgroundColor: '#FFF',
//     textAlignVertical: 'top',
//     fontSize: 16,
//     marginBottom: 20,
//   },
//   submitButton: {
//     backgroundColor: '#007BFF',
//     paddingVertical: 15,
//     borderRadius: 30,
//     alignItems: 'center',
//   },
//   submitButtonText: {
//     color: '#FFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });


import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const FeedbackScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Feedback Screen</Text>
    </View>
  );
};

export default FeedbackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 24,
  },
});
