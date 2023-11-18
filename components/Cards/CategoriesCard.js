import React from "react";
import { View, StyleSheet, Pressable } from "react-native";

import NormalText from "../ui/NormalText";

import { Colors } from "../../constants/styles";

export default function CategoriesCard({ categoryName, isSelected, onPress }) {
  return (
    <Pressable style={{ width: 90 }} onPress={onPress}>
      <View
        style={[
          styles.timeSlot,
          {
            backgroundColor: isSelected ? Colors.mainBlue : Colors.categoryBlue,
          },
        ]}
      >
        <NormalText
          fontProp="poppins-semibold"
          styleProp={[
            styles.text,
            {
              color: isSelected ? Colors.whiteBg : Colors.textColor,
            },
          ]}
        >
          {categoryName}
        </NormalText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  timeSlot: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.mainBlue,
    flexDirection: "column",
    width: "95%",
    height: 50,
    borderRadius: 10,
  },
  text: {
    fontSize: 8,
    color: "black",
    textTransform: "capitalize",
  },
});
