import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as DocumentPicker from "expo-document-picker";

import { Path } from "../../constants/path";
import { AuthContext } from "../../store/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import NotificationBell from "../../components/ui/NotificationBell";
import HeaderText from "../../components/ui/HeaderText";
import NormalText from "../../components/ui/NormalText";
import DisabledInput from "../../components/FormElements/DisabledInput";
import UploadInput from "../../components/FormElements/UploadInput";
import InputHybrid from "../../components/FormElements/InputHybrid";
import PrimaryButton from "../../components/ui/PrimaryButton";

import { globalStyles } from "../../constants/globalcss";

export default function EditDetailsScreen({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [doctor, setDoctor] = useState([]);

  //uploads
  const [enteredImage, setEnteredImage] = useState("");
  const [enteredImageName, setEnteredImageName] = useState("");

  useEffect(() => {
    setDoctor(route.params.token);
  }, [route.params]);

  const [inputs, setInputs] = useState({
    doctor_name: {
      value: doctor.doctor_name || "",
      isValid: true,
    },
    doctor_phone: {
      value: doctor.doctor_phone || "",
      isValid: true,
    },
    doctor_passport: {
      value: doctor.doctor_passport || "",
      isValid: true,
    },
    doctor_bio: {
      value: doctor.doctor_bio || "",
      isValid: true,
    },
    doctor_statement: {
      value: doctor.doctor_statement || "",
      isValid: true,
    },
    doctor_rate: {
      value: doctor.doctor_rate || "",
      isValid: true,
    },
    doctor_qualifications: {
      value: doctor.doctor_qualifications || "",
      isValid: true,
    },
    doctor_experience: {
      value: doctor.doctor_experience || "",
      isValid: true,
    },
    doctor_location: {
      value: doctor.doctor_location || "",
      isValid: true,
    },
    doctor_gender: {
      value: doctor.doctor_gender || "",
      isValid: true,
    },
    doctor_license: {
      value: doctor.doctor_license || "",
      isValid: true,
    },
  });

  function updateInputValueHandler(inputIdentifier, enteredValue) {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  //FILE UPLOADS

  const selectFile = async () => {
    let r = await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });
    console.log(r);
    if (r.canceled == false) {
      setEnteredImage(r);
      setEnteredImageName(r.name);
      ToastAndroid.show("Image loaded", ToastAndroid.SHORT);
    }
  };

  const NAME = () => {
    if (enteredImage == null) {
      return <NormalText></NormalText>;
    } else {
      return <NormalText>{enteredImage.name}</NormalText>;
    }
  };

  const baseUrl = Path.API_URL + "doctor.php";

  const submitProfileData = async () => {
    setIsSubmitting(true);

    const queryParams = `action=update`;
    const url = `${baseUrl}?${queryParams}`;
    const formData = new FormData();

    const fileToUpload = enteredImage;
    formData.append("doctor_name", inputs.doctor_name.value);
    formData.append("doctor_phone", inputs.doctor_phone.value);
    formData.append("doctor_passport", inputs.doctor_passport.value);
    formData.append("doctor_bio", inputs.doctor_bio.value);
    formData.append("doctor_gender", inputs.doctor_gender.value);
    formData.append("doctor_location", inputs.doctor_location.value);
    formData.append("doctor_license", inputs.doctor_license.value);

    formData.append("doctor_rate", inputs.doctor_rate.value);
    formData.append("doctor_experience", inputs.doctor_experience.value);
    formData.append(
      "doctor_qualifications",
      inputs.doctor_qualifications.value
    );

    formData.append("doctor_id", doctor.doctor_id);
    if (enteredImage != "") {
      formData.append("doctor_image", {
        type: "image/*",
        uri: enteredImage.assets[0].uri,
        name: enteredImage.assets[0].name,
      });
    }
    try {
      fetch(url, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data; ",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setIsSubmitting(false);
          newtoken = JSON.stringify(data.token);
          AsyncStorage.setItem("token", newtoken);
          navigation.navigate("DoctorDetailsScreen");
        })
        .catch((error) => {
          setIsSubmitting(false);
          console.error("Fetch error:", error);
        });
    } catch (error) {
      setIsSubmitting(false);
      console.error("Request setup error:", error);
    }
  };

  //RENDER

  const _maybeRenderUploadingOverlay = () => {
    if (isSubmitting) {
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
      <NotificationBell />
      <ScrollView>
        <HeaderText>Edit Your Profile</HeaderText>
        <NormalText>Edit your profile details.</NormalText>
        <View>
          <UploadInput txt="Upload A New Image" onPress={selectFile} />
          <NAME />
          <InputHybrid
            placeholder="Your Name"
            onUpdateValue={updateInputValueHandler.bind(this, "doctor_name")}
            value={doctor.doctor_name}
            isInvalid={false}
          />
          <DisabledInput
            placeholder="Email Address"
            txt={doctor.doctor_email}
          />
          <InputHybrid
            placeholder="Your Phone"
            onUpdateValue={updateInputValueHandler.bind(this, "doctor_phone")}
            value={doctor.doctor_phone}
            isInvalid={false}
          />
          <InputHybrid
            placeholder="Your Bio"
            onUpdateValue={updateInputValueHandler.bind(this, "doctor_bio")}
            value={doctor.doctor_bio}
            isInvalid={false}
            multiline={true}
            numberOfLines={6}
          />

          <InputHybrid
            placeholder="Your Qualification"
            onUpdateValue={updateInputValueHandler.bind(
              this,
              "doctor_qualifications"
            )}
            value={doctor.doctor_qualifications}
            isInvalid={false}
            multiline={true}
            numberOfLines={6}
          />

          <InputHybrid
            placeholder="Your Statement"
            onUpdateValue={updateInputValueHandler.bind(
              this,
              "doctor_statement"
            )}
            value={doctor.doctor_statement}
            isInvalid={false}
            multiline={true}
            numberOfLines={6}
          />

          <InputHybrid
            placeholder="Your Hourly Rates"
            onUpdateValue={updateInputValueHandler.bind(this, "doctor_rate")}
            value={doctor.doctor_rate}
            isInvalid={false}
          />

          <InputHybrid
            placeholder="Your Weight"
            onUpdateValue={updateInputValueHandler.bind(
              this,
              "doctor_location"
            )}
            value={doctor.doctor_location}
            isInvalid={false}
          />
          <InputHybrid
            placeholder="Your Gender"
            onUpdateValue={updateInputValueHandler.bind(this, "doctor_gender")}
            value={doctor.doctor_gender}
            isInvalid={false}
          />
          <InputHybrid
            placeholder="Your License"
            onUpdateValue={updateInputValueHandler.bind(this, "doctor_license")}
            value={doctor.doctor_license}
            isInvalid={false}
          />
          <PrimaryButton onPress={submitProfileData}>
            Edit Profile
          </PrimaryButton>
        </View>
        {_maybeRenderUploadingOverlay()}
      </ScrollView>
    </SafeAreaView>
  );
}
