import React from "react";
import { StyleSheet, Image, View, ScrollView } from "react-native";
import { globalStyles } from "../constants/globalcss";
import { SafeAreaView } from "react-native-safe-area-context";


import NotificationBell from "../components/ui/NotificationBell";
import HeaderText from "../components/ui/HeaderText";
import NormalText from "../components/ui/NormalText";
import PrimaryButton from "../components/ui/PrimaryButton";

import { useNavigation } from "@react-navigation/native";
export default function SummaryScreen() {
  const navigation = useNavigation();

  function navigateToSuccess() {
    navigation.navigate("SuccessScreen");
  }
  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <NotificationBell />
      <ScrollView>
        <View>
          <HeaderText>Book Appointment</HeaderText>
          <View style={styles.profileIntro}>
            <View>
              <Image
                style={styles.image}
                source={require("../assets/images/doc.png")}
              />
            </View>
            <View style={styles.textArea}>
              <HeaderText styleProp={styles.title}>
                Dr Adam Charles
              </HeaderText>
              <NormalText styleProp={styles.subTitle}>
                Cardiologist at Kenyatta hospital
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
              <NormalText> Oct 06,2023| 7:30AM</NormalText>
            </View>
            <View
              style={{
                width: "100%",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <NormalText>Date & hour</NormalText>
              <NormalText> Oct 06,2023| 7:30AM</NormalText>
            </View>
            <View
              style={{
                width: "100%",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <NormalText>Date & hour</NormalText>
              <NormalText> Oct 06,2023| 7:30AM</NormalText>
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
              <NormalText>Date & hour</NormalText>
              <NormalText> Oct 06,2023| 7:30AM</NormalText>
            </View>
            <View
              style={{
                width: "100%",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <NormalText>Date & hour</NormalText>
              <NormalText> Oct 06,2023| 7:30AM</NormalText>
            </View>
            <View
              style={{
                width: "100%",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <NormalText>Date & hour</NormalText>
              <NormalText> Oct 06,2023| 7:30AM</NormalText>
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
