import React from "react";
import { View, StyleSheet } from "react-native";

import { Colors } from "../../constants/styles";

import HeaderText from "../ui/HeaderText";
export default function OrdersCard({ month, num }) {
  return (
    <View>
      <HeaderText>{month}</HeaderText>
      <View style={styles.card}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "95%",
    backgroundColor: Colors.lightGrey,
    margin: 5,
    borderRadius: 8,
    elevation: 4,
    padding: 5,
    // IOS
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    backgroundColor: "white",
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
});
