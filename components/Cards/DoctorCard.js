import React from "react";
import { View, Image, StyleSheet, Pressable } from "react-native";
import { Path } from "../../constants/path";

import PrimaryButton from "../ui/PrimaryButton";
import HeaderText from "../ui/HeaderText";
import NormalText from "../ui/NormalText";

export default function DoctorCard({ src, name, role, years, onPress, price }) {
  return (
    <Pressable style={{ width: "50%" }}>
      <View style={styles.doctorCard}>
        <Image
          source={{
            uri: Path.IMAGE_URL + src,
          }}
          style={styles.image}
        />
        <View style={styles.textArea}>
          <View style={{ height: 40 }}>
            <HeaderText styleProp={styles.title}>{name}</HeaderText>
          </View>

          <NormalText>{role}</NormalText>
          <NormalText>Experience: {years} Years</NormalText>
          <View style={styles.ratingArea}>
            <Image source={require("../../assets/images/star.png")} />
            <NormalText>4.5</NormalText>
          </View>
          <NormalText>Rate/hr: Ksh. {price} </NormalText>
          <PrimaryButton onPress={onPress}>See Profile</PrimaryButton>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  doctorCard: {
    justifyContent: "center",
    alignItems: "center",
    width: "95%",
    margin: 5,
    borderRadius: 8,
    elevation: 4,
    // IOS
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    backgroundColor: "white",
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  title: {
    fontSize: 14,
  },
  textArea: {
    padding: 5,
  },
  ratingArea: {
    flexDirection: "row",
  },
  image: {
    width: "100%",
    height: 150,
    objectFit: "cover",
  },
});
