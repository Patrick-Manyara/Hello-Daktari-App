import React from "react";
import { View, Image, StyleSheet, Pressable } from "react-native";
import { Colors } from "../../constants/styles";
import NormalText from "../ui/NormalText";
import PrimaryButton from "../ui/PrimaryButton";
import HeaderText from "../ui/HeaderText";
import { globalStyles } from "../../constants/globalcss";

export default function OrdersCard({ month, num }) {
  return (
    <View>
      <HeaderText>{month}</HeaderText>
      <View style={styles.card}>

      </View>
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
