import React from "react";
import { View, StyleSheet, Pressable } from "react-native";

import NormalText from "../ui/NormalText";
import IconButton from "../ui/IconButton";

import { Colors } from "../../constants/styles";
import { globalStyles } from "../../constants/globalcss";

export default function FieldCard({
  title,
  subtitle,
  onPress,
  handleClose,
  isActive,
}) {
  return (
    <Pressable
      android_ripple={{ color: "#ccc" }}
      style={({ pressed }) => [
        styles.fieldCard,
        { marginTop: 4 },
        pressed ? globalStyles.buttonPressed : null,
      ]}
    >
      <View
        style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center" }}
      >
        <View style={{ width: "80%" }}>
          <NormalText
            fontProp="poppins-semibold"
            styleProp={{ marginVertical: 2 }}
          >
            {title}
          </NormalText>
          <NormalText>{subtitle}</NormalText>
        </View>
        <View style={{ width: "20%" }}>
          <IconButton
            onPress={isActive ? handleClose : onPress}
            icon={isActive ? "chevron-up-outline" : "chevron-down-outline"}
            color={Colors.mainBlue}
            size={15}
            styleProp={styles.buttonStyle}
          />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fieldCard: {
    width: "95%",
    backgroundColor: Colors.lightGrey,
    margin: 5,
    borderRadius: 8,
    elevation: 4,
    padding: 5,
    // IOS
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    backgroundColor: "white",
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  buttonStyle: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: Colors.lightBlue,
  },
});
