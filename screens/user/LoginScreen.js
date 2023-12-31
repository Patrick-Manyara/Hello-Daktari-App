import { useState, useContext } from "react";
import AuthContent from "../../components/Auth/AuthContent";
import { Alert } from "react-native";
import { login } from "../../util/auth";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import { AuthContext } from "../../store/auth-context";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      if (token === false) {
        Alert.alert("Authentication Failed!", "Could not log you in!");
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
  return <AuthContent isLogin headerText = "Welcome Back" onAuthenticate={loginHandler} />;
}

export default LoginScreen;
