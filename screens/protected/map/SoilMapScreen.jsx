import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Modal,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import MapComponent from "../../../components/map/MapComponent";

const localImage = require("../../../assets/niyoghub_logo_2.png");

const CustomCheckbox = ({ isChecked, onChange, label }) => {
  return (
    <View style={styles.checkBoxContainer}>
      <TouchableOpacity onPress={onChange} style={styles.checkboxContainer}>
        <Ionicons
          name={isChecked ? "checkbox" : "square-outline"}
          size={24}
          color="black"
        />
      </TouchableOpacity>
      <Text>{label}</Text>
    </View>
  );
};

const municipalityData = {
  //Highly Suitable (Green)
  Lucban: {
    suitability: { color: "green", label: "Highly Suitable" },
    intercropping: ["Coffee Varieties", "Banana Cultivars"],
  },
  Sariaya: {
    suitability: { color: "green", label: "Highly Suitable" },
    intercropping: ["Banana Cultivars", "Cacao Varieties"],
  },
  Mulanay: {
    suitability: { color: "green", label: "Highly Suitable" },
    intercropping: ["Corn Varieties", "Coffee Varieties"],
  },
  "San Francisco": {
    suitability: { color: "green", label: "Highly Suitable" },
    intercropping: ["Cacao Varieties", "Banana Cultivars"],
  },
  "San Andres": {
    suitability: { color: "green", label: "Highly Suitable" },
    intercropping: ["Corn Varieties", "Banana Cultivars"],
  },
  "San Narciso": {
    suitability: { color: "green", label: "Highly Suitable" },
    intercropping: ["Coffee Varieties", "Cacao Varieties"],
  },
  Lopez: {
    suitability: { color: "green", label: "Highly Suitable" },
    intercropping: ["Coffee Varieties", "Corn Varieties"],
  },
  Buenavista: {
    suitability: { color: "green", label: "Highly Suitable" },
    intercropping: ["Cacao Varieties", "Banana Cultivars"],
  },
  Guinayangan: {
    suitability: { color: "green", label: "Highly Suitable" },
    intercropping: ["Banana Cultivars", "Corn Varieties"],
  },
  Gumaca: {
    suitability: { color: "green", label: "Highly Suitable" },
    intercropping: ["Coffee Varieties", "Corn Varieties"],
  },
  "General Luna": {
    suitability: { color: "green", label: "Highly Suitable" },
    intercropping: ["Banana Cultivars", "Coffee Varieties"],
  },

  //Moderately Suitable (Yellow)
  "Lucena City": {
    suitability: { color: "yellow", label: "Moderately Suitable" },
    intercropping: ["Banana Cultivars", "Cacao Varieties"],
  },
  "Tayabas City": {
    suitability: { color: "yellow", label: "Moderately Suitable" },
    intercropping: ["Coffee Varieties", "Corn Varieties"],
  },
  Mauban: {
    suitability: { color: "yellow", label: "Moderately Suitable" },
    intercropping: ["Banana Cultivars", "Corn Varieties"],
  },
  Atimonan: {
    suitability: { color: "yellow", label: "Moderately Suitable" },
    intercropping: ["Coffee Varieties", "Banana Cultivars"],
  },
  Macalelon: {
    suitability: { color: "yellow", label: "Moderately Suitable" },
    intercropping: ["Corn Varieties", "Coffee Varieties"],
  },
  Pitogo: {
    suitability: { color: "yellow", label: "Moderately Suitable" },
    intercropping: ["Cacao Varieties", "Corn Varieties"],
  },
  Catanauan: {
    suitability: { color: "yellow", label: "Moderately Suitable" },
    intercropping: ["Banana Cultivars", "Coffee Varieties"],
  },
  Unisan: {
    suitability: { color: "yellow", label: "Moderately Suitable" },
    intercropping: ["Corn Varieties", "Banana Cultivars"],
  },
  "Padre Burgos": {
    suitability: { color: "yellow", label: "Moderately Suitable" },
    intercropping: ["Coffee Varieties", "Cacao Varieties"],
  },
  Pagbilao: {
    suitability: { color: "yellow", label: "Moderately Suitable" },
    intercropping: ["Banana Cultivars", "Corn Varieties"],
  },
  Infanta: {
    suitability: { color: "yellow", label: "Moderately Suitable" },
    intercropping: ["Coffee Varieties", "Cacao Varieties"],
  },
  Real: {
    suitability: { color: "yellow", label: "Moderately Suitable" },
    intercropping: ["Cacao Varieties", "Corn Varieties"],
  },
  Polillo: {
    suitability: { color: "yellow", label: "Moderately Suitable" },
    intercropping: ["Banana Cultivars", "Cacao Varieties"],
  },
  Panukulan: {
    suitability: { color: "yellow", label: "Moderately Suitable" },
    intercropping: ["Corn Varieties", "Coffee Varieties"],
  },
  Patnanungan: {
    suitability: { color: "yellow", label: "Moderately Suitable" },
    intercropping: ["Banana Cultivars", "Corn Varieties"],
  },

  //Marginally Suitable (Orange)
  "General Nakar": {
    suitability: { color: "orange", label: "Marginally Suitable" },
    intercropping: ["Coffee Varieties", "Corn Varieties"],
  },
  Calauag: {
    suitability: { color: "orange", label: "Marginally Suitable" },
    intercropping: ["Corn Varieties", "Banana Cultivars"],
  },
  Plaridel: {
    suitability: { color: "orange", label: "Marginally Suitable" },
    intercropping: ["Coffee Varieties", "Cacao Varieties"],
  },
  Tagkawayan: {
    suitability: { color: "orange", label: "Marginally Suitable" },
    intercropping: ["Banana Cultivars", "Corn Varieties"],
  },
  Quezon: {
    suitability: { color: "orange", label: "Marginally Suitable" },
    intercropping: ["Cacao Varieties", "Coffee Varieties"],
  },

  //Currently Not Suitable (Red)
  Alabat: {
    suitability: { color: "red", label: "Currently Not Suitable" },
    intercropping: ["Limited suitability for Banana Cultivars"],
  },
  Perez: {
    suitability: { color: "red", label: "Currently Not Suitable" },
    intercropping: ["Limited suitability for Cacao Varieties"],
  },
  Jomalig: {
    suitability: { color: "red", label: "Currently Not Suitable" },
    intercropping: ["Limited suitability for Corn Varieties"],
  },
  Burdeos: {
    suitability: { color: "red", label: "Currently Not Suitable" },
    intercropping: ["Limited suitability for Coffee Varieties"],
  },
};

const SoilMapScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [coffeeSelected, setCoffeeSelected] = useState(false);
  const [cacaoSelected, setCacaoSelected] = useState(false);
  const [bananaSelected, setBananaSelected] = useState(false);
  const [cornSelected, setCornSelected] = useState(false);
  const [selectedMunicipality, setSelectedMunicipality] = useState("Lucban");
  const [showIntercroppingOptions, setShowIntercroppingOptions] =
    useState(false);
  const [suitabilityModalVisible, setSuitabilityModalVisible] = useState(false);

  const toggleModal = () => setShowModal(!showModal);
  const toggleHelpModal = () => setShowHelpModal(!showHelpModal);
  const toggleIntercroppingOptions = () =>
    setShowIntercroppingOptions(!showIntercroppingOptions);

  const checkSuitability = () => setSuitabilityModalVisible(true);

  const closeSuitabilityModal = () => {
    setSuitabilityModalVisible(false);
    resetSelections(); //Reset checkboxes and municipality selection
  };

  const resetSelections = () => {
    setCoffeeSelected(false);
    setCacaoSelected(false);
    setBananaSelected(false);
    setCornSelected(false);
    setSelectedMunicipality("Lucban"); //Reset to default municipality
  };

  const isIntercroppingSuitable = (crop) => {
    if (selectedMunicipality && municipalityData[selectedMunicipality]) {
      return municipalityData[selectedMunicipality].intercropping.includes(
        crop
      );
    }
    return false;
  };

  //Sort the municipalities alphabetically
  const sortedMunicipalities = Object.keys(municipalityData).sort();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <Ionicons name="arrow-back" size={28} color="transparent" />
        <Text style={styles.title}>Suitability Map</Text>
        <TouchableOpacity style={styles.helpButton} onPress={toggleHelpModal}>
        <Ionicons name="information-circle-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <MapComponent
        selectedMunicipality={selectedMunicipality}
        intercroppingSelections={{
          coffeeSelected,
          cacaoSelected,
          bananaSelected,
          cornSelected,
        }}
      />

      <TouchableOpacity style={styles.menuButton} onPress={toggleModal}>
        <Ionicons name="menu" size={28} color="white" />
      </TouchableOpacity>

      {/* Help Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showHelpModal}
        onRequestClose={toggleHelpModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.helpModalContent}>
            <Text style={styles.helpModalTitle}>
              HOW TO USE SUITABILITY MAP?
            </Text>
            <Text style={styles.helpModalDate}>Last Updated April 2024</Text>

            <View style={styles.horizontalLine} />

            <Text style={styles.helpModalSectionTitle}>
              Choose Municipality:
            </Text>
            <Text style={styles.helpModalText}>
              Once you've located the Municipality dropdown field, click on it
              to view a list of municipalities within Quezon Province. Select
              the municipality you want to learn about its soil.
            </Text>

            <Text style={styles.helpModalSectionTitle}>
              Click Variety of Intercropping:
            </Text>
            <Text style={styles.helpModalText}>
              Look for an option button or dropdown menu that allows you to
              select the variety of intercropping for coconut. Click on the
              option that best suits your needs or preferences.
            </Text>

            <Text style={styles.helpModalSectionTitle}>View Results:</Text>
            <Text style={styles.helpModalText}>
              After selecting the variety of intercropping, the map may display
              suitability ratings or information relevant to your selection.
              Take note of this information for your decision-making process.
            </Text>

            <TouchableOpacity
              style={styles.understandButton}
              onPress={toggleHelpModal}
            >
              <Text style={styles.buttonText}>I understand</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Main Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
              <Ionicons name="close" size={28} color="black" />
            </TouchableOpacity>

            <Image source={localImage} style={styles.image} />

            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>NiyogHub</Text>
            </View>
            <Text style={styles.modalSubtitle}>
              A Coconut Crop Suitability Map of Quezon Province
            </Text>

            <Text style={styles.modalLabel}>Municipality</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedMunicipality}
                style={styles.picker}
                onValueChange={(itemValue) =>
                  setSelectedMunicipality(itemValue)
                }
              >
                {sortedMunicipalities.map((municipality) => (
                  <Picker.Item
                    key={municipality}
                    label={municipality}
                    value={municipality}
                  />
                ))}
              </Picker>
            </View>

            <View style={styles.intercroppingContainer}>
              <Text style={styles.modalTitle}>Intercropping</Text>
              <TouchableOpacity
                style={styles.hamburgerButton}
                onPress={toggleIntercroppingOptions}
              >
                <Ionicons
                  name={
                    showIntercroppingOptions ? "chevron-up" : "chevron-down"
                  }
                  size={25}
                  color="black"
                />
              </TouchableOpacity>
            </View>

            {showIntercroppingOptions && (
              <>
                <CustomCheckbox
                  isChecked={coffeeSelected}
                  onChange={() => setCoffeeSelected(!coffeeSelected)}
                  label="Coffee Varieties"
                />
                <CustomCheckbox
                  isChecked={cacaoSelected}
                  onChange={() => setCacaoSelected(!cacaoSelected)}
                  label="Cacao Varieties"
                />
                <CustomCheckbox
                  isChecked={bananaSelected}
                  onChange={() => setBananaSelected(!bananaSelected)}
                  label="Banana Cultivars"
                />
                <CustomCheckbox
                  isChecked={cornSelected}
                  onChange={() => setCornSelected(!cornSelected)}
                  label="Corn Varieties"
                />
              </>
            )}

            <TouchableOpacity
              style={styles.checkSuitabilityButton}
              onPress={checkSuitability}
            >
              <Text style={styles.checkSuitabilityText}>Check Suitability</Text>
            </TouchableOpacity>

            {/* Suitability Modal */}
            <Modal
              animationType="fade"
              transparent={true}
              visible={suitabilityModalVisible}
              onRequestClose={closeSuitabilityModal}
            >
              <View style={styles.suitabilityModalOverlay}>
                <View style={styles.cardContainer}>
                  {/* Header Section with Close Button */}
                  <View style={styles.cardHeader}>
                    <Text style={styles.legendTitle}>
                      Soil Suitability Assessment
                    </Text>
                    <TouchableOpacity onPress={closeSuitabilityModal}>
                      <Ionicons name="close" size={24} color="white" />
                    </TouchableOpacity>
                  </View>

                  {/* Content Section */}
                  <View style={styles.cardContent}>
                    {selectedMunicipality &&
                      municipalityData[selectedMunicipality] && (
                        <>
                          {/* Location Info */}
                          <Text style={styles.provinceText}>
                            Quezon Province
                          </Text>
                          <View style={styles.locationContainer}>
                            <Ionicons
                              name="location-outline"
                              size={18}
                              color="black"
                            />
                            <Text style={styles.municipalityTitle}>
                              {selectedMunicipality}
                            </Text>
                          </View>

                          {/* Crop Suitability */}
                          <Text style={styles.cropSuitabilityText}>
                            Crop Suitability
                          </Text>
                          <View style={styles.suitabilityContainer}>
                            <View
                              style={{
                                ...styles.suitabilityCircle,
                                backgroundColor:
                                  municipalityData[selectedMunicipality]
                                    .suitability.color,
                              }}
                            />
                            <Text style={styles.suitabilityLabel}>
                              {
                                municipalityData[selectedMunicipality]
                                  .suitability.label
                              }
                            </Text>
                          </View>

                          {/* Intercropping Suitability */}
                          <Text style={styles.intercroppingTitle}>
                            Selected Intercropping Suitability:
                          </Text>
                          {coffeeSelected && (
                            <Text style={styles.suitabilityModalText}>
                              Coffee:{" "}
                              {isIntercroppingSuitable("Coffee Varieties")
                                ? "Suitable"
                                : "Not Suitable"}
                            </Text>
                          )}
                          {cacaoSelected && (
                            <Text style={styles.suitabilityModalText}>
                              Cacao:{" "}
                              {isIntercroppingSuitable("Cacao Varieties")
                                ? "Suitable"
                                : "Not Suitable"}
                            </Text>
                          )}
                          {bananaSelected && (
                            <Text style={styles.suitabilityModalText}>
                              Banana:{" "}
                              {isIntercroppingSuitable("Banana Cultivars")
                                ? "Suitable"
                                : "Not Suitable"}
                            </Text>
                          )}
                          {cornSelected && (
                            <Text style={styles.suitabilityModalText}>
                              Corn:{" "}
                              {isIntercroppingSuitable("Corn Varieties")
                                ? "Suitable"
                                : "Not Suitable"}
                            </Text>
                          )}
                        </>
                      )}
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    zIndex: 10,
    backgroundColor: "rgba(128, 128, 128, 0.50)",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    flex: 1,
  },
  backButton: {
    padding: 5,
  },
  helpButton: {
    padding: 5,
  },
  menuButton: {
    position: "absolute",
    top: 95,
    left: 10,
    padding: 10,
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    height: "100%",
    backgroundColor: "white",
    borderRadius: 0,
    padding: 20,
    position: "absolute",
    left: 0,
    paddingTop: 35,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: "bold",
    marginVertical: 15,
    top: 10,
  },
  modalSubtitle: {
    fontSize: 14,
    textAlign: "center",
    marginVertical: 5,
  },
  modalLabel: {
    paddingTop: 3,
    fontSize: 17,
    fontWeight: "600",
    marginVertical: 10,
    fontWeight: "bold",
  },
  logoContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    paddingTop: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 5,
    marginVertical: 5,
  },
  picker: {
    height: 40,
    width: "100%",
  },
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5,
    zIndex: 10,
  },
  checkboxContainer: {
    marginRight: 10,
  },
  image: {
    width: 81,
    height: 90,
    top: 25,
    left: 100,
    alignContent: "center",
  },
  intercroppingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 5,
  },
  hamburgerButton: {
    padding: 7,
    paddingTop: 30,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  helpModalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "85%",
    alignSelf: "center",
  },
  helpModalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  helpModalDate: {
    fontSize: 14,
    marginBottom: 15,
    color: "gray",
    textAlign: "center",
  },
  helpModalSectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  helpModalText: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: "justify",
  },
  understandButton: {
    marginTop: 20,
    backgroundColor: "#537F19",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  horizontalLine: {
    borderBottomColor: "#D9D9D9",
    borderBottomWidth: 1,
    marginVertical: 10,
    width: "100%",
  },
  checkSuitabilityButton: {
    backgroundColor: "#537F19",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  checkSuitabilityText: {
    color: "white",
    fontWeight: "bold",
  },
  suitabilityModalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  cardContainer: {
    width: "85%",
    backgroundColor: "#EAEAEA",
    borderRadius: 8,
    overflow: "hidden",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#515151",
    padding: 15,
  },
  legendTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  cardContent: {
    padding: 20,
  },
  provinceText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  municipalityTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 5,
  },
  cropSuitabilityText: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  suitabilityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  suitabilityCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    marginRight: 10,
  },
  suitabilityLabel: {
    fontSize: 16,
  },
  intercroppingTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 10,
  },
  suitabilityModalText: {
    fontSize: 15,
    marginBottom: 5,
  },
});

export default SoilMapScreen;
