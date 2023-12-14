import React, { useState, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import * as Font from "expo-font";

import { Colors } from "../../constants/styles";

export default function MediumText({ children, styleProp }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  async function loadFonts() {
    await Font.loadAsync({
      "poppins-semibold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
    });
    setFontsLoaded(true);
  }

  useEffect(() => {
    loadFonts();
  }, []);

  return (
    <>
      {fontsLoaded ? (
        <Text style={[styles.mediumText, styleProp]}>{children}</Text>
      ) : (
        <Text></Text>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  mediumText: {
    fontSize: 14,
    color: Colors.textColor,
    fontFamily: "poppins-semibold",
    textTransform: "capitalize",
  },
});
