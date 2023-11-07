import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  ToastAndroid,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../store/auth-context";
import * as DocumentPicker from "expo-document-picker";
import { Datepicker, Layout } from "@ui-kitten/components";

import NotificationBell from "../components/ui/NotificationBell";
import HeaderText from "../components/ui/HeaderText";
import Input from "../components/Auth/Input";
import PrimaryButton from "../components/ui/PrimaryButton";
import VisitOption from "../components/Cards/VisitOption";
import UploadInput from "../components/FormElements/UploadInput";

import { globalStyles } from "../constants/globalcss";

import { Path } from "../constants/path";
import { Picker } from "@react-native-picker/picker";

export default function AutoDetailsScreen({ navigation }) {
  //TOKEN
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  //DATE TIME
  const [date, setDate] = useState(new Date());

  const [selectedTimeRange, setSelectedTimeRange] = useState(null);

  const timeRangeOptions = [];
  for (let i = 8; i <= 20; i += 2) {
    const startTime = i.toString().padStart(2, "0") + ":00";
    const endTime = `${i + 2}:00`;
    const label = `${startTime} - ${endTime}`;
    timeRangeOptions.push({ label, value: i });
  }

  //VISIT TYPE AND CHANNEL

  const [enteredVisitType, setEnteredVisitType] = useState(null);
  const [enteredChannel, setEnteredChannel] = useState("");

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

  const baseurl = Path.API_URL + "session.php";
  const queryParams = `action=auto`;
  const url = `${baseurl}?${queryParams}`;

  let submitForm = async () => {
    try {
      if (
        date != null &&
        selectedTimeRange != null &&
        enteredVisitType != null
      ) {
        setUploading(true);

        const data = new FormData();

        const originalDate = new Date(date);

        // Add one day (24 hours) to the date
        originalDate.setDate(originalDate.getDate() + 1);

        // Format the date as YYYY-MM-DD
        const formattedDate = originalDate.toISOString().split("T")[0];

        data.append("date", formattedDate);
        data.append("time", selectedTimeRange);
        data.append("visitType", enteredVisitType);
        if (enteredChannel != "") {
          data.append("channel", enteredChannel);
        }
        data.append("user_id", token.user_id);

        let res = await fetch(url, {
          method: "POST",
          body: data,
        });
        console.log(data);
        if (res.ok) {
          let responseJson = await res.json();
          if (responseJson.data === true) {
            navigation.navigate("DoctorProfileScreen", {
              doctor: responseJson.doctor,
              session_data: responseJson.session_data,
            });
          } else {
            Alert.alert(responseJson.message);
            console.log(responseJson);
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
      Alert.alert("An error occured when submitting the form");
    }
  };

  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <NotificationBell />
      <ScrollView>
        <HeaderText>Consult Available Doctor</HeaderText>
        <View>
          <Layout style={styles.container} level="1">
            <Datepicker
              date={date}
              onSelect={(nextDate) => setDate(nextDate)}
            />
          </Layout>

          <Picker
            style={[globalStyles.disabledContainer, styles.customInput]}
            selectedValue={selectedTimeRange}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedTimeRange(itemValue);
            }}
          >
            <Picker.Item label="Time" value={null} />
            {timeRangeOptions.map((item) => (
              <Picker.Item
                key={item.value}
                label={item.label}
                value={item.label}
              />
            ))}
          </Picker>

          <HeaderText styleProp={globalStyles.centerText}>
            Type of visit
          </HeaderText>
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

          {enteredVisitType === "online" && (
            <View>
              <HeaderText styleProp={globalStyles.centerText}>
                Channel
              </HeaderText>

              <View style={globalStyles.optionContainer}>
                {channels.map((channel, index) => (
                  <VisitOption
                    key={index}
                    style={globalStyles.optionColumn}
                    name={channel.name}
                    img={channel.img}
                    onPress={() => handleChannelClick(channel.name)}
                    isSelected={enteredChannel === channel.name}
                  />
                ))}
              </View>
            </View>
          )}

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
