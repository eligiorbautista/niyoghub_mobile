import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';

const AIAssistantModal = ({ visible, onClose }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>HOW TO USE THE AI ASSISTANT?</Text>
                    <Text style={styles.subTitle}>Last Updated October 2024</Text>
                    <View style={styles.divider} />
                    <Text style={styles.modalTextTitle}>Starting a Chat:</Text>
                    <Text style={styles.modalText}>
                        • Type your question or message in the input box at the bottom of the screen. {'\n'}
                        • Press the "Send" icon to submit your message to NiyogHub's Virtual AI Assistant. {'\n'}
                        • Press the chat icon beside the microphone button to switch to the chat assistant mode.
                    </Text>
                    <Text style={styles.modalTextTitle}>Using the Voice Assistant:</Text>
                    <Text style={styles.modalText}>
                        • Press the green robot icon beside the send icon to switch to the voice assistant mode. {'\n'}
                        • Speak your question, and the AI will respond accordingly.
                    </Text>
                    <Text style={styles.modalTextTitle}>Viewing the Response:</Text>
                    <Text style={styles.modalText}>
                        • After sending a message, the AI's response will appear in the chat bubble. {'\n'}
                        • If you're asking about PCA, the assistant will guide you to the relevant contact information.
                    </Text>
                    <Text style={styles.modalTextTitle}>Additional Tips:</Text>
                    <Text style={styles.modalText}>
                        • You can scroll through previous messages in the conversation. {'\n'}
                        • The assistant will respond based on your language—English or Filipino.
                    </Text>
                    <TouchableOpacity style={styles.modalButton} onPress={onClose}>
                        <Text style={styles.modalButtonText}>I understand</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default AIAssistantModal;

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
        borderRadius: 4,
        marginBottom: 16,
        width: '100%',
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
