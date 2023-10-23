import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { globalStyles } from "../constants/globalcss";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderText from "../components/ui/HeaderText";
import NormalText from "../components/ui/NormalText";
import PrimaryButton from "../components/ui/PrimaryButton";
import NotificationBell from "../components/ui/NotificationBell";
import { useNavigation } from "@react-navigation/native";
import AddressCard from "../components/Cards/AddressCard";
import { Colors } from "../constants/styles";

export default function AddressScreen() {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigation = useNavigation();

  const navigateToPayment = () => {
    navigation.navigate("PaymentScreen");
  };

  const addresses = [
    {
      location: "Kiambu",
      tag: "home",
      description: "Kiambu Police Station",
      keyProp: "kiambu",
    },
    {
      location: "CBD",
      tag: "office",
      description: "View Park Towers",
      keyProp: "cbd",
    },
  ];

  function handleAddressSelection(keyProp) {
    setSelectedOption(keyProp);
    console.log(`Selected option: ${keyProp}`);
  }

  function editAddress() {}

  function removeAddress() {}

  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <NotificationBell />
      <ScrollView>
        <View>
          <HeaderText>Enter Your Address</HeaderText>
          <View>
            {addresses.map((address, index) => (
              <AddressCard
                key={index}
                location={address.location}
                tag={address.tag}
                description={address.description}
                editAddress={editAddress}
                removeAddress={removeAddress}
                onPress={() => handleAddressSelection(address.keyProp)}
                isSelected={selectedOption === address.keyProp}
              />
            ))}
          </View>
          <PrimaryButton styleProp={styles.blueBtn} onPress={navigateToPayment}>
            Add Address
          </PrimaryButton>
          <PrimaryButton onPress={navigateToPayment}>Next</PrimaryButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  blueBtn: {
    backgroundColor: Colors.mainBlue,
  },
});
