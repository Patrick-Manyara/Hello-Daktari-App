import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import HeaderText from "../ui/HeaderText";
import NormalText from "../ui/NormalText";
import VisitOption from "../Cards/VisitOption";
import PrimaryButton from "../ui/PrimaryButton";
import { useNavigation } from "@react-navigation/native";

export default function DoctorProfileBlock() {
  const navigation = useNavigation();

  function navigateToAppointment() {
    navigation.navigate("AppointmentScreen");
  }
  return (
    <View
      style={{ width: "100%", justifyContent: "center", alignItems: "center" }}
    >
      <HeaderText>About</HeaderText>
      <NormalText styleProp={styles.aboutText}>
        Lorem ipsum dolor sit amet consectetur. Nibh curabitur amet non semper
        egestas orci egestas lectus. Neque vel commodo at ante. Magna ultrices
        eu porttitor felis volutpat sagittis lectus. Id tristique cras ut
        faucibus at.
      </NormalText>
      <PrimaryButton onPress={navigateToAppointment}>
        Check Availability
      </PrimaryButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Arrange child Views in a row
    flexWrap: "wrap", // Allow wrapping to the next row
    width: "50%",
  },
  column: {
    flexBasis: "33.333%", // Distribute the columns evenly in a row
    alignItems: "center", // Center content horizontally
    // You can add more styling here
  },
  aboutText: {},
});
