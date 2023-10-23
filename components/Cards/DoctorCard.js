import React from "react";
import { View, Image, StyleSheet, Pressable } from "react-native";
import PrimaryButton from "../ui/PrimaryButton";
import HeaderText from "../ui/HeaderText";
import NormalText from "../ui/NormalText";

export default function DoctorCard({ src, name, role, years, rating, onPress }) {
    return (
      <Pressable style={{ width: "50%" }}>
        <View style={styles.doctorCard}>
          <Image source={src} />
          <View style={styles.textArea}>
            <HeaderText styleProp={styles.title}>{name}</HeaderText>
            <NormalText>{role}</NormalText>
            <NormalText>Years of Experience: {years} Years</NormalText>
            <View style={styles.ratingArea}>
              <Image source={require("../../assets/images/star.png")} />
              <NormalText>4.5</NormalText>
            </View>
            <PrimaryButton onPress={onPress}>Check Availability</PrimaryButton>
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
  });
  