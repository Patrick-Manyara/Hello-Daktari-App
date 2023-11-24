import React from "react";
import { View, StyleSheet, Pressable } from "react-native";

import NormalText from "../ui/NormalText";

import { Colors } from "../../constants/styles";

export default function DayTimeCard({
  dayName,
  isSelected,
  onPress,
  dayDate,
  isTime,
}) {
  return (
    <Pressable style={{ width: 90 }} onPress={onPress}>
      <View
        style={[
          styles.timeSlot,
          {
            backgroundColor: isSelected ? Colors.mainBlue : Colors.whiteSmoke,
          },
        ]}
      >
        <NormalText
          styleProp={[
            styles.text,
            {
              color: isSelected ? "white" : Colors.textColor,
            },
          ]}
        >
          {dayName}
        </NormalText>
        {isTime && (
          <NormalText
            styleProp={[
              styles.text,
              {
                color: isSelected ? "white" : Colors.textColor,
              },
            ]}
          >
            to
          </NormalText>
        )}
        <NormalText
          styleProp={[
            styles.text,
            {
              color: isSelected ? "white" : Colors.textColor,
            },
          ]}
        >
          {dayDate}
        </NormalText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  timeSlot: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.whiteSmoke,
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
