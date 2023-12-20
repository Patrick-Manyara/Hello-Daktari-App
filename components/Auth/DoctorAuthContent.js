import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import FlatButton from "../ui/FlatButton";
import HeaderText from "../ui/HeaderText";

import DoctorLogin from "./DoctorLogin";
import DoctorSignUp from "./DoctorSignUp";

import { globalStyles } from "../../constants/globalcss";

export default function DoctorAuthContent({
  isLogin,
  onAuthenticate,
  headerText,
}) {
  const navigation = useNavigation();

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.replace("DoctorSignUp");
    } else {
      navigation.replace("DoctorLogin");
    }
  }
  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <HeaderText styleProp={globalStyles.centerText}>
        Hello Daktari Doctor App
      </HeaderText>
      <NormalText styleProp={globalStyles.centerText}>{headerText}</NormalText>
      <View style={styles.authContent}>
        {isLogin ? (
          <DoctorLogin onAuthenticate={onAuthenticate} />
        ) : (
          <DoctorSignUp onAuthenticate={onAuthenticate} />
        )}

        <View style={styles.buttons}>
          <FlatButton onPress={switchAuthModeHandler}>
            {isLogin ? "Create a new account" : "Log in instead"}
          </FlatButton>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  authContent: {
    marginHorizontal: 10,
    padding: 10,
  },
  buttons: {
    marginTop: 8,
  },
});
