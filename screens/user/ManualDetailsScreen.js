import React, { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";

import { AuthContext } from "../../store/auth-context";
import { Path } from "../../constants/path";

import LoadingOverlay from "../../components/ui/LoadingOverlay";
import NotificationBell from "../../components/ui/NotificationBell";
import HeaderText from "../../components/ui/HeaderText";
import PrimaryButton from "../../components/ui/PrimaryButton";
import VisitOption from "../../components/Cards/VisitOption";
import NormalText from "../../components/ui/NormalText";
import UrgencyCard from "../../components/Cards/UrgencyCard";

import { globalStyles } from "../../constants/globalcss";

export default function ManualDetailsScreen({ navigation }) {
  //TOKEN
  const authCtx = useContext(AuthContext);
  const [hasDoctor, setHasDoctor] = useState(false);
  const token = authCtx.token;

  // SPECIALTIES

  const [specialties, setSpecialties] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

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
    if (token.doctor_id != null) {
      setHasDoctor(true);
    }
  }, [token]);

  //VISIT TYPE AND CHANNEL

  const [enteredVisitType, setEnteredVisitType] = useState(null);
  const [enteredChannel, setEnteredChannel] = useState("");

  const visitTypes = [
    { name: "home", img: require("../../assets/images/home.png") },
    { name: "online", img: require("../../assets/images/camera.png") },
    { name: "physical", img: require("../../assets/images/hospital.png") },
  ];

  const handleVisitTypeClick = (name) => {
    setEnteredVisitType(name);
  };

  const channels = [
    { name: "audio", img: require("../../assets/images/wave.png") },
    { name: "video", img: require("../../assets/images/camera.png") },
    { name: "message", img: require("../../assets/images/comment.png") },
  ];

  const handleChannelClick = (name) => {
    setEnteredChannel(name);
  };

  //REBOOKING
  const [selectedOption, setSelectedOption] = useState(null);

  const rebookOptions = [
    {
      text: "Rebook With The Same Doctor",
      keyProp: "rebook",
    },
    {
      text: "Find A New Doctor",
      keyProp: "new",
    },
  ];

  function handleRebookOption(keyProp) {
    setSelectedOption(keyProp);
  }

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

  const baseUrl = Path.API_URL + "session.php";
  let queryParams;
  if (selectedOption === "rebook") {
    queryParams = `action=rebook`;
  } else if (selectedOption === "new") {
    queryParams = `action=manual`;
  }

  const url = `${baseUrl}?${queryParams}`;

  let submitForm = async () => {
    try {
      if (enteredVisitType != null) {
        setUploading(true);

        const fd = new FormData();
        fd.append("specialty", selectedSpecialty);
        fd.append("visitType", enteredVisitType);
        if (enteredChannel != "") {
          fd.append("channel", enteredChannel);
        }
        fd.append("user_id", token.user_id);

        let res = await fetch(url, {
          method: "POST",
          body: fd,
        });
        if (res.ok) {
          let responseJson = await res.json();
          if (responseJson.type === "new") {
            navigation.navigate("AllDoctorsScreen", {
              doctors: responseJson.doctors,
              session_data: responseJson.session_data,
            });
          } else if (responseJson.type === "rebook") {
            navigation.navigate("DoctorProfileScreen", {
              doctor: responseJson.doctor,
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
        <ScrollView>
          <HeaderText>Consult A Specialist</HeaderText>
          <NormalText>
            Seamlessly schedule both virtual and physical appointments according
            to your convenience.
          </NormalText>
          {hasDoctor ? (
            <View>
              <NormalText
                fontProp="poppins-semibold"
                styleProp={{ marginVertical: 5 }}
              >
                You already have a doctor registered to your account. Would you
                like to rebook a session with the same doctor or find a new
                doctor.
              </NormalText>

              <View>
                {rebookOptions.map((option, index) => (
                  <UrgencyCard
                    key={index}
                    text={option.text}
                    onPress={() => handleRebookOption(option.keyProp)}
                    isSelected={selectedOption === option.keyProp}
                  />
                ))}
              </View>

              {selectedOption === "rebook" && (
                <View style={{ marginVertical: 5 }}>
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
                  <PrimaryButton onPress={submitForm}>
                    Proceed With Same Doctor
                  </PrimaryButton>
                </View>
              )}

              {selectedOption === "new" && (
                <View>
                  {specialties.length > 0 && (
                    <Picker
                      style={[
                        globalStyles.disabledContainer,
                        styles.customInput,
                      ]}
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

                  <PrimaryButton onPress={submitForm}>
                    Find New Doctor
                  </PrimaryButton>
                </View>
              )}
            </View>
          ) : (
            <View>
              <NormalText
                fontProp="poppins-semibold"
                styleProp={{ marginVertical: 5 }}
              >
                Select a specialist category and enter your preferred visit
                type, then proceed to select the doctor that best suits your
                preferences.
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

                <PrimaryButton onPress={submitForm}>
                  Find New Doctor
                </PrimaryButton>
              </View>
            </View>
          )}

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
