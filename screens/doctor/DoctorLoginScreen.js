import { useState, useContext } from "react";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../store/auth-context";

import { doctorLogin } from "../../util/auth";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import DoctorLogin from "../../components/Auth/DoctorLogin";

import HeaderText from "../../components/ui/HeaderText";
import NormalText from "../../components/ui/NormalText";

import { globalStyles } from "../../constants/globalcss";

export default function DoctorLoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await doctorLogin(email, password);
      if (token === false) {
      } else {
        authCtx.authenticate(token);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Authentication Failed!", "Could not log you in!");
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }
  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <HeaderText styleProp={globalStyles.centerText}>
        Hello Daktari Doctor App
      </HeaderText>
      <NormalText styleProp={globalStyles.centerText}>Welcome Doc</NormalText>
      <DoctorLogin onAuthenticate={loginHandler} />
    </SafeAreaView>
  );
}
