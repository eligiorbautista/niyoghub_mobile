// import React, { useRef, useState } from 'react';
// import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, Modal } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// const ChatModal = ({ navigation }) => {
//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//     >
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={24} color="black" />
//         </TouchableOpacity>

//         <Image
//           source={require('../../assets/niyoghub_banner_1.png')}
//           style={styles.headerImage}
//         />

//         <TouchableOpacity onPress={handleInfoDialog}>
//           <Ionicons name="information-circle-outline" size={24} color="black" />
//         </TouchableOpacity>
//       </View>

//       <Text style={styles.title}>OTP Verification</Text>
//       <Text style={styles.subtitle}>
//         Please enter the One-Time Password (OTP) sent to your email or mobile number.
//       </Text>

//       {/* OTP input boxes */}
//       <View style={styles.otpContainer}>
//         {Array(6).fill().map((_, index) => (
//           <TextInput
//             key={index}
//             ref={otpRefs[index]}
//             style={styles.otpInput}
//             maxLength={1}
//             keyboardType="number-pad"
//             value={otp[index]} // controlled input for each digit
//             onChangeText={(value) => handleOTPChange(value, index)}
//           />
//         ))}
//       </View>

//       <View style={styles.resendContainer}>
//         <Text>Didn't get the code? </Text>
//         <TouchableOpacity>
//           <Text style={styles.resendText}>Resend Code</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.signInRow}>
//         <Text style={styles.link}>Already have an account? </Text>
//         <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//           <Text style={styles.signInText}>Sign In</Text>
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOTP}>
//         <Text style={styles.verifyButtonText}>Verify</Text>
//       </TouchableOpacity>

//       {/* modal */}
//       <Modal
//         animationType="fade"
//         transparent={true}
//         visible={isModalVisible}
//         onRequestClose={closeModal}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>What is an OTP?</Text>
//             <Text style={styles.modalText}>
//               An OTP (One-Time Password) is a temporary code sent to your email or phone. It is used
//               to verify your identity when logging in or completing a transaction. Each OTP can only
//               be used once and usually expires after a short period of time.
//             </Text>
//             <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
//               <Text style={styles.modalButtonText}>Got it!</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </KeyboardAvoidingView>
//   );
// };

// export default ChatModal;
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Modal } from 'react-native';

const ChatModal = ({ visible, onClose }) => { 
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose} 
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>WHAT IS REAL TIME CHAT SUPPORT?</Text>
          <Text style={styles.subTitle}>Last Updated December 2024</Text>
          <View style={styles.divider} />
          <Text style={styles.modalTextTitle}>
            Initiate the Chat:
          </Text>
          <Text style={styles.modalText}>
            Click on the chat option to start the conversation. You might need to provide some basic information like your name or email address.
          </Text>
          <Text style={styles.modalTextTitle}>
            Describe your Issue:
          </Text>
          <Text style={styles.modalText}>
            Once connected, briefly describe your issue or question. Be as clear and detailed as possible to help the support agent understand your problem.
          </Text>
          <Text style={styles.modalTextTitle}>
            Be Patient and Responsive:
          </Text>
          <Text style={styles.modalText}>
            Chat support can sometimes take a few moments between responses. Be patient and stay engaged in the conversation to ensure a quick resolution.
          </Text>
          <Text style={styles.modalTextTitle}>
            End the Chat:
          </Text>
          <Text style={styles.modalText}>
            Once your issue is resolved or you have all the information you need, thank the support agent and end the chat session.
          </Text>
          <TouchableOpacity style={styles.modalButton} onPress={onClose}>
            <Text style={styles.modalButtonText}>I understand</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ChatModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'start',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'start',
    marginTop: 20,
  },
  modalTextTitle: {
    fontSize: 14,
    textAlign: 'start',
    marginBottom: 0,
    fontWeight: 'bold',
  }, 
  subTitle: {
    fontSize: 13,
    textAlign: 'start',
    marginBottom: 8,
    color: '#666',
    lineHeight: 22,
  },
  modalText: {
    fontSize: 14,
    textAlign: 'start',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#537F19',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderRadius: 4,
    marginBottom: 16,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  divider: {
    borderTopWidth: 1, 
    borderColor: '#d1d5db', 
    marginVertical: 12, 
    backgroundColor: 'black',
  },
});