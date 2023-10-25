import { Pressable, StyleSheet, Text, View } from "react-native";

import * as Font from "expo-font";
import React, { useState, useEffect } from "react";

import { Colors } from "../../constants/styles";

export default function HeaderText({ children, styleProp }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  async function loadFonts() {
    await Font.loadAsync({
      "poppins-regular": require("../../assets/fonts/Poppins-Regular.ttf"),
      "poppins-bold": require("../../assets/fonts/Poppins-Bold.ttf"),
    });
    setFontsLoaded(true);
  }

  useEffect(() => {
    loadFonts();
  }, []);

  // return <Text style={[styles.headerText, styleProp]}>{children}</Text>;
  return (
    <>
      {fontsLoaded ? (
        <Text
          style={[
            styles.headerText,
            styleProp,
            { fontFamily: "poppins-bold" },
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
  headerText: {
    fontSize: 20,
    color: Colors.mainBlue,
  },
});
