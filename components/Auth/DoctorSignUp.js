import { useState } from "react";
import { StyleSheet, View } from "react-native";

import Input from "./Input";
import PrimaryButton from "../ui/PrimaryButton";

export default function DoctorSignUp({ onAuthenticate }) {
  //INPUTS
  const [enteredName, setEnteredName] = useState("");
  const [enteredBio, setEnteredBio] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPhone, setEnteredPhone] = useState("");
  const [enteredLicense, setEnteredLicense] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

  //CREDENTIALS
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    fullname: false,
    bio: false,
    email: false,
    phone: false,
    license: false,
    password: false,
    confirmPassword: passwordsDontMatch,
  });

  const {
    fullname: nameIsInvalid,
    bio: bioIsInvalid,
    email: emailIsInvalid,
    phone: phoneIsInvalid,
    license: licenseIsInvalid,
    password: passwordIsInvalid,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "fullname":
        setEnteredName(enteredValue);
        break;
      case "bio":
        setEnteredBio(enteredValue);
        break;
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "phone":
        setEnteredPhone(enteredValue);
        break;
      case "license":
        setEnteredLicense(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

  //SUBMISSION

  function submitHandler() {
    fullname = enteredName.trim();
    bio = enteredBio.trim();
    email = enteredEmail.trim();
    phone = enteredPhone.trim();
    license = enteredLicense.trim();
    confirmPassword = enteredConfirmPassword.trim();
    password = enteredPassword.trim();

    const emailIsValid = email.includes("@");
    const bioIsValid = bio.length > 2;
    const nameIsInvalid = fullname.length > 2;
    const phoneIsValid = phone.length > 2;
    const licenseIsValid = license.length > 2;
    const passwordIsValid = password.length > 2;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !bioIsValid ||
      !nameIsInvalid ||
      !licenseIsValid ||
      !phoneIsValid ||
      !emailIsValid ||
      !passwordIsValid ||
      !passwordsAreEqual
    ) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        fullname: !nameIsValid,
        bio: !bioIsValid,
        phone: !phoneIsValid,
        email: !emailIsValid,
        license: !licenseIsValid,
        password: !passwordIsValid,
      });
      return;
    }
    onAuthenticate({ fullname, bio, phone, email, license, password });
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
