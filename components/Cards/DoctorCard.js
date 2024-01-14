import React from "react";
import { View, Image, StyleSheet, Pressable } from "react-native";
import { Path } from "../../constants/path";

import PrimaryButton from "../ui/PrimaryButton";
import HeaderText from "../ui/HeaderText";
import NormalText from "../ui/NormalText";

export default function DoctorCard({ onPress, doctor }) {
  return (
    <Pressable style={{ width: "50%" }}>
      <View style={styles.doctorCard}>
        <Image
          source={{
            uri:
              Path.IMAGE_URL +
              (doctor.doctor_image === null
                ? "avatar.png"
                : doctor.doctor_image),
          }}
          resizeMode="cover"
          style={styles.image}
        />
        <View style={styles.textArea}>
          <View style={{ height: 40 }}>
            <HeaderText styleProp={styles.title}>
              {doctor.doctor_name}
            </HeaderText>
          </View>

          <NormalText>{doctor.doctor_qualifications}</NormalText>
          <NormalText>Experience: {doctor.doctor_experience} Years</NormalText>
          <View style={styles.ratingArea}>
            <Image source={require("../../assets/images/star.png")} />
            <NormalText>4.5</NormalText>
          </View>
          <NormalText>Rate/hr: Ksh. {doctor.doctor_rate} </NormalText>
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
