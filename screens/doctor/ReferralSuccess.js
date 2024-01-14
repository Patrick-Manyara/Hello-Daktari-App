import React, { useEffect } from "react";
import { StyleSheet, Image, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import NotificationBell from "../../components/ui/NotificationBell";
import HeaderText from "../../components/ui/HeaderText";
import NormalText from "../../components/ui/NormalText";
import PrimaryButton from "../../components/ui/PrimaryButton";

import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { globalStyles } from "../../constants/globalcss";
import { Colors } from "../../constants/styles";
export default function ReferralSuccess() {
  const navigation = useNavigation();

  function navigateToHome() {
    navigation.navigate("DoctorHome");
  }

  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <NotificationBell />
      <ScrollView>
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <Image
            style={styles.image}
            source={require("../../assets/images/circle.png")}
          />
          <HeaderText styleProp={styles.title}>
            Patient referred Successfully!
          </HeaderText>
          <NormalText>
            You have reffered Yvonne Katama 00100 to Doctor Charles successfully
          </NormalText>
          <PrimaryButton onPress={navigateToHome}>Proceed</PrimaryButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    color: Colors.mainBlue,
  },
  subTitle: {
    marginTop: 5,
    marginBottom: 5,
    color: Colors.mainBlue,
  },
  pinkText: {
    color: Colors.mainPink,
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
