import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Colors } from "../../constants/styles";
import NormalText from "../ui/NormalText";
import PrimaryButton from "../ui/PrimaryButton";
import HeaderText from "../ui/HeaderText";
import { globalStyles } from "../../constants/globalcss";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function LocationCard({
  location,
  description,
  isSelected,
  onPress,
  editAddress,
  removeAddress,
}) {
  return (
    <View style={styles.paymentCard}>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Pressable
          style={{
            width: "70%",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
          }}
          onPress={onPress}
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
          <View style={{ marginLeft: 10 }}>
            <HeaderText styleProp={{ fontSize: 14 }}>{location}</HeaderText>
            <NormalText styleProp={{ fontSize: 10 }}>{description}</NormalText>
          </View>
        </Pressable>

        <View
          style={{
            width: "30%",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Pressable onPress={editAddress} style={{ marginRight: 25 }}>
            <FontAwesomeIcon
              size={20}
              icon={faPenToSquare}
              color={Colors.mainBlue}
            />
          </Pressable>

          <Pressable onPress={removeAddress}>
            <FontAwesomeIcon size={20} icon={faTrashCan} color={Colors.red} />
          </Pressable>
        </View>
      </View>
    </View>
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
