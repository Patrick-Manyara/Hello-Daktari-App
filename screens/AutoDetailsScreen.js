import axios from "axios";
import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCloudUpload } from "@fortawesome/free-solid-svg-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../constants/globalcss";
import NotificationBell from "../components/ui/NotificationBell";
import HeaderText from "../components/ui/HeaderText";
import Input from "../components/Auth/Input";
import PrimaryButton from "../components/ui/PrimaryButton";
import VisitOption from "../components/Cards/VisitOption";
import { AuthContext } from "../store/auth-context";

import { useNavigation } from "@react-navigation/native";

import * as DocumentPicker from "expo-document-picker";

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
  const [uploading, setUploading] = React.useState(false);
  //uploads

  const [enteredVisitType, setEnteredVisitType] = useState(null);
  const [enteredChannel, setEnteredChannel] = useState(null);

  //CHANNELS AND VISIT TYPE

  const visitTypes = [
    { name: "home", img: require("../assets/images/home.png") },
    { name: "online", img: require("../assets/images/camera.png") },
    { name: "physical", img: require("../assets/images/hospital.png") },
  ];

  const handleVisitTypeClick = (name) => {
    setEnteredVisitType(name);
  };

  const channels = [
    { name: "audio", img: require("../assets/images/wave.png") },
    { name: "video", img: require("../assets/images/camera.png") },
    { name: "message", img: require("../assets/images/comment.png") },
  ];

  const handleChannelClick = (name) => {
    setEnteredChannel(name);
  };

  //FILE UPLOADS

  const selectFile = async () => {
    let r = await DocumentPicker.getDocumentAsync({
      type: "application/pdf/*",
    });
    if (r.canceled == false) {
      setEnteredPrescription(r);
      setEnteredPrescriptionName(r.name);
    }
  };

  const selectFile2 = async () => {
    let r = await DocumentPicker.getDocumentAsync({
      type: "application/pdf/*",
    });
    if (r.canceled == false) {
      setEnteredRecords(r);
      setEnteredRecordsName(r.name);
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

  let submitForm = async () => {
    if (
      enteredDate != null &&
      enteredTime != null &&
      enteredPrescription != null &&
      enteredRecords != null &&
      enteredVisitType != null &&
      enteredChannel != null
    ) {
      setUploading(true);

      const fileToUpload = enteredPrescription;
      const fileToUpload2 = enteredRecords;

      const data = new FormData();
      data.append("date", enteredDate);
      data.append("time", enteredTime);
      data.append("visitTpe", enteredVisitType);
      data.append("channel", enteredChannel);
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
      let res = await fetch(
        "https://hello.angacinemas.com/endpoints/auto_doctor.php",
        {
          method: "post",
          body: data,
          headers: {
            "Content-Type": "multipart/form-data; ",
          },
        }
      );

      let responseJson = await res.json();
      console.log(responseJson);
      if (responseJson.status == 1) {
        console.log(responseJson);
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
        <HeaderText>Enter Your Details!</HeaderText>
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
          <Button title="Upload Prescriptions" onPress={selectFile} />
          <NAME />
          <Button title="Upload Medical Records" onPress={selectFile2} />
          <NAME2 />

          <HeaderText>Type of visit</HeaderText>
          <View style={styles.container}>
            {visitTypes.map((visitType, index) => (
              <VisitOption
                key={index}
                style={styles.column}
                name={visitType.name}
                img={visitType.img}
                onPress={() => handleVisitTypeClick(visitType.name)}
                isSelected={enteredVisitType === visitType.name}
              />
            ))}
          </View>

          <HeaderText>Channel</HeaderText>
          <View style={styles.container}>
            {channels.map((channel, index) => (
              <VisitOption
                key={index}
                style={styles.column}
                name={channel.name}
                img={channel.img}
                onPress={() => handleChannelClick(channel.name)}
                isSelected={enteredChannel === channel.name}
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

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
  column: {
    flexBasis: "33.333%",
    alignItems: "center",
  },
});
