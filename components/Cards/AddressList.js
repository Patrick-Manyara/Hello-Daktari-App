import React from "react";
import { View, StyleSheet } from "react-native";

import NormalText from "../ui/NormalText";
import PrimaryButton from "../ui/PrimaryButton";
import HeaderText from "../ui/HeaderText";

import { Colors } from "../../constants/styles";
import { globalStyles } from "../../constants/globalcss";

export default function AddressList({ location, tag, description, phone }) {
  return (
    <View style={styles.paymentCard}>
      <View style={styles.tagView}>
        <HeaderText>{tag}</HeaderText>
      </View>

      <View>
        <NormalText>{location}</NormalText>
        <NormalText>{description}</NormalText>
        <NormalText>{phone}</NormalText>
      </View>

      <View style={{ marginVertical: 2 }}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 2,
    backgroundColor: "white",
  },
  text: {
    marginLeft: 5,
  },
  paymentCard: {
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
  tagView: {
    borderBottomColor: Colors.textColor,
    borderBottomWidth: 0.5,
    marginVertical: 5,
  },
});
