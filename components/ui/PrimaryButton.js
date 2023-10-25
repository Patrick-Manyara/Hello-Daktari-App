import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import { Colors } from "../../constants/styles";
import NormalText from "./NormalText";
import { globalStyles } from "../../constants/globalcss";

export default function PrimaryButton({ children, onPress, styleProp }) {
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
    color: "white",
  },
  buttonContainer: {
    width: "auto",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    backgroundColor: Colors.mainPink,
    marginTop: 5,
    borderRadius: 25,
  },
});
