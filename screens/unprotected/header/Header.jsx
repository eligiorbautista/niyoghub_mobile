import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Header = ({ navigation }) => {
    return (
        <View style={styles.container}>
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
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingVertical: 40,
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
});
