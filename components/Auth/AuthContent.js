import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import FlatButton from "../ui/FlatButton";
import AuthForm from "./AuthForm";
import HeaderText from "../ui/HeaderText";
import NormalText from "../ui/NormalText";

import { globalStyles } from "../../constants/globalcss";

function AuthContent({ isLogin, onAuthenticate, headerText }) {
  const navigation = useNavigation();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    name: false,
    phone: false,
    confirmPassword: false,
  });

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.replace("Signup");
    } else {
      navigation.replace("Login");
    }
  }

  function submitHandler(credentials) {
    let { email, name, phone, password, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();
    name = name.trim();
    phone = phone.trim();

    const emailIsValid = email.includes("@");
    const nameIsValid = name.length > 2;
    const phoneIsValid = phone.length > 2;
    const passwordIsValid = password.length > 2;

    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!nameIsValid || !phoneIsValid || !passwordsAreEqual))
    ) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        name: !nameIsValid,
        phone: !phoneIsValid,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({ email, password, name, phone });
  }

  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <HeaderText styleProp={globalStyles.centerText}>
        Hello Daktari Client Account
      </HeaderText>
      <NormalText styleProp={globalStyles.centerText}>{headerText}</NormalText>
      <View style={styles.authContent}>
        <AuthForm
          isLogin={isLogin}
          onSubmit={submitHandler}
          credentialsInvalid={credentialsInvalid}
        />
        <View style={styles.buttons}>
          <FlatButton onPress={switchAuthModeHandler}>
            {isLogin ? "Create a new account" : "Log in instead"}
          </FlatButton>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginHorizontal: 10,
    padding: 10,
  },
  buttons: {
    marginTop: 8,
  },
});
