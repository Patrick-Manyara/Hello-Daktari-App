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
  multiline,
  numberOfLines,
  inputStyle,
  placeholderTextColor,
  containerStyle,
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
        <View
          style={[
            globalStyles.disabledContainer,
            styles.customInput,
            containerStyle,
          ]}
        >
          {label && (
            <NormalText styleProp={{ color: "#00000066", fontSize: 8 }}>
              {label}
            </NormalText>
          )}

          <TextInput
            style={[styles.input, isInvalid && styles.inputInvalid, inputStyle]}
            keyboardType={keyboardType}
            secureTextEntry={secure}
            onChangeText={onUpdateValue}
            value={value}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            multiline={multiline}
            numberOfLines={numberOfLines}
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
    fontSize: 16,
    fontFamily: "poppins-regular",
  },
  inputInvalid: {
    backgroundColor: Colors.error100,
  },

  customInput: {
    height: 40,
    justifyContent: "space-between",
    paddingLeft: 5,
    paddingRight: 5,
    paddingVertical: 8,
  },
});
