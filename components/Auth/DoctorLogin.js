import { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
 
import Input from "./Input";
import PrimaryButton from "../ui/PrimaryButton";

export default function DoctorLogin({ onAuthenticate }) {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
  });

  const { email: emailIsInvalid, password: passwordIsInvalid } =
    credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    email = enteredEmail.trim();
    password = enteredPassword.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 2;

    if (!emailIsValid || !passwordIsValid) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        password: !passwordIsValid,
      });
      return;
    }
    onAuthenticate({ email, password });
  }

  return (
    <View style={styles.form}>
      <View>
        <Input
          label="Email Address"
          onUpdateValue={updateInputValueHandler.bind(this, "email")}
          value={enteredEmail}
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
        />

        <Input
          label="Password"
          onUpdateValue={updateInputValueHandler.bind(this, "password")}
          secure
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
        />

        <View style={styles.buttons}>
          <PrimaryButton onPress={submitHandler}>Log In</PrimaryButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
});
