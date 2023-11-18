import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";

import { Colors } from "../../constants/styles";

export default function VisitOption({ img, name, onPress, isSelected }) {
  return (
    <Pressable style={{ width: "33.33%" }} onPress={onPress}>
      <View
        style={[
          styles.visitCard,
          {
            backgroundColor: isSelected ? Colors.lightPink : Colors.whiteSmoke,
          },
        ]}
      >
        <Image source={img} style={styles.image} />
        <Text style={styles.text}>{name}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  visitCard: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.whiteSmoke,
    flexDirection: "row",
    width: "95%",
    height: 50,
    borderRadius: 10,
  },
  image: {
    width: 15,
    height: 15,
    objectFit: "contain",
    marginRight: 5,
  },
  text: {
    fontSize: 10,
    color: Colors.mainBlue,
    textTransform: "capitalize",
  },
});
