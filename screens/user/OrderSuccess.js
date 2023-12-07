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

export default function OrderSuccess() {
  const navigation = useNavigation();

  function navigateToHome() {
    navigation.navigate("Home2");
  }
  const emptyCart = async () => {
    try {
      await AsyncStorage.removeItem("cartItems");
    } catch (error) {
      console.error("Error emptying cart:", error);
    }
  };
  useEffect(() => {
    emptyCart();
  }, []);

  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <NotificationBell />
      <ScrollView>
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <Image
            style={styles.image}
            source={require("../assets/images/circle.png")}
          />
          <HeaderText styleProp={styles.title}>Payment Successful!</HeaderText>
          <NormalText>
            Your payment has been received and your details have been logged.
            Kindly check your email for more information. Thank you for choosing
            Hello Daktari
          </NormalText>
          <PrimaryButton onPress={navigateToHome}>Go Home</PrimaryButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "black",
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
