import React, { useState, useContext, useEffect } from "react";
import { Alert, ScrollView, StyleSheet, TextInput, ActivityIndicator, View } from "react-native";
import NotificationBell from "../../components/ui/NotificationBell";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import HeaderText from "../../components/ui/HeaderText";
import { globalStyles } from "../../constants/globalcss";
import { SafeAreaView } from "react-native-safe-area-context";
import UrgencyCard from "../../components/Cards/UrgencyCard";
import NormalText from "../../components/ui/NormalText";
import { Path } from "../../constants/path";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { Picker } from "@react-native-picker/picker";
import Input from "../../components/Auth/Input";
import { useNavigation } from "@react-navigation/native";

export default function NewScheduleScreen({ route }) {
  const doctor = route.params.doctor;
  const navigation = useNavigation();
  //OPTIONS
  const [selectedOption, setSelectedOption] = useState(null);

  const scheduleOptions = [
    {
      text: "Daily",
      keyProp: "daily",
    },
    {
      text: "Individual days",
      keyProp: "individual",
    },
  ];

  function handleScheduleOption(keyProp) {
    setSelectedOption(keyProp);
  }

  //START TIME
  const [selectedStartRange, setStartRange] = useState(null);

  const startRangeOptions = [];
  for (let i = 8; i <= 12; i += 1) {
    const startTime = i.toString().padStart(2, "0") + ":00";

    const label = `${startTime}`;
    startRangeOptions.push({ label, value: i });
  }

  //END TIME
  const [selectedEndRange, setEndRange] = useState(null);

  const endRangeOptions = [];
  for (let i = 12; i <= 20; i += 1) {
    const endTime = `${i}:00`;
    const label = `${endTime}`;
    endRangeOptions.push({ label, value: i });
  }

  //INPUT HANDLING
  const [startTime, setStartTime] = useState(null);
  const [enteredInterval, setInterval] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [enteredBreak, setBreak] = useState(null);

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "startTime":
        setStartTime(enteredValue);
        break;
      case "interval":
        setInterval(enteredValue);
        break;
      case "endtime":
        setEndTime(enteredValue);
        break;
      case "break":
        setBreak(enteredValue);
        break;
    }
  }

  const renderDailyInputs = (
    updateInputValueHandler,
    enteredBreak,
    selectedEndRange,
    selectedStartRange,
    enteredInterval
  ) => {
    return (
      <View>
        <Picker
          style={[globalStyles.disabledContainer, styles.customInput]}
          selectedValue={selectedStartRange}
          onValueChange={(itemValue, itemIndex) => {
            setStartRange(itemValue);
          }}
        >
          <Picker.Item label="Start Time" value={null} />
          {startRangeOptions.map((item) => (
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.label}
            />
          ))}
        </Picker>

        <Input
          label="Interval"
          keyboardType="number-pad"
          onUpdateValue={updateInputValueHandler.bind(this, "interval")}
          value={enteredInterval}
          inputStyle={{ backgroundColor: "#F4F5F7", borderRadius: 10 }}
        />

        <Picker
          style={[globalStyles.disabledContainer, styles.customInput]}
          selectedValue={selectedEndRange}
          onValueChange={(itemValue, itemIndex) => {
            setEndRange(itemValue);
          }}
        >
          <Picker.Item label="End Time" value={null} />
          {endRangeOptions.map((item) => (
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.label}
            />
          ))}
        </Picker>

        <Input
          label="Breaks"
          keyboardType="number-pad"
          onUpdateValue={updateInputValueHandler.bind(this, "break")}
          value={enteredBreak}
          inputStyle={{ backgroundColor: "#F4F5F7", borderRadius: 10 }}
        />
      </View>
    );
  };

  //SUBMISSION
  const [uploading, setUploading] = useState(false);

  baseurl = Path.API_URL + "doctor.php";
  queryParams = `action=create_schedule`;
  url = `${baseurl}?${queryParams}`;

  let submitForm = async () => {
    try {
      if (
        selectedStartRange != null &&
        selectedEndRange != null &&
        enteredBreak != null &&
        enteredInterval != null
      ) {
        setUploading(true);

        const fd = new FormData();

        fd.append("interval", enteredInterval);
        fd.append("endTime", selectedEndRange);
        fd.append("startTime", selectedStartRange);
        fd.append("doctor_id", doctor.doctor_id);
        fd.append("break", enteredBreak);
        fd.append("option", selectedOption);

        let res = await fetch(url, {
          method: "POST",
          body: fd,
        });
        if (res.ok) {
          let responseJson = await res.json();
          if (responseJson.data === true) {
            Alert.alert("Success");
            navigation.navigate("ScheduleScreen");
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

  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <ScrollView>
        <View>
          {scheduleOptions.length > 0 && (
            <View>
              {scheduleOptions.map((option, index) => (
                <UrgencyCard
                  key={index}
                  text={option.text}
                  onPress={() => handleScheduleOption(option.keyProp)}
                  isSelected={selectedOption === option.keyProp}
                />
              ))}

              <View>
                {selectedOption == "daily" && (
                  <View>
                    {renderDailyInputs(
                      updateInputValueHandler,
                      enteredBreak,
                      selectedEndRange,
                      selectedStartRange,
                      enteredInterval
                    )}
                    <PrimaryButton onPress={submitForm}>Submit</PrimaryButton>
                  </View>
                )}

                {selectedOption == "individual" && (
                  <View>
                    <NormalText>individual</NormalText>
                  </View>
                )}
              </View>
            </View>
          )}
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
