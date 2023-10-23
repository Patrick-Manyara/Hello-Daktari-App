import React, { useEffect, useState } from "react";
import { StyleSheet, Image, View, ScrollView } from "react-native";
import { globalStyles } from "../constants/globalcss";
import { SafeAreaView } from "react-native-safe-area-context";

import NotificationBell from "../components/ui/NotificationBell";
import HeaderText from "../components/ui/HeaderText";
import NormalText from "../components/ui/NormalText";
import PrimaryButton from "../components/ui/PrimaryButton";
import { Path } from "../constants/path";

export default function DoctorProfileScreen({ route, navigation }) {
  const doctor = route.params.doctor;
  const session_data = route.params.session_data;

  // console.log(session_data.session_id);

  function navigateToAppointment() {
    navigation.navigate("AppointmentScreen", {
      doctor: doctor,
      session_data: session_data,
    });
  }

  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <NotificationBell />
      <ScrollView>
        <View>
          <HeaderText>Specialist Profile</HeaderText>
          <View style={styles.innerView}>
            <Image
              style={styles.image}
              source={{
                uri: Path.IMAGE_URL + doctor.doctor_image,
              }}
            />
            <View>
              <HeaderText styleProp={styles.title}>
                {doctor.doctor_name}
              </HeaderText>
              <NormalText styleProp={styles.subTitle}>
                {doctor.doctor_qualifications}
              </NormalText>
              <NormalText styleProp={styles.subTitle}>
                Years of Experience: {doctor.doctor_experience} Years
              </NormalText>
              <View style={styles.ratingArea}>
                <Image source={require("../assets/images/star.png")} />
                <NormalText>4.5</NormalText>
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
                <PrimaryButton onPress={navigateToAppointment}>
                  Check Availability
                </PrimaryButton>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
