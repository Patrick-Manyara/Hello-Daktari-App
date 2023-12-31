import React, { useContext, useState } from "react";
import { Alert } from "react-native";
import { createDoctor } from "../../util/auth";
import { AuthContext } from "../../store/auth-context";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import { SafeAreaView } from "react-native-safe-area-context";

import DoctorSignUp from "../../components/Auth/DoctorSignUp";
import HeaderText from "../../components/ui/HeaderText";
import NormalText from "../../components/ui/NormalText";

import { globalStyles } from "../../constants/globalcss";

export default function DoctorSignUpScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function signUpHandler({
    email,
    password,
    fullname,
    phone,
    license,
    bio,
  }) {
    setIsAuthenticating(true);
    try {
      const token = await createDoctor(
        email,
        password,
        fullname,
        phone,
        license,
        bio
      );
      if (token === false) {
        Alert.alert("Authentication Failed!", "Could not sign you up!");
        setIsAuthenticating(false);
      } else {
        authCtx.authenticate(token);
        setIsAuthenticating(false);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Authentication Failed!", "Could not sign you up!");
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Just a sec while we set up your account" />;
  }

  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <HeaderText styleProp={globalStyles.centerText}>
        Hello Daktari Doctor App
      </HeaderText>
      <NormalText styleProp={globalStyles.centerText}>Welcome Doc</NormalText>
      <DoctorSignUp onAuthenticate={signUpHandler} />
    </SafeAreaView>
  );
}
