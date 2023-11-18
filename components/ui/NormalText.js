import React, { useState, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import * as Font from "expo-font";

import { Colors } from "../../constants/styles";

export default function NormalText({ children, styleProp, fontProp }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  async function loadFonts() {
    await Font.loadAsync({
      "poppins-regular": require("../../assets/fonts/Poppins-Regular.ttf"),
      "poppins-semibold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
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
            fontProp ? { fontFamily: fontProp } : "",
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
    color: Colors.textColor,
    fontFamily: "poppins-regular",
  },
});
