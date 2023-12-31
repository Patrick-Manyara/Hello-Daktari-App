import { useContext, useState } from "react";
import AuthContent from "../../components/Auth/AuthContent";
import { createUser } from "../../util/auth";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../../store/auth-context";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function signUpHandler({ email, password, name, phone }) {
    setIsAuthenticating(true);
    // try {
    //   const token = await createUser(email, password, name, phone);
    //   authCtx.authenticate(token);
    // } catch (error) {
    //   Alert.alert("Authentication Failed!", "Could not log you in!");
    //   setIsAuthenticating(false);
    // }

    try {
      const token =  await createUser(email, password, name, phone);
      if (token === false) {
        Alert.alert("Authentication Failed!", "Could not sign you up!");
      } else {
        authCtx.authenticate(token);
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
    <AuthContent
      headerText="Create An Account"
      onAuthenticate={signUpHandler}
    />
  );
}

export default SignupScreen;
