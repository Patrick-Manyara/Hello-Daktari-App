import React, { useState, useEffect } from "react";
import {
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import HeaderText from "../../components/ui/HeaderText";
import NotificationBell from "../../components/ui/NotificationBell";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import PrescriptionCard from "../../components/Cards/PrescriptionCard";

import { globalStyles } from "../../constants/globalcss";

export default function PatientPrescriptionsScreen({ route, navigation }) {
  const [prescriptions, setPrescriptions] = useState([]);
  const [isSettingState, setIsSettingState] = useState(true);
  const patient = route.params.patient;

  useEffect(() => {
    const assignStates = () => {
      if (route.params && route.params?.item) {
        setPrescriptions(route.params.item);
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
      <HeaderText>Prescriptions For : {patient.user_name}</HeaderText>
        {isSettingState ? (
          <LoadingOverlay message="setting data" />
        ) : (
          <PrescriptionCard prescriptions={prescriptions} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
