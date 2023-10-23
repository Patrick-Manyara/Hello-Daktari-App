import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import { Colors } from "../../constants/styles";

export default function PrimaryButton({ children, onPress, styleProp }) {
  return (
    <Pressable
      android_ripple={{ color: "#ccc" }}
      style={({ pressed }) => [
        styles.button,
        pressed ? styles.buttonPressed : null,
      ]}
      onPress={onPress}
    >
      <View style={[styles.buttonContainer, styleProp]}>
        <Text style={[styles.title]}>{children}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "auto",
  },
  buttonPressed: {
    opacity: 0.5,
  },
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
