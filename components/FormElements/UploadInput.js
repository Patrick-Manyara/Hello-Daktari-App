import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCloudUpload } from "@fortawesome/free-solid-svg-icons";

import NormalText from "../ui/NormalText";

import { Colors } from "../../constants/styles";
import { globalStyles } from "../../constants/globalcss";

export default function UploadInput({ txt, onPress }) {
  return (
    <Pressable
      android_ripple={{ color: "#ccc" }}
      style={({ pressed }) => [
        globalStyles.button,
        { marginTop: 4 },
        pressed ? globalStyles.buttonPressed : null,
      ]}
      onPress={onPress}
    >
      <View style={[globalStyles.inputContainer, styles.customInput]}>
        <NormalText>{txt}</NormalText>
        <FontAwesomeIcon icon={faCloudUpload} color={Colors.mainPink} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  customInput: {
    height: 40,
    justifyContent: "space-between",
    paddingLeft: 5,
    paddingRight: 5,
    paddingVertical: 8,
  },
});
