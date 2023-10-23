import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
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
        <Text
          style={[
            styles.text,
            {
              color: isSelected ? Colors.whiteBg : Colors.textColor,
            },
          ]}
        >
          {categoryName}
        </Text>
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
    fontSize: 10,
    color: "black",
  },
});
