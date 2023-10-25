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
  icon: {},
  customInput: {
    height: 40,
    justifyContent: "space-between",
    paddingLeft: 5,
    paddingRight: 5,
    paddingVertical: 8,
  },
});
