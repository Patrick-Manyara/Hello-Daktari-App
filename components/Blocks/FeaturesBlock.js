import React from "react";
import { View, StyleSheet } from "react-native";
import FeaturesCard from "../Cards/FeaturesCard";
import { useNavigation } from "@react-navigation/native";

export default function FeaturesBlock() {
  const navigation = useNavigation();
  function navigateToScreen(screenName) {
    navigation.navigate(screenName);
  }
  return (
    <View style={styles.container}>
      <FeaturesCard
        src={require("../../assets/images/woman.png")}
        text="Consult a doctor"
        style={styles.column}
        onPress={() => navigateToScreen("ManualDetailsScreen")}
      />
      <FeaturesCard
        src={require("../../assets/images/ambulance.png")}
        text="Ambulance"
        style={styles.column}
      />
      <FeaturesCard
        src={require("../../assets/images/house.png")}
        text="Home Visit"
        style={styles.column}
      />
      <FeaturesCard
        src={require("../../assets/images/board.png")}
        text="Medical Records"
        style={styles.column}
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
