import React, { useContext, useState } from "react";
import { StyleSheet, View, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { globalStyles } from "../constants/globalcss";

import NotificationBell from "../components/ui/NotificationBell";
import HeaderText from "../components/ui/HeaderText";
import PrimaryButton from "../components/ui/PrimaryButton";
import Input from "../components/Auth/Input";

import { Path } from "../constants/path";
import { AuthContext } from "../store/auth-context";

export default function AddressManager({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();

  const [isAdding, setIsAdding] = useState(false);

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  const addressToEdit = route.params?.address;
  const isEditing = !!addressToEdit;

  const [inputs, setInputs] = useState({
    address_name: {
      value: addressToEdit ? addressToEdit.address_name : "",
      isValid: true,
    },
    address_label: {
      value: addressToEdit ? addressToEdit.address_label : "",
      isValid: true,
    },
    address_location: {
      value: addressToEdit ? addressToEdit.address_location : "",
      isValid: true,
    },
    address_phone: {
      value: addressToEdit ? addressToEdit.address_phone : "",
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

  const baseurl = Path.API_URL + "addresses.php";

  const submitAddressData = async () => {
    setIsAdding(true);
    const queryParams = `action=update`;
    const url = `${baseurl}?${queryParams}`;
    const body = new FormData();
    body.append("address_name", inputs.address_name.value);
    body.append("address_label", inputs.address_label.value);
    body.append("address_phone", inputs.address_phone.value);
    body.append("address_location", inputs.address_location.value);
    body.append("address_id", addressToEdit.address_id);

    try {
      fetch(url, {
        method: "POST",
        body: body,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setIsAdding(false);
          navigation.navigate("AddressScreen");
        })
        .catch((error) => {
          setIsAdding(false);
          console.error("Fetch error:", error);
        });
    } catch (error) {
      setIsAdding(false);
      console.error("Request setup error:", error);
    }
  };

  const submitNewAddress = async () => {
    setIsAdding(true);
    const queryParams = `action=add`;
    const url = `${baseurl}?${queryParams}`;
    const body = new FormData();
    body.append("address_name", inputs.address_name.value);
    body.append("address_label", inputs.address_label.value);
    body.append("address_phone", inputs.address_phone.value);
    body.append("address_location", inputs.address_location.value);
    body.append("user_id", token.user_id);

    try {
      fetch(url, {
        method: "POST",
        body: body,
      })
        .then((response) => response.json())
        .then((data) => {
          setIsAdding(false);
          console.log(data);
          navigation.navigate("AddressScreen");
        })
        .catch((error) => {
          setIsAdding(false);
          console.error("Fetch error:", error);
        });
    } catch (error) {
      setIsAdding(false);
      console.error("Request setup error:", error);
    }
  };

  //RENDER

  const _maybeRenderUploadingOverlay = () => {
    if (isAdding) {
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
        <View>
          <HeaderText>Enter Your Address</HeaderText>
          <Input
            label="Address Name"
            onUpdateValue={updateInputValueHandler.bind(this, "address_name")}
            value={inputs.address_name.value}
            isInvalid={!inputs.address_name.isValid}
          />
          <Input
            label="Address Label"
            onUpdateValue={updateInputValueHandler.bind(this, "address_label")}
            value={inputs.address_label.value}
            isInvalid={!inputs.address_label.isValid}
          />
          <Input
            label="Address Location"
            onUpdateValue={updateInputValueHandler.bind(
              this,
              "address_location"
            )}
            value={inputs.address_location.value}
            isInvalid={!inputs.address_location.isValid}
          />
          <Input
            label="Address Phone Number"
            onUpdateValue={updateInputValueHandler.bind(this, "address_phone")}
            value={inputs.address_phone.value}
            isInvalid={!inputs.address_phone.isValid}
          />
        </View>
        <PrimaryButton
          onPress={isEditing ? submitAddressData : submitNewAddress}
        >
          {isEditing ? "Edit" : "Add"}
        </PrimaryButton>
        {_maybeRenderUploadingOverlay()}
      </ScrollView>
    </SafeAreaView>
  );
}
