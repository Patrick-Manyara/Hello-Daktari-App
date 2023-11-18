import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import DoctorCard from "../Cards/DoctorCard";

export default function DoctorsBlock() {
  const navigation = useNavigation();

  const navigateToDoctorProfile = () => {
    navigation.navigate("DoctorProfileScreen");
  };
  return (
    <View style={styles.container}>
      <DoctorCard
        style={styles.column}
        src={require("../../assets/images/doc.png")}
        name="Dr Charles"
        post="Cardiologist at Kenyatta Hospital"
        years="10"
        rating="4.5"
        onPress={navigateToDoctorProfile}
      />
      <DoctorCard
        style={styles.column}
        src={require("../../assets/images/doc.png")}
        name="Dr Charles"
        post="Cardiologist at Kenyatta Hospital"
        years="10"
        rating="4.5"
        onPress={navigateToDoctorProfile}
      />
      <DoctorCard
        src={require("../../assets/images/doc.png")}
        name="Dr Charles"
        post="Cardiologist at Kenyatta Hospital"
        years="10"
        rating="4.5"
        style={styles.column}
        onPress={navigateToDoctorProfile}
      />
      <DoctorCard
        src={require("../../assets/images/doc.png")}
        name="Dr Charles"
        post="Cardiologist at Kenyatta Hospital"
        years="10"
        rating="4.5"
        style={styles.column}
        onPress={navigateToDoctorProfile}
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
    flexBasis: "50%", // Distribute the columns evenly in a row
    alignItems: "center", // Center content horizontally
    // You can add more styling here
  },
});
