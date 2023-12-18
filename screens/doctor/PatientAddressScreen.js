import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthContext } from "../../store/auth-context";
import { Path } from "../../constants/path";

import HeaderText from "../../components/ui/HeaderText";
import PrimaryButton from "../../components/ui/PrimaryButton";
import NotificationBell from "../../components/ui/NotificationBell";
import AddressCard from "../../components/Cards/AddressCard";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import NormalText from "../../components/ui/NormalText";

import { Colors } from "../../constants/styles";
import { globalStyles } from "../../constants/globalcss";
import AddressList from "../../components/Cards/AddressList";

export default function PatientAddressScreen({ route, navigation }) {
  const [addresses, setAddresses] = useState([]);
  const [isSettingState, setIsSettingState] = useState(true);
  const patient = route.params.patient;

  useEffect(() => {
    const assignStates = () => {
      if (route.params && route.params?.item) {
        setAddresses(route.params.item);
        setIsSettingState(false);
      }
    };

    assignStates(); // Call it once when the component mounts

    const unsubscribe = navigation.addListener("focus", () => {
      assignStates(); // Call it on focus events
    });

    return unsubscribe;
  }, [route.params, navigation]);

  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <NotificationBell />
      <ScrollView>
        {isSettingState ? (
          <LoadingOverlay message="setting data" />
        ) : (
          <View>
            <HeaderText>Addresses For : {patient.user_name}</HeaderText>
            {addresses.length > 0 ? (
              addresses.map((address) => (
                <AddressList
                  key={address.address_id}
                  location={address.address_name}
                  tag={address.address_label}
                  description={address.address_location}
                  phone={address.address_phone}
                />
              ))
            ) : (
              <View>
                <NormalText>You have not saved any addresses.</NormalText>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
