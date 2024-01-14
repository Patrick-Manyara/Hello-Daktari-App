import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import HeaderText from "../ui/HeaderText";
import NormalText from "../ui/NormalText";
import PrimaryButton from "../ui/PrimaryButton";

export default function DoctorProfileBlock({ doctor }) {
  return (
    <View>
      <HeaderText styleProp={styles.title}>{doctor.doctor_name}</HeaderText>
      <NormalText styleProp={styles.subTitle}>
        {doctor.doctor_qualifications}
      </NormalText>
      <NormalText styleProp={styles.subTitle}>
        Years of Experience: {doctor.doctor_experience} Years
      </NormalText>

      <View style={styles.ratingArea}>
        <Image source={require("../../assets/images/star.png")} />
        <NormalText>4.3</NormalText>
      </View>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <HeaderText>About</HeaderText>
        <NormalText styleProp={styles.aboutText}>
          {doctor.doctor_bio}
        </NormalText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    textAlign: "center",
  },
  subTitle: {
    textAlign: "center",
    marginTop: 5,
    marginBottom: 5,
  },
  ratingArea: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 5,
  },
  innerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    padding: 5,
  },
  image: {
    height: 140,
    width: 140,
    borderRadius: 70,
  },
});
