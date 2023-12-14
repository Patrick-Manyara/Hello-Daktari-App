import { useState, useContext } from "react";
import DoctorAuthContent from "../../components/Auth/DoctorAuthContent";
import { Alert } from "react-native";
import { doctorLogin } from "../../util/auth";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import { AuthContext } from "../../store/auth-context";
import DoctorLogin from "../../components/Auth/DoctorLogin";

import HeaderText from "../../components/ui/HeaderText";
import { SafeAreaView } from "react-native-safe-area-context";

import { globalStyles } from "../../constants/globalcss";
import { Colors } from "../../constants/styles";

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
      <HeaderText>Sign Up</HeaderText>
      <DoctorLogin onAuthenticate={loginHandler} />
    </SafeAreaView>
  );
}
