import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import HeaderText from "../../components/ui/HeaderText";
import PrimaryButton from "../../components/ui/PrimaryButton";
import NotificationBell from "../../components/ui/NotificationBell";
import AddressCard from "../../components/Cards/AddressCard";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import NormalText from "../../components/ui/NormalText";
import MediumText from "../../components/ui/MediumText";
import { globalStyles } from "../../constants/globalcss";
import SessionSummaryCard from "../../components/Cards/SessionSummaryCard";

export default function PatientSessionsScreen({ route, navigation }) {
  const [sessions, setSessions] = useState([]);
  const [isSettingState, setIsSettingState] = useState(true);
  const patient = route.params.patient;

  useEffect(() => {
    const assignStates = () => {
      if (route.params && route.params?.item) {
        setSessions(route.params.item);
        setIsSettingState(false);
      }
    };

    assignStates(); // Call it once when the component mounts

    const unsubscribe = navigation.addListener("focus", () => {
      assignStates(); // Call it on focus events
    });

    return unsubscribe;
  }, [route.params, navigation]);

  const groupedSessions = sessions.reduce((acc, session) => {
    const month = new Date(session.session_date).toLocaleString("en-us", {
      month: "long",
    });
    acc[month] = acc[month] || [];
    acc[month].push(session);
    return acc;
  }, {});

  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <NotificationBell />
      <ScrollView>
        {isSettingState ? (
          <LoadingOverlay message="setting data" />
        ) : (
          <View>
            <HeaderText>Sessions For : {patient.user_name}</HeaderText>
            <View>
              {Object.entries(groupedSessions).map(
                ([month, sessionsInMonth]) => (
                  <View key={month}>
                    <MediumText>{month}</MediumText>
                    {sessionsInMonth.map((session) => (
                      <SessionSummaryCard
                        key={session.session_id}
                        session={session}
                      />
                    ))}
                  </View>
                )
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
