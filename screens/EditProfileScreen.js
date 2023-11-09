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

import { Path } from "../constants/path";
import { AuthContext } from "../store/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import NotificationBell from "../components/ui/NotificationBell";
import HeaderText from "../components/ui/HeaderText";
import NormalText from "../components/ui/NormalText";
import DisabledInput from "../components/FormElements/DisabledInput";
import UploadInput from "../components/FormElements/UploadInput";
import InputHybrid from "../components/FormElements/InputHybrid";
import PrimaryButton from "../components/ui/PrimaryButton";

import { globalStyles } from "../constants/globalcss";

export default function EditProfileScreen({ navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const authCtx = useContext(AuthContext);

  const [token, setToken] = useState("");

  //uploads
  const [enteredImage, setEnteredImage] = useState("");
  const [enteredImageName, setEnteredImageName] = useState("");

  useEffect(() => {
    setToken(authCtx.token);
  }, [authCtx.token]);

  const [inputs, setInputs] = useState({
    user_name: {
      value: authCtx.token ? authCtx.token.user_name : "",
      isValid: true,
    },
    user_phone: {
      value: authCtx.token ? authCtx.token.user_phone : "",
      isValid: true,
    },
    user_passport: {
      value: authCtx.token ? authCtx.token.user_passport : "",
      isValid: true,
    },
    user_dob: {
      value: authCtx.token ? authCtx.token.user_dob : "",
      isValid: true,
    },
    user_weight: {
      value: authCtx.token ? authCtx.token.user_weight : "",
      isValid: true,
    },
    user_height: {
      value: authCtx.token ? authCtx.token.user_height : "",
      isValid: true,
    },
    user_blood_group: {
      value: authCtx.token ? authCtx.token.user_blood_group : "",
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

  const baseurl = Path.API_URL + "profile.php";

  const submitProfileData = async () => {
    setIsSubmitting(true);

    const queryParams = `action=update`;
    const url = `${baseurl}?${queryParams}`;
    const body = new FormData();

    const fileToUpload = enteredImage;
    body.append("user_name", inputs.user_name.value);
    body.append("user_phone", inputs.user_phone.value);
    body.append("user_passport", inputs.user_passport.value);
    body.append("user_dob", inputs.user_dob.value);
    body.append("user_height", inputs.user_height.value);
    body.append("user_weight", inputs.user_weight.value);
    body.append("user_blood_group", inputs.user_blood_group.value);
    body.append("user_id", token.user_id);
    if (enteredImage != "") {
      body.append("user_image", {
        type: "image/*",
        uri: enteredImage.assets[0].uri,
        name: enteredImage.assets[0].name,
      });
    }
    try {
      fetch(url, {
        method: "POST",
        body: body,
        headers: {
          "Content-Type": "multipart/form-data; ",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setIsSubmitting(false);
          // console.log(data.token);
          newtoken = JSON.stringify(data.token);
          AsyncStorage.setItem("token", newtoken);
          navigation.navigate("Profile", { newtoken: data.token });
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
        <NormalText>
          Edit your profile details to make sure your healthcare experience is
          tailored to your preferences. Providing accurate information about
          yourself helps us connect you with the right doctors and services,
          ensuring that you receive care that suits your needs, location, and
          schedule.
        </NormalText>
        <View>
          <UploadInput txt="Upload A New Image" onPress={selectFile} />
          <NAME />
          <InputHybrid
            placeholder="Your Name"
            onUpdateValue={updateInputValueHandler.bind(this, "user_name")}
            value={inputs.user_name.value}
            isInvalid={!inputs.user_name.isValid}
          />
          <DisabledInput placeholder="Email Address" txt={token.user_email} />
          <InputHybrid
            placeholder="User Phone"
            onUpdateValue={updateInputValueHandler.bind(this, "user_phone")}
            value={inputs.user_phone.value}
            isInvalid={!inputs.user_phone.isValid}
          />
          <InputHybrid
            placeholder="User DOB"
            onUpdateValue={updateInputValueHandler.bind(this, "user_dob")}
            value={inputs.user_dob.value}
            isInvalid={!inputs.user_dob.isValid}
          />
          <InputHybrid
            placeholder="User Weight"
            onUpdateValue={updateInputValueHandler.bind(this, "user_weight")}
            value={inputs.user_weight.value}
            isInvalid={!inputs.user_weight.isValid}
          />
          <InputHybrid
            placeholder="User Height"
            onUpdateValue={updateInputValueHandler.bind(this, "user_height")}
            value={inputs.user_height.value}
            isInvalid={!inputs.user_height.isValid}
          />
          <InputHybrid
            placeholder="User Blood Group"
            onUpdateValue={updateInputValueHandler.bind(
              this,
              "user_blood_group"
            )}
            value={inputs.user_blood_group.value}
            isInvalid={!inputs.user_blood_group.isValid}
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
