import { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Input from "./Input";
import FlatButton from "../ui/FlatButton";
import TransparentButton from "../ui/TransparentButton";

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
  });

  const {
    fullname: nameIsInvalid,
    bio: bioIsInvalid,
    email: emailIsInvalid,
    phone: phoneIsInvalid,
    license: licenseIsInvalid,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
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
    const nameIsValid = fullname.length > 2;
    const phoneIsValid = phone.length > 2;
    const licenseIsValid = license.length > 2;
    const passwordIsValid = password.length > 2;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !bioIsValid ||
      !nameIsValid ||
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
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({ fullname, bio, phone, email, license, password });
  }

  const navigation = useNavigation();

  function navigateToLogin() {
    navigation.navigate("DoctorLoginScreen");
  }

  return (
    <View>
      <Input
        label="Full Name"
        onUpdateValue={updateInputValueHandler.bind(this, "fullname")}
        value={enteredName}
        isInvalid={nameIsInvalid}
      />

      <Input
        label="Email Address"
        onUpdateValue={updateInputValueHandler.bind(this, "email")}
        value={enteredEmail}
        keyboardType="email-address"
        isInvalid={emailIsInvalid}
      />

      <Input
        label="Phone Number"
        onUpdateValue={updateInputValueHandler.bind(this, "phone")}
        value={enteredPhone}
        isInvalid={phoneIsInvalid}
      />

      <Input
        label="License"
        onUpdateValue={updateInputValueHandler.bind(this, "license")}
        value={enteredLicense}
        isInvalid={licenseIsInvalid}
      />

      <Input
        label="Bio"
        onUpdateValue={updateInputValueHandler.bind(this, "bio")}
        value={enteredBio}
        isInvalid={bioIsInvalid}
        multiline={true}
        numberOfLines={6}
      />

      <Input
        label="Password"
        onUpdateValue={updateInputValueHandler.bind(this, "password")}
        secure
        value={enteredPassword}
        isInvalid={passwordIsInvalid}
      />

      <Input
        label="Confirm Password"
        onUpdateValue={updateInputValueHandler.bind(this, "confirmPassword")}
        secure
        value={enteredConfirmPassword}
        isInvalid={passwordsDontMatch}
      />

      <View style={styles.buttons}>
        <TransparentButton onPress={submitHandler}>
          Create Account
        </TransparentButton>
      </View>

      <View style={styles.buttons}>
        <FlatButton onPress={navigateToLogin}>Log in instead</FlatButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
});
