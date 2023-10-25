import React from "react";
import { StyleSheet, Image, View, ScrollView } from "react-native";
import { globalStyles } from "../constants/globalcss";
import { SafeAreaView } from "react-native-safe-area-context";

import NotificationBell from "../components/ui/NotificationBell";
import HeaderText from "../components/ui/HeaderText";
import NormalText from "../components/ui/NormalText";
import PrimaryButton from "../components/ui/PrimaryButton";

import { getDayMonthAndYear } from "../util/dateFormat";
import { Path } from "../constants/path";

export default function SummaryScreen({ route, navigation }) {
  const doctor = route.params.doctor;
  const session_data = route.params.session_data;
  const payment_method = route.params.payment_method;
  const address = route.params.address;

  console.log(address);
  
  function navigateToSuccess() {
    navigation.navigate("SuccessScreen");
  }
  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <NotificationBell />
      <ScrollView>
        <View>
          <HeaderText>Summary</HeaderText>
          <View style={styles.profileIntro}>
            <View>
              <Image
                style={styles.image}
                source={{
                  uri: Path.IMAGE_URL + doctor.doctor_image,
                }}
              />
            </View>
            <View style={styles.textArea}>
              <HeaderText styleProp={styles.title}>
                {doctor.doctor_name}
              </HeaderText>
              <NormalText styleProp={styles.subTitle}>
                {doctor.doctor_qualifications}
              </NormalText>
              <NormalText styleProp={styles.subTitle}>
                Years of Experience: {doctor.doctor_experience} Years
              </NormalText>
            </View>
          </View>

          <View>
            <View
              style={{
                width: "100%",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <NormalText>Date & hour</NormalText>
              <NormalText>
                {" "}
                {getDayMonthAndYear(session_data.selectedDate)} |{" "}
                {session_data.selectedTime}
              </NormalText>
            </View>
            <View
              style={{
                width: "100%",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <NormalText>Package</NormalText>
              <NormalText> {session_data.session_mode}</NormalText>
            </View>
          </View>

          <View
            style={{ width: "100%", height: 3, backgroundColor: "#B3B3B370" }}
          ></View>

          <View>
            <View
              style={{
                width: "100%",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <NormalText>Amount</NormalText>
              <NormalText> Ksh. 3000</NormalText>
            </View>
            <View
              style={{
                width: "100%",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <NormalText>Payment</NormalText>
              <NormalText>{payment_method} </NormalText>
            </View>
            <View
              style={{
                width: "100%",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <NormalText>Total</NormalText>
              <NormalText> Ksh. 3000 </NormalText>
            </View>
          </View>

          <PrimaryButton onPress={navigateToSuccess}>Pay Now</PrimaryButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
  },
  subTitle: {
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
  profileIntro: {
    flexDirection: "row",
    width: "100%",
  },
  textArea: {
    justifyContent: "center",
    marginLeft: 5,
  },
});
