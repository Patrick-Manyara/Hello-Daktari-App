import React from "react";
import { View, StyleSheet, Pressable } from "react-native";

import HeaderText from "../ui/HeaderText";
import IconButton from "../ui/IconButton";

import { Colors } from "../../constants/styles";
import { globalStyles } from "../../constants/globalcss";
import PrimaryButton from "../ui/PrimaryButton";

export default function LabCard({ code, name, price, onPress, isInCart }) {
  return (
    <View style={styles.card}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: 5,
        }}
      >
        <View style={{ width: "80%" }}>
          <HeaderText
            styleProp={styles.labName}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {name}
          </HeaderText>
          <HeaderText styleProp={styles.labPrice}>Ksh. {price}</HeaderText>
        </View>
        <View style={{ width: "20%", justifyContent: "flex-end" }}>
          <PrimaryButton
            onPress={onPress}
            style={isInCart ? styles.inCartStyle : styles.notInCartStyle}
          >
            {isInCart ? "REMOVE" : "ADD"}
          </PrimaryButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "98%",
    backgroundColor: Colors.lightGrey,
    margin: 5,
    borderRadius: 12,
    elevation: 4,

    // IOS
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    backgroundColor: "white",
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  topView: {
    backgroundColor: Colors.mainBlue,
    flexDirection: "row",
  },
  topViewText: {
    color: "white",
    fontSize: 10,
    padding: 5,
  },
  labName: {
    color: "black",
    fontSize: 12,
  },
  labPrice: {
    fontSize: 10,
  },
  inCartStyle: {
    height: 30,
    borderRadius: 10,
  },
  notInCartStyle: {
    height: 30,
    borderRadius: 10,
    backgroundColor: Colors.darkBlue,
  },
});
