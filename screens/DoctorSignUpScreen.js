import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";

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
      const token = await createUser(
        email,
        password,
        fullname,
        phone,
        license,
        bio
      );
      if (token === false) {
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
    return <LoadingOverlay message="Still loading" />;
  }

  return (
    <DoctorAuthContent
      headerText="Sign Up Here"
      onAuthenticate={signUpHandler}
    />
  );
}
