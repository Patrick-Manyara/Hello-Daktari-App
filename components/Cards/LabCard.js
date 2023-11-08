import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../../constants/styles";
import NormalText from "../ui/NormalText";
import PrimaryButton from "../ui/PrimaryButton";
import HeaderText from "../ui/HeaderText";
import { globalStyles } from "../../constants/globalcss";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Path } from "../../constants/path";

export default function LabCard({ code, name, price, onPress }) {
  return (
    <Pressable
      android_ripple={{ color: "#ccc" }}
      style={({ pressed }) => [
        globalStyles.button,
        { marginTop: 4 },
        pressed ? globalStyles.buttonPressed : null,
      ]}
    >
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
          <View style={{ width: "70%" }}>
            <HeaderText
              styleProp={styles.labName}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {name}
            </HeaderText>
            <HeaderText styleProp={styles.labPrice}>Ksh. {price}</HeaderText>
          </View>
          <View style={{ width: "30%" }}>
            <PrimaryButton onPress={onPress}>Get Test</PrimaryButton>
          </View>
        </View>
      </View>
    </Pressable>
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
});
