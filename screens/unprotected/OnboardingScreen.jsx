import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, ScrollView } from 'react-native';

const OnboardingScreen = ({ navigation }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    return (
        <View style={styles.container}>
            <Image
                source={require("../../assets/niyoghub_logo_2.png")}
                style={styles.image}
            />

            <Text style={styles.title}>WELCOME TO</Text>
            <Text style={styles.appName}>NiyogHub</Text>
            <Text style={styles.slogan}>Cultivating Connections, Harvesting Solutions</Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.getStartedButton} onPress={() => navigation.navigate('Registration')}>
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.signInButton} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.signInButtonText}>Sign In</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.termsText}>
                By continuing you agree to our{' '}
                <Text style={styles.termsLink} onPress={toggleModal}>Terms & Privacy Policy</Text>
            </Text>

            {/* modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={toggleModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Terms & Privacy Policy</Text>
                        <Text style={styles.lastUpdatedText}>Last updated: October 1, 2024</Text>
                        <View style={styles.divider} />
                        <ScrollView>
                            <Text style={styles.modalText}>
                                The version provided for the terms and conditions and privacy policy aligns closely with the principles and requirements outlined in the Philippines' Data Privacy Act of 2012. This legislation establishes guidelines for protecting personal data and sets standards for how organizations handle and process such information. By adhering to these principles, NiyogHub demonstrates its commitment to safeguarding the privacy and security of user data.
                            </Text>

                            <Text style={styles.modalText}>
                                Through robust data collection, storage, and processing practices outlined in the privacy policy, NiyogHub ensures that user information is handled responsibly and in accordance with legal requirements. This includes measures to protect against unauthorized access, data breaches, and misuse of personal information.
                            </Text>

                            <Text style={styles.modalText}>
                                By implementing these safeguards, NiyogHub aims to build trust and confidence among its users, assuring them that their privacy is respected and their data is handled with the utmost care. This commitment to privacy protection underscores NiyogHub's dedication to providing a secure and reliable platform for coconut farmers and stakeholders to access valuable agricultural resources and tools.
                            </Text>

                            <Text style={styles.modalText}>
                                This Privacy Policy may be updated from time to time, and therefore, we ask you to check back periodically for the latest version of the Privacy Policy, as indicated below. If there are any significant changes made to the use of your personal data in a manner different from that stated at the time of collection, we will notify you by posting a notice on our platform or by other means.
                            </Text>
                        </ScrollView>

                        <View style={styles.modalButtonContainer}>

                            <TouchableOpacity style={styles.acceptButton} onPress={() => toggleModal()}>
                                <Text style={styles.acceptButtonText}>Accept</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.declineButton} onPress={() => toggleModal()}>
                                <Text style={styles.declineButtonText}>Decline</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
    },
    image: {
        width: 180,
        height: 180,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    title: {
        fontSize: 16,
        color: '#537F19',
        letterSpacing: 1,
        fontWeight: 'bold',
    },
    appName: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    },
    slogan: {
        fontSize: 14,
        color: '#7F7F7F',
        textAlign: 'center',
        marginBottom: 40,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },
    getStartedButton: {
        backgroundColor: '#537F19',
        paddingVertical: 12,
        borderRadius: 25,
        marginBottom: 20,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
    signInButton: {
        paddingVertical: 12,
        borderRadius: 25,
        borderColor: '#537F19',
        borderWidth: 1,
        width: '100%',
        alignItems: 'center',
    },
    signInButtonText: {
        color: '#537F19',
        fontSize: 14,
        fontWeight: 'bold',
    },
    termsText: {
        fontSize: 12,
        color: '#7F7F7F',
        textAlign: 'center',
        marginTop: 20,
    },
    termsLink: {
        color: '#537F19',
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '90%',
    },
    iconContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    divider: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginVertical: 10,
    },
    modalText: {
        fontSize: 14,
        marginBottom: 10,
        color: '#333',
    },
    lastUpdatedText: {
        fontSize: 12,
        color: '#7F7F7F',
        textAlign: 'start',
    },
    closeButton: {
        backgroundColor: '#537F19',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    closeButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    declineButton: {
        paddingVertical: 12,
        borderRadius: 25,
        borderColor: '#537F19',
        borderWidth: 1,
        paddingVertical: 10,
        flex: 1,
        marginLeft: 10,
    },
    acceptButton: {
        backgroundColor: '#537F19',
        paddingVertical: 12,
        borderRadius: 25,
        flex: 1,
    },
    declineButtonText: {
        color: '#537F19',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    acceptButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center',
    },

});
