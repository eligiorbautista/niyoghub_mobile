import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import TermsPrivacyPolicyModal from '../../../components/modals/TermsAndPrivacyPolicyModal';

const OnboardingScreen = ({ navigation }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    return (
        <View style={styles.container}>
            <Image
                source={require("../../../assets/niyoghub_logo_2.png")}
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

            {/* Modal component */}
            <TermsPrivacyPolicyModal isVisible={isModalVisible} onClose={toggleModal} />
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
});
