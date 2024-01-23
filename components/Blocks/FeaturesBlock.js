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
        bgColor="#FF594D3B"
        txtColor="#FF594D"
      />
      <FeaturesCard
        src={require("../../assets/images/ambulance.png")}
        text="Ambulance"
        style={styles.column}
        onPress={openModal}
        bgColor="#4C84C333"
        txtColor="#4C84C3"
      />
      <FeaturesCard
        src={require("../../assets/images/house.png")}
        text="Home Visit"
        style={styles.column}
        bgColor="#983B2D33"
        txtColor="#983B2D"
        onPress={() => navigateToScreen("HouseVisitScreen")}
      />
      <FeaturesCard
        src={require("../../assets/images/board.png")}
        text="Medical Records"
        bgColor="#17A18233"
        style={styles.column}
        txtColor="#17A182"
        onPress={() => navigateToScreen("MedicalRecordsScreen")}
      />
      <FeaturesCard
        src={require("../../assets/images/meds.png")}
        text="Pharmacy"
        style={styles.column}
        txtColor="#0EA6C6"
        bgColor="#0EA6C633"
        onPress={() => navigateToScreen("Shop")}
      /> 
      <FeaturesCard
        src={require("../../assets/images/microscope.png")}
        text="Lab Services"
        style={styles.column}
        txtColor="#FF594D"
        bgColor="#FF594D3B"
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
