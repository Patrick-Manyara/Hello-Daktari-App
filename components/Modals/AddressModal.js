import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Pressable, Modal } from "react-native";
import { globalStyles } from "../../constants/globalcss";
import { Colors } from "../../constants/styles";
import PrimaryButton from "../ui/PrimaryButton";
import NormalText from "../ui/NormalText";
import { useNavigation } from "@react-navigation/native";
import Input from "../Auth/Input";

export default function ({ visible, closeModal, isEdit, addressData }) {
  const [enteredAddressName, setEnteredAddressName] = useState("");
  const [enteredAddressLabel, setEnteredAddressLabel] = useState("");
  const [enteredAddressLocation, setEnteredAddressLocation] = useState("");
  const [enteredAddressPhone, setEnteredAddressPhone] = useState("");

  const {
    address_name: addressNameIsInvalid,
    address_label: addressLabelIsInvalid,
    address_location: addressLocationIsInvalid,
    address_phone: addressPhoneIsInvalid,
  } = dataIsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "address_name":
        setEnteredAddressName(enteredValue);
        break;
      case "address_label":
        setEnteredAddressLabel(enteredValue);
        break;
      case "address_location":
        setEnteredAddressLocation(enteredValue);
        break;
      case "password":
        setEnteredAddressPhone(enteredValue);
        break;
    }
  }

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View>
        <Input
          label="Address Name"
          onUpdateValue={updateInputValueHandler.bind(this, "address_name")}
          value={enteredAddressName}
          isInvalid={addressNameIsInvalid}
        />

        <Input
          label="Address Label"
          onUpdateValue={updateInputValueHandler.bind(this, "address_label")}
          value={enteredAddressLabel}
          isInvalid={addressLabelIsInvalid}
        />

        <Input
          label="Address Location"
          onUpdateValue={updateInputValueHandler.bind(this, "address_location")}
          value={enteredAddressLocation}
          isInvalid={addressLocationIsInvalid}
        />

        <Input
          label="Address Phone"
          onUpdateValue={updateInputValueHandler.bind(this, "address_phone")}
          value={enteredAddressPhone}
          isInvalid={addressPhoneIsInvalid}
        />
      </View>
      {isEdit ? (
        <PrimaryButton onPress={updateAddress}>Update Address</PrimaryButton>
      ) : (
        <PrimaryButton onPress={saveAddress}>Save Address</PrimaryButton>
      )}
      <PrimaryButton onPress={closeModal}>Close Modal</PrimaryButton>
    </Modal>
  );
}
