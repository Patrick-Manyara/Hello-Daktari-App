import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PagerView from "react-native-pager-view";
import { globalStyles } from "../constants/globalcss";
import { Dimensions, Text, StyleSheet, View, ScrollView } from "react-native";
import TabBlocks from "../components/Blocks/TabBlocks";
import TransparentButton from "../components/ui/TransparentButton";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import HeaderText from "../components/ui/HeaderText";

export default function ChoiceScreen() {
  const navigation = useNavigation();

  function navigateToScreen(screenName) {
    navigation.navigate(screenName);
  }
  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <ScrollView>
        <View>
          <HeaderText>Access Hello Daktari as a doctor or patient?</HeaderText>
          <View>
            <PrimaryButton
              onPress={() => navigateToScreen("DoctorLoginScreen")}
            >
              Doctor
            </PrimaryButton>
            <PrimaryButton onPress={() => navigateToScreen("LoginScreen")}>
              User
            </PrimaryButton>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
