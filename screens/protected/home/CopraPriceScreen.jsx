import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from "@expo/vector-icons";
import CopraPriceModal from '../../../components/modals/CopraPriceModal';
import DateTimePicker from '@react-native-community/datetimepicker';

const CopraPriceScreen = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [date, setDate] = useState(new Date(2024, 3, 25));
  const [showPicker, setShowPicker] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <Image
          source={require("../../../assets/niyoghub_banner_1.png")}
          style={styles.headerImage}
        />

        <TouchableOpacity
          onPress={toggleModal}
        >
          <Ionicons name="information-circle-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.copraContainer}>
        <Text style={styles.text}>COPRA AND WHOLENUT PRICE WATCH</Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.datePickerContainer}>
          <Text style={styles.label}>Date</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowPicker(true)}
          >
            <Text style={styles.dateText}>
              {date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </Text>
          </TouchableOpacity>
          {showPicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChange}
            />
          )}
        </View>

        <Image source={require('../../../assets/coprapricewatch.png')} style={styles.image} />
      </View>

      <CopraPriceModal
        visible={isModalVisible}
        setVisible={toggleModal}
      />
    </View>
  );
};

export default CopraPriceScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
    flex: 1,
  },
  copraContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    padding: 20,
  },
  text: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#6F9B35',
  },
  helpText: {
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#515151',
    padding: 6,
    width: 28,
    height: 28,
    borderRadius: 50,
    textAlign: 'center',
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#F0F0F0",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    marginTop: 30,
  },
  headerImage: {
    width: 150,
    height: 50,
    resizeMode: "contain",
  },
  contentContainer: {
    padding: 20,
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  dateText: {
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 400,
    marginVertical: 15,
  },
});
