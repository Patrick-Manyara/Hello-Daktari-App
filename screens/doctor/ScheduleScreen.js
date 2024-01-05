import React, { useContext, useEffect, useState } from "react";
import { ScrollView, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import NotificationBell from "../../components/ui/NotificationBell";
import NormalText from "../../components/ui/NormalText";

import { globalStyles } from "../../constants/globalcss";
import { Path } from "../../constants/path";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import { AuthContext } from "../../store/auth-context";
import UrgencyCard from "../../components/Cards/UrgencyCard";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import TransparentButton from "../../components/ui/TransparentButton";

export default function ScheduleScreen() {
  //TOKEN AND FETCHING
  const authCtx = useContext(AuthContext);
  const [token, setToken] = useState("");
  const [schedule, setSchedule] = useState();
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        setToken(authCtx.token);

        const baseUrl = Path.API_URL + "doctor.php";
        const queryParams = `action=fetch_schedule&doctor_id=${token.doctor_id}`;
        const fetchUrl = `${baseUrl}?${queryParams}`;

        const response = await fetch(fetchUrl);
        const data = await response.json();

        if (Array.isArray(data.schedule)) {
          setSchedule(data.schedule);
        } else {
          console.log("none");
        }

        setIsFetching(false);
      } catch (error) {
        setIsFetching(false);
        console.error("Fetch error:", error);
      }
    };

    fetchScheduleData();
  }, [authCtx.token, token.doctor_id]);
  //NAVIGATION
  const navigation = useNavigation();

  function navigateToScreen(screenName) {
    navigation.navigate(screenName, { doctor: token });
  }

  function navigateToViewSchedule() {
    navigation.navigate("ViewScheduleScreen", {
      doctor: token,
      schedule: schedule,
    });
  }

  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <NotificationBell />
      <ScrollView>
        {isFetching ? (
          <LoadingOverlay message="Fetching your data" />
        ) : (
          <View>
            {schedule.length > 0 && (
              <View>
                <PrimaryButton onPress={() => {}}>
                  Edit Current Schedule
                </PrimaryButton>
                <TransparentButton onPress={() => navigateToViewSchedule()}>
                  Vew Current Schedule
                </TransparentButton>
              </View>
            )}
            <View>
              <PrimaryButton
                onPress={() => navigateToScreen("NewScheduleScreen")}
              >
                Create New Schedule
              </PrimaryButton>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
