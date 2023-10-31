import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../store/auth-context";
import * as DocumentPicker from "expo-document-picker";

import NotificationBell from "../components/ui/NotificationBell";
import HeaderText from "../components/ui/HeaderText";
import Input from "../components/Auth/Input";
import PrimaryButton from "../components/ui/PrimaryButton";
import VisitOption from "../components/Cards/VisitOption";
import UploadInput from "../components/FormElements/UploadInput";

import { globalStyles } from "../constants/globalcss";

import { Path } from "../constants/path";

export default function AutoDetailsScreen({ navigation }) {
  //token fetching
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  //navigation

  const [enteredDate, setEnteredDate] = useState("");
  const [enteredTime, setEnteredTime] = useState("");

  //uploads
  const [enteredPrescription, setEnteredPrescription] = useState("");
  const [enteredPrescriptionName, setEnteredPrescriptionName] = useState("");
  const [enteredRecords, setEnteredRecords] = useState("");
  const [enteredRecordsName, setEnteredRecordsName] = useState("");
  const [uploading, setUploading] = useState(false);
  //uploads

  const [enteredVisitType, setEnteredVisitType] = useState(null);

  //VISIT TYPE

  const visitTypes = [
    { name: "home", img: require("../assets/images/home.png") },
    { name: "online", img: require("../assets/images/camera.png") },
    { name: "physical", img: require("../assets/images/hospital.png") },
  ];

  const handleVisitTypeClick = (name) => {
    setEnteredVisitType(name);
  };

  //FILE UPLOADS

  const selectFile = async () => {
    let r = await DocumentPicker.getDocumentAsync({
      type: "application/pdf/*",
    });
    if (r.canceled == false) {
      setEnteredPrescription(r);
      setEnteredPrescriptionName(r.name);
      ToastAndroid.show("Prescription loaded", ToastAndroid.SHORT);
    }
  };

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

  const NAME = () => {
    if (enteredPrescription == null) {
      return <Text></Text>;
    } else {
      return <Text>{enteredPrescription.name}</Text>;
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

  //DATE AND TIME INPUT HANDLER

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "date":
        setEnteredDate(enteredValue);
        break;
      case "time":
        setEnteredTime(enteredValue);
        break;
    }
  }
  
  //SUBMISSION

  const baseurl = Path.API_URL + "session.php";
  const queryParams = `action=auto`;
  const url = `${baseurl}?${queryParams}`;

  let submitForm = async () => {
    if (
      enteredDate != null &&
      enteredTime != null &&
      enteredPrescription != null &&
      enteredRecords != null &&
      enteredVisitType != null
    ) {
      setUploading(true);

      const fileToUpload = enteredPrescription;
      const fileToUpload2 = enteredRecords;

      const data = new FormData();
      data.append("date", enteredDate);
      data.append("time", enteredTime);
      data.append("visitTpe", enteredVisitType);
      data.append("user_id", token.user_id);
      data.append("prescription", {
        type: "application/pdf",
        uri: enteredPrescription.assets[0].uri,
        name: enteredPrescription.assets[0].name,
      });
      data.append("records", {
        type: "application/pdf",
        uri: enteredRecords.assets[0].uri,
        name: enteredRecords.assets[0].name,
      });
      let res = await fetch(url, {
        method: "post",
        body: data,
        headers: {
          "Content-Type": "multipart/form-data; ",
        },
      });

      let responseJson = await res.json();
      if (responseJson.status == 1) {
        // console.log(responseJson);
      }

      setUploading(false);
      navigation.navigate("DoctorProfileScreen", {
        doctor: responseJson.doctor,
        session_data: responseJson.session_data,
      });
    } else {
      alert("Please fill all the fields firsts");
    }
  };

  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <NotificationBell />
      <ScrollView>
        <HeaderText>Consult Available Doctor</HeaderText>
        <View>
          <Input
            label="Date"
            onUpdateValue={updateInputValueHandler.bind(this, "date")}
            value={enteredDate}
          />
          <Input
            label="Time"
            onUpdateValue={updateInputValueHandler.bind(this, "time")}
            value={enteredTime}
          />
          <UploadInput txt="Upload Prescriptions" onPress={selectFile} />
          <NAME />
          <UploadInput txt="Upload Medical Records" onPress={selectFile2} />

          <NAME2 />

          <HeaderText>Type of visit</HeaderText>
          <View style={globalStyles.optionContainer}>
            {visitTypes.map((visitType, index) => (
              <VisitOption
                key={index}
                style={globalStyles.optionColumn}
                name={visitType.name}
                img={visitType.img}
                onPress={() => handleVisitTypeClick(visitType.name)}
                isSelected={enteredVisitType === visitType.name}
              />
            ))}
          </View>

          <PrimaryButton onPress={submitForm}>Submit</PrimaryButton>
        </View>
        {_maybeRenderUploadingOverlay()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
