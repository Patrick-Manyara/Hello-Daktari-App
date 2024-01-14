import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Path } from "../../constants/path";
import { getDayAndMonth } from "../../util/dateFormat";

import DayTimeCard from "../Cards/DayTimeCard";
import NotificationBell from "../ui/NotificationBell";
import HeaderText from "../ui/HeaderText";
import NormalText from "../ui/NormalText";
import PrimaryButton from "../ui/PrimaryButton";
import LoadingOverlay from "../ui/LoadingOverlay";

import { globalStyles } from "../../constants/globalcss";
export default function DoctorSchedules({ doctor, schedule }) {
  const [timesArray, setTimesArray] = useState([]);

  //days data
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");

  function handleDayClick(dayName) {
    setSelectedDay(dayName);
    const selectedDay = schedule.find((day) => day.dayName === dayName);

    if (selectedDay) {
      setSelectedDate(selectedDay.dayDate);
      setTimesArray(Object.values(selectedDay.times));
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

  return (
    <View>
      <NormalText>Days</NormalText>
      {schedule && (
        <ScrollView horizontal>
          <View style={{ flexDirection: "row" }}>
            {schedule.map((day, index) => (
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
      {timesArray.length > 0 ? (
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
      ) : (
        <NormalText>No Data To Load</NormalText>
      )}
    </View>
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
