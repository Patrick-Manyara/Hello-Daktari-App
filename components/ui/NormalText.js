import { Pressable, StyleSheet, Text, View } from "react-native";

import { Colors } from "../../constants/styles";
import * as Font from "expo-font";
import React, { useState, useEffect } from "react";

export default function NormalText({ children, styleProp }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  async function loadFonts() {
    await Font.loadAsync({
      "poppins-regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    });
    setFontsLoaded(true);
  }

  useEffect(() => {
    loadFonts();
  }, []);

  // return <Text style={[styles.secondaryText, styleProp]}>{children}</Text>;
  return (
    <>
      {fontsLoaded ? (
        <Text
          style={[
            styles.secondaryText,
            styleProp,
            { fontFamily: "poppins-regular" },
          ]}
        >
          {children}
        </Text>
      ) : (
        <Text></Text>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  secondaryText: {
    fontSize: 12,
    color: Colors.textColor
  },
});
