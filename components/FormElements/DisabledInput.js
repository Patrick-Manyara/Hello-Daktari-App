import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Pressable,
  Alert,
  Button,
} from "react-native";
import NormalText from "../ui/NormalText";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCloudUpload } from "@fortawesome/free-solid-svg-icons";
import { Colors } from "../../constants/styles";
import { globalStyles } from "../../constants/globalcss";

export default function DisabledInput({ placeholder, txt }) {
  return (
    <Pressable
      android_ripple={{ color: "#ccc" }}
      style={({ pressed }) => [
        globalStyles.button,
        { marginTop: 4 },
        pressed ? globalStyles.buttonPressed : null,
      ]}
    >
      <View style={[globalStyles.disabledContainer, styles.customInput]}>
        <NormalText styleProp={{ color: "#00000066", fontSize: 8 }}>
          {placeholder}
        </NormalText>
        <NormalText>{txt}</NormalText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  customInput: {
    height: 50,
    paddingLeft: 5,
    paddingRight: 5,
    paddingVertical: 8,
  },
});
