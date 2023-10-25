import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../constants/globalcss";
import { useNavigation } from "@react-navigation/native";

import NotificationBell from "../components/ui/NotificationBell";
import HeaderText from "../components/ui/HeaderText";
import NormalText from "../components/ui/NormalText";
import PaymentCard from "../components/Cards/PaymentCard";
import PrimaryButton from "../components/ui/PrimaryButton";

export default function PaymentScreen({ route, navigation }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const doctor = route.params.doctor;
  const session_data = route.params.session_data;

  function navigateToSummary() {
    navigation.navigate("SummaryScreen");
  }

  const paymentOptions = [
    {
      text: "Pay with mobile money",
      img1: require("../assets/images/mpesa.png"),
      img2: require("../assets/images/airtel.png"),
      keyProp: "mobile",
    },
    {
      text: "Pay with Credit Card",
      img1: require("../assets/images/visa.png"),
      img2: require("../assets/images/mastercard.png"),
      keyProp: "card",
    },
  ];

  function handlePaymentOption(keyProp) {
    setSelectedOption(keyProp);
  }
  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <NotificationBell />
      <ScrollView>
        <View>
          <HeaderText>Payment Methods</HeaderText>
          <View style={styles.viewCard}>
            <NormalText>Choose your preferred method of payment</NormalText>
            <View>
              {paymentOptions.map((option, index) => (
                <PaymentCard
                  key={index}
                  text={option.text}
                  img1={option.img1}
                  img2={option.img2}
                  onPress={() => handlePaymentOption(option.keyProp)}
                  isSelected={selectedOption === option.keyProp}
                />
              ))}
            </View>
          </View>
          <PrimaryButton onPress={navigateToSummary}>Next</PrimaryButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  viewCard: {
    flex: 1,
    margin: 5,
    borderRadius: 8,
    elevation: 4,
    padding: 10,
    // IOS
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    backgroundColor: "white",
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 2,
    backgroundColor: "white",
  },
});
