import React from "react";
import { View, Image, StyleSheet, Pressable } from "react-native";
import { Colors } from "../../constants/styles";
import NormalText from "../ui/NormalText";
import PrimaryButton from "../ui/PrimaryButton";
import HeaderText from "../ui/HeaderText";
import { globalStyles } from "../../constants/globalcss";

export default function AddressCard({
  location,
  tag,
  description,
  isSelected,
  onPress,
  editAddress,
  removeAddress,
}) {
  return (
    <Pressable onPress={onPress} style={styles.paymentCard}>
      <View style={styles.paymentInner}>
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
        <HeaderText>{location}</HeaderText>
        <View style={styles.tagContainer}>
          <NormalText styleProp={styles.tag}>{tag}</NormalText>
        </View>
      </View>

      <View style={{ marginVertical: 2 }}>
        <NormalText styleProp={globalStyles.centerText}>
          {description}
        </NormalText>
      </View>

      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <PrimaryButton styleProp={styles.btn} onPress={editAddress}>
          Edit
        </PrimaryButton>
        <PrimaryButton
          styleProp={[styles.btn, styles.blueBtn]}
          onPress={removeAddress}
        >
          Remove
        </PrimaryButton>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
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
  paymentInner: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  tagContainer: {
    borderRadius: 4,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: Colors.mainBlue,
    padding: 2,
  },
  tag: {
    fontSize: 10,
  },
  btn: {
    width: 100,
  },
  blueBtn: {
    backgroundColor: Colors.mainBlue,
  },
});
