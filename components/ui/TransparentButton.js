import React from "react";
import { View, Pressable, StyleSheet } from "react-native";

import NormalText from "./NormalText";

import { Colors } from "../../constants/styles";
import { globalStyles } from "../../constants/globalcss";

export default function TransparentButton({ children, onPress, styleProp }) {
  return (
    <Pressable
      android_ripple={{ color: "#ccc" }}
      style={({ pressed }) => [
        globalStyles.button,
        pressed ? globalStyles.buttonPressed : null,
      ]}
      onPress={onPress}
    >
      <View style={[styles.buttonContainer, styleProp]}>
        <NormalText styleProp={[styles.title]}>{children}</NormalText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    color: Colors.mainBlue,
  },
  buttonContainer: {
    width: "auto",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    backgroundColor: "white",
    marginTop: 5,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.mainBlue,
  },
});
