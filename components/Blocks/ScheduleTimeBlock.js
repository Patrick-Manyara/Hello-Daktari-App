import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import DayTimeCard from "../Cards/DayTimeCard";

export default function ScheduleTimeBlock() {
  const [selectedOption, setSelectedOption] = useState(null);
  const options = [
    { time: "7:00AM", dayDate: "7:00AM" },
    { time: "9:00AM", dayDate: "7:00AM" },
    { time: "10:100M", dayDate: "7:00AM" },
    { time: "11:00AM", dayDate: "7:00AM" },
    { time: "12:00PM", dayDate: "7:00AM" },
    { time: "11:00AM", dayDate: "7:00AM" },
    { time: "12:00PM", dayDate: "7:00AM" },
  ];

  function handleDayTimeClick(time) {
    setSelectedOption(time);
    console.log(`Selected option: ${time}`);
  }

  return (
    <ScrollView horizontal>
      <View style={{ flexDirection: "row" }}>
        {options.map((option, index) => (
          <DayTimeCard
            key={index}
            dayName={option.time}
            dayDate=""
            onPress={() => handleDayTimeClick(option.time)}
            isSelected={selectedOption === option.time}
          />
        ))}
      </View>
    </ScrollView>
  );
}
