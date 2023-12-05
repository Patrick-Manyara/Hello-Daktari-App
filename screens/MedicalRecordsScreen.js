import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  ToastAndroid,
  Alert,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as DocumentPicker from "expo-document-picker";

import { Path } from "../constants/path";
import { AuthContext } from "../store/auth-context";

import NotificationBell from "../components/ui/NotificationBell";
import HeaderText from "../components/ui/HeaderText";
import PrimaryButton from "../components/ui/PrimaryButton";
import UploadInput from "../components/FormElements/UploadInput";

import { globalStyles } from "../constants/globalcss";
import NormalText from "../components/ui/NormalText";

export default function MedicalRecordsScreen({ navigation }) {
  //TOKEN
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  //UPLOADS

  const [enteredFileName, setEnteredFileName] = useState("");

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "upload_name":
        setEnteredFileName(enteredValue);
        break;
    }
  }

  const [enteredRecords, setEnteredRecords] = useState("");
  const [enteredRecordsName, setEnteredRecordsName] = useState("");

  const selectFile2 = async () => {
    let r = await DocumentPicker.getDocumentAsync({
      type: "application/pdf/*",
    });
    if (r.canceled == false) {
      setEnteredRecords(r);
      setEnteredRecordsName(r.name);
      ToastAndroid.show("Medical records loaded", ToastAndroid.SHORT);
    }
  };

  const NAME2 = () => {
    if (enteredRecords == null) {
      return <Text></Text>;
    } else {
      return <Text>{enteredRecords.name}</Text>;
    }
  };

  //RENDER

  const _maybeRenderUploadingOverlay = () => {
    if (uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "rgba(0,0,0,0.4)",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  //SUBMISSION

  const [uploading, setUploading] = useState(false);

  const url = Path.API_URL + "records.php";

  let submitForm = async () => {
    try {
      if (enteredRecords != null && enteredFileName != "") {
        setUploading(true);

        const data = new FormData();

        const fileToUpload2 = enteredRecords;

        data.append("upload_file", {
          type: "application/pdf",
          uri: enteredRecords.assets[0].uri,
          name: enteredRecords.assets[0].name,
        });
        data.append("user_id", token.user_id);
        data.append("upload_name", enteredFileName);

        let res = await fetch(url, {
          method: "POST",
          body: data,
          headers: {
            "Content-Type": "multipart/form-data; ",
          },
        });

        if (res.ok) {
          let responseJson = await res.json();
          if (responseJson.data === 1) {
            navigation.navigate("BasePaymentScreen", {
              from: responseJson.from,
              table_id: responseJson.table_id,
            });
          } else if (responseJson.data === 2) {
            navigation.navigate("SuccessScreen");
          } else {
            Alert.alert("Error");
            console.log("error here");
          }
        } else {
          // Handle non-successful HTTP status codes here
          console.log("error here");
        }

        setUploading(false);
      } else {
        setUploading(false);
        alert("Please fill all the fields first");
      }
    } catch (error) {
      // Handle any errors that occur during the try block
      console.error("An error occurred:", error);
      // You can also display an error message to the user if needed
      // alert("An error occurred while submitting the form.");
    }
  };

  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <NotificationBell />
      <ScrollView>
        <HeaderText>Upload Your Medical Records</HeaderText>
        <NormalText>
          Store your valuable medical records including previous prescriptions,
          laboratory and imaging reports among others. Access them anytime,
          anywhere for a smooth and consistent healthcare journey.
        </NormalText>
        <View>
          <TextInput
            style={globalStyles.input}
            placeholder="Label or File Name"
            placeholderTextColor="black"
            onChangeText={updateInputValueHandler.bind(this, "upload_name")}
            value={enteredFileName}
          />

          <UploadInput txt="Upload Records" onPress={selectFile2} />

          <NAME2 />
          <PrimaryButton onPress={submitForm}>Submit</PrimaryButton>
        </View>
        {_maybeRenderUploadingOverlay()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  customInput: {
    height: 50,
    paddingLeft: 5,
    paddingRight: 5,
    paddingVertical: 8,
    marginVertical: 2,
  },
});
