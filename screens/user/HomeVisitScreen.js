import React, { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../store/auth-context";
import { Picker } from "@react-native-picker/picker";

import { Path } from "../../constants/path";

import LoadingOverlay from "../../components/ui/LoadingOverlay";

import NotificationBell from "../../components/ui/NotificationBell";
import HeaderText from "../../components/ui/HeaderText";
import PrimaryButton from "../../components/ui/PrimaryButton";
import NormalText from "../../components/ui/NormalText";
import UrgencyCard from "../../components/Cards/UrgencyCard";

import { globalStyles } from "../../constants/globalcss";

export default function HomeVisitScreen({ navigation }) {
  //TOKEN
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  // SPECIALTIES

  const [specialties, setSpecialties] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  //URGENCY
  const [selectedOption, setSelectedOption] = useState(null);

  const urgencyOptions = [
    {
      text: "Urgent. Would like to see available doctor immediately.",
      keyProp: "urgent",
    },
    {
      text: "Scheduled. Select a date and time to see a doctor",
      keyProp: "scheduled",
    },
  ];

  function handleUrgencyOption(keyProp) {
    setSelectedOption(keyProp);
  }

  // FETCH

  const fetchSpecialties = () => {
    const fetchurl = Path.API_URL + "session.php?action=specialties";
    try {
      fetch(fetchurl)
        .then((response) => response.json())
        .then((data) => {
          setIsFetching(false);
          let arr = data.specialties;
          if (Array.isArray(arr)) {
            setSpecialties(data.specialties);
          } else {
            console.log("No specialties");
          }
        })
        .catch((error) => {
          setIsFetching(false);
          console.error("Fetch error:", error);
        });
    } catch (error) {
      setIsFetching(false);
      console.error("Request setup error:", error);
    }
  };

  useEffect(() => {
    fetchSpecialties();
  }, []);

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
  const queryParams = `action=home`;
  const url = `${baseurl}?${queryParams}`;

  let submitForm = async () => {
    try {
      if (selectedSpecialty != null) {
        setUploading(true);

        const fd = new FormData();

        fd.append("specialty", selectedSpecialty);
        fd.append("urgency", selectedOption);
        fd.append("user_id", token.user_id);

        let res = await fetch(url, {
          method: "POST",
          body: fd,
        });
        if (res.ok) {
          let responseJson = await res.json();
          if (responseJson.data === true) {
            navigation.navigate("AllDoctorsScreen", {
              doctors: responseJson.doctors,
              session_data: responseJson.session_data,
            });
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
      {isFetching ? (
        <LoadingOverlay message="Getting all doctor specialties" />
      ) : (
        <ScrollView style={{ flex: 1 }}>
          <HeaderText>Home Visit</HeaderText>
          <NormalText>
            Experience expert medical guidance through virtual consultations
            with our skilled doctors and specialists. Get professional advice,
            diagnosis, and treatment recommendations without leaving your home.
          </NormalText>
          <NormalText
            fontProp="poppins-semibold"
            styleProp={{ marginVertical: 5 }}
          >
            Select a specialist type and then proceed to select the doctor that
            best suits your preferences.
          </NormalText>
          <View>
            {specialties.length > 0 && (
              <Picker
                style={[globalStyles.disabledContainer, styles.customInput]}
                selectedValue={selectedSpecialty}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectedSpecialty(itemValue);
                }}
              >
                <Picker.Item label="Select a specialty" value={null} />
                {specialties.map((item) => (
                  <Picker.Item
                    key={item.doc_category_id}
                    label={item.doc_category_name}
                    value={item.doc_category_id}
                  />
                ))}
              </Picker>
            )}
          </View>
          <View>
            {urgencyOptions.map((option, index) => (
              <UrgencyCard
                key={index}
                text={option.text}
                onPress={() => handleUrgencyOption(option.keyProp)}
                isSelected={selectedOption === option.keyProp}
              />
            ))}
          </View>
          <View>
            <PrimaryButton onPress={submitForm}>Submit</PrimaryButton>
          </View>
          {_maybeRenderUploadingOverlay()}
        </ScrollView>
      )}
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
