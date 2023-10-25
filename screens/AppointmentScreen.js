import React, { useEffect, useState } from "react";
import { StyleSheet, Image, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { globalStyles } from "../constants/globalcss";

import DayTimeCard from "../components/Cards/DayTimeCard";
import NotificationBell from "../components/ui/NotificationBell";
import HeaderText from "../components/ui/HeaderText";
import NormalText from "../components/ui/NormalText";
import PrimaryButton from "../components/ui/PrimaryButton";

import { Path } from "../constants/path";
import { getDayAndMonth } from "../util/dateFormat";

export default function AppointmentScreen({ route, navigation }) {
  const [sessionData, setSessionData] = useState();
  const [timesArray, setTimesArray] = useState();
  const doctor = route.params.doctor;
  const session_data = route.params.session_data;
  const channel = route.params.channel;

  //days data
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");

  function handleDayClick(dayName) {
    setSelectedDay(dayName);
    const selectedDay = sessionData.find((day) => day.dayName === dayName);

    if (selectedDay) {
      setSelectedDate(selectedDay.dayDate);
      setTimesArray(selectedDay.times);
      setSelectedTime("");
    } else {
      console.log("Day not found");
    }
  }

  //time data

  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);

  function handleTimeClick(time) {
    setSelectedTime(time.start_time);
    setSelectedEndTime(time.end_time);
  }

  //fetching

  const baseUrl = "https://hello.angacinemas.com/endpoints/schedule.php";
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
          // setSelectedDay(days[0].dayName);
          // setTimesArray(days[0].times);
          setSessionData(days);
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    } catch (error) {
      console.error("Request setup error:", error);
    }
  }, []);

  //submit form
  const [uploading, setUploading] = useState(false);
  let submitForm = async () => {
    if (
      selectedDate != null &&
      selectedTime != null &&
      selectedEndTime != null
    ) {
      setUploading(true);

      const data = new FormData();
      data.append("date", selectedDate);
      data.append("start_time", selectedTime);
      data.append("end_time", selectedEndTime);
      data.append("doctor", doctor.doctor_id);
      data.append("session", session_data.session_id);
      data.append("channel", channel);

      let res = await fetch(
        "https://hello.angacinemas.com/endpoints/session_update.php",
        {
          method: "post",
          body: data,
          headers: {
            "Content-Type": "multipart/form-data; ",
          },
        }
      );

      let responseJson = await res.json();
      if (responseJson.status == 1) {
        console.log(responseJson);
      }

      setUploading(false);

      if (session_data.session_visit == "home") {
        navigation.navigate("AddressScreen", {
          doctor: doctor,
          session_data: session_data,
        });
      } else {
        navigation.navigate("PaymentScreen", {
          doctor: doctor,
          session_data: session_data,
        });
      }
    } else {
      alert("Please fill all the fields firsts");
    }
  };

  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <NotificationBell />
      <ScrollView>
        <View>
          <HeaderText>Book Appointment</HeaderText>
          <View style={styles.profileIntro}>
            <View>
              <Image
                style={styles.image}
                source={{
                  uri: Path.IMAGE_URL + doctor.doctor_image,
                }}
              />
            </View>
            <View style={styles.textArea}>
              <HeaderText styleProp={styles.title}>
                {doctor.doctor_name}
              </HeaderText>
              <NormalText styleProp={styles.subTitle}>
                {doctor.doctor_qualifications}
              </NormalText>
              <NormalText styleProp={styles.subTitle}>
                Years of Experience: {doctor.doctor_experience} Years
              </NormalText>
            </View>
          </View>
          <View>
            <NormalText>Days</NormalText>
            {sessionData && (
              <ScrollView horizontal>
                <View style={{ flexDirection: "row" }}>
                  {sessionData.map((day, index) => (
                    <DayTimeCard
                      key={index}
                      dayName={day.dayName}
                      dayDate={getDayAndMonth(day.dayDate)}
                      onPress={() => handleDayClick(day.dayName)}
                      isSelected={selectedDay === day.dayName}
                      isTime={false}
                    />
                  ))}
                </View>
              </ScrollView>
            )}

            <NormalText>Time</NormalText>
            {timesArray && (
              <ScrollView horizontal>
                <View style={{ flexDirection: "row" }}>
                  {timesArray.map((time, index) => (
                    <DayTimeCard
                      key={index}
                      dayName={time.start_time}
                      dayDate={time.end_time}
                      onPress={() => handleTimeClick(time)}
                      isSelected={selectedTime === time.start_time}
                      isTime={true}
                    />
                  ))}
                </View>
              </ScrollView>
            )}
          </View>
          <PrimaryButton onPress={submitForm}>Proceed To Payment</PrimaryButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
  },
  subTitle: {
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
  profileIntro: {
    flexDirection: "row",
    width: "100%",
  },
  textArea: {
    justifyContent: "center",
    marginLeft: 5,
  },
});
