import React from "react";
import { View, Image, StyleSheet, Pressable } from "react-native";

import NormalText from "../ui/NormalText";

import { Colors } from "../../constants/styles";

export default function PaymentCard({ text, img1, img2, isSelected, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.paymentCard}>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View
          style={[
            styles.circle,
            isSelected
              ? {
                  borderColor: Colors.mainBlue,
                  borderStyle: "solid",
                  borderWidth: 2,
                  backgroundColor: Colors.mainBlue,
                }
              : "",
          ]}
        ></View>
        <NormalText styleProp={styles.text}>{text}</NormalText>
      </View>

      <View style={{ justifyContent: "flex-end", flexDirection: "row" }}>
        <Image source={img1} />
        <Image source={img2} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  viewCard: {
    flex: 1,
    margin: 5,
    borderRadius: 8,
    elevation: 4,
    padding: 10,
    // IOS
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    backgroundColor: "white",
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 2,
    backgroundColor: "white",
  },
  text: {
    marginLeft: 5,
  },
  paymentCard: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 70,
    backgroundColor: Colors.lightGrey,
    alignItems: "center",
    padding: 5,
    marginTop: 10,
  },
});
