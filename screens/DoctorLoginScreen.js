import { useState, useContext } from "react";
import DoctorAuthContent from "../components/Auth/DoctorAuthContent";
import { Alert } from "react-native";
import { login } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";

export default function DoctorLoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
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
    <DoctorAuthContent
      isLogin
      headerText="Welcome Back Doc"
      onAuthenticate={loginHandler}
    />
  );
}
