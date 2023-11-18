import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import * as Font from "expo-font";

import { Colors } from "../../constants/styles";

function Input({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
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
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              isInvalid && styles.inputInvalid,
              { fontFamily: "poppins-regular" },
            ]}
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

export default Input;

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
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: Colors.lightGrey,
    borderRadius: 10,
    fontSize: 14,
  },
  inputInvalid: {
    backgroundColor: Colors.error100,
  },
});
