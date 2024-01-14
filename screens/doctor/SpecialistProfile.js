import React, { useState, useEffect } from "react";
import { StyleSheet, Image, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import NotificationBell from "../../components/ui/NotificationBell";
import HeaderText from "../../components/ui/HeaderText";
import NormalText from "../../components/ui/NormalText";
import PrimaryButton from "../../components/ui/PrimaryButton";

import { Path } from "../../constants/path";

import { globalStyles } from "../../constants/globalcss";
import DoctorProfileBlock from "../../components/Blocks/DoctorProfileBlock";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import DoctorSchedules from "../../components/Blocks/DoctorSchedules";
import TransparentButton from "../../components/ui/TransparentButton";

export default function SpecialistProfile({ route, navigation }) {
  const doctor = route.params.doctor;
  const [session, setSession] = useState("");

  useEffect(() => {
    setSession(route.params.session);
  }, [route.params]);

  function navigateToScreen(screenName) {
    navigation.navigate(screenName);
  }

  const [displayBio, setDisplayBio] = useState(true);

  const toggleDisplay = () => {
    setDisplayBio((prevDisplay) => !prevDisplay);
  };

  //fetching
  const [isFetching, setIsFetching] = useState(true);
  const [sessionData, setSessionData] = useState();

  const baseUrl = Path.API_URL + "schedule.php";
  const queryParams = `doctor_id=${doctor.doctor_id}`;
  const url = `${baseUrl}?${queryParams}`;

  useEffect(() => {
    try {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const days = data.data.map((item) => ({
            dayName: item.day,
            dayDate: item.date,
            times: item.times,
          }));
          setIsFetching(false);
          setSessionData(days);
        })
        .catch((error) => {
          setIsFetching(false);
          console.error("Fetch error:", error);
        });
    } catch (error) {
      setIsFetching(false);
      console.error("Request setup error:", error);
    }
  }, []);

  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <NotificationBell />

      {isFetching ? (
        <LoadingOverlay message="Getting doctor's schedules" />
      ) : (
        <ScrollView>
          <View>
            <HeaderText>Specialist Profile</HeaderText>

            <View style={styles.innerView}>
              <Image
                style={styles.image}
                source={{
                  uri:
                    Path.IMAGE_URL +
                    (doctor.doctor_image === null
                      ? "avatar.png"
                      : doctor.doctor_image),
                }}
              />
            </View>

            <View>
              {displayBio ? (
                <DoctorProfileBlock doctor={doctor} />
              ) : (
                <DoctorSchedules doctor={doctor} schedule={sessionData} />
              )}
              <PrimaryButton onPress={toggleDisplay}>
                {displayBio ? "Show Schedule" : "Show Bio"}
              </PrimaryButton>
            </View>
          </View>
          <View>
            <TransparentButton
              onPress={() => navigateToScreen("ReferralSuccess")}
            >
              Proceed
            </TransparentButton>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    textAlign: "center",
  },
  subTitle: {
    textAlign: "center",
    marginTop: 5,
    marginBottom: 5,
  },
  ratingArea: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 5,
  },
  innerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    padding: 5,
  },
  image: {
    height: 140,
    width: 140,
    borderRadius: 70,
  },
});
