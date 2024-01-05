import React from "react";
import { View, StyleSheet, Pressable } from "react-native";

import NormalText from "../ui/NormalText";
import PrimaryButton from "../ui/PrimaryButton";
import HeaderText from "../ui/HeaderText";

import { Colors } from "../../constants/styles";
import { globalStyles } from "../../constants/globalcss";

export default function Divider({ colorProp }) {
  return <View style={[{ backgroundColor: colorProp }, styles.divider]}></View>;
}

const styles = StyleSheet.create({
  divider: {
    width: "100%",
    height: 2,
  },
});
