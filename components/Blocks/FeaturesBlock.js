import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import FeaturesCard from "../Cards/FeaturesCard";
import AmbulanceModal from "../Modals/AmbulanceModal";

export default function FeaturesBlock() {
  const navigation = useNavigation();
  function navigateToScreen(screenName) {
    navigation.navigate(screenName);
  }

  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };
  return (
    <View style={styles.container}>
      <FeaturesCard
        src={require("../../assets/images/woman.png")}
        text="Consult a specialist"
        style={styles.column}
        onPress={() => navigateToScreen("ManualDetailsScreen")}
      />
      <FeaturesCard
        src={require("../../assets/images/ambulance.png")}
        text="Ambulance"
        style={styles.column}
        onPress={openModal}
      />
      <FeaturesCard
        src={require("../../assets/images/house.png")}
        text="Home Visit"
        style={styles.column}
        onPress={() => navigateToScreen("HouseVisitScreen")}
      />
      <FeaturesCard
        src={require("../../assets/images/board.png")}
        text="Medical Records"
        style={styles.column}
        onPress={() => navigateToScreen("MedicalRecordsScreen")}
      />
      <FeaturesCard
        src={require("../../assets/images/meds.png")}
        text="Pharmacy"
        style={styles.column}
        onPress={() => navigateToScreen("Shop")}
      />
      <FeaturesCard
        src={require("../../assets/images/microscope.png")}
        text="Lab Services"
        style={styles.column}
        onPress={() => navigateToScreen("LabScreen")}
      />
      <AmbulanceModal visible={isModalVisible} closeModal={closeModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Arrange child Views in a row
    flexWrap: "wrap", // Allow wrapping to the next row
  },
  column: {
    flexBasis: "33.333%", // Distribute the columns evenly in a row
    alignItems: "center", // Center content horizontally
    // You can add more styling here
  },
});
