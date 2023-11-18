import React, { useState, useEffect } from "react";
import * as Font from "expo-font";

import { View, TextInput, StyleSheet } from "react-native";

import NormalText from "../ui/NormalText";

import { Colors } from "../../constants/styles";
import { globalStyles } from "../../constants/globalcss";

export default function InputHybrid({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
  placeholder,
}) {
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

  return (
    <>
      {fontsLoaded ? (
        <View style={[globalStyles.disabledContainer, styles.customInput]}>
          <NormalText styleProp={{ color: "#00000066", fontSize: 8 }}>
            {placeholder}
          </NormalText>
          <TextInput
            style={[styles.input, isInvalid && styles.inputInvalid]}
            keyboardType={keyboardType}
            secureTextEntry={secure}
            onChangeText={onUpdateValue}
            value={value}
            placeholder={label}
          />
        </View>
      ) : (
        <View>
          <TextInput style={[styles.input, isInvalid && styles.inputInvalid]} />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: "white",
    marginBottom: 4,
  },
  labelInvalid: {
    color: Colors.error500,
  },
  input: {
    fontSize: 14,
    fontFamily: "poppins-regular",
  },
  inputInvalid: {
    backgroundColor: Colors.error100,
  },
});
