import React from "react";
import { View, StyleSheet } from "react-native";
import FeaturesCard from "../Cards/FeaturesCard";

export default function FeaturesBlock() {
  return (
    <View style={styles.container}>
      <FeaturesCard
        src={require("../../assets/images/woman.png")}
        text="Consult a doctor"
        style={styles.column}
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
