import React, { useState } from "react";
import { View, ScrollView } from "react-native";

import DayTimeCard from "../Cards/DayTimeCard";

export default function ScheduleDaysBlock() {
  const [selectedOption, setSelectedOption] = useState(null);
  const options = [
    { dayName: "Monday", dayDate: "17 Oct" },
    { dayName: "Tuesday", dayDate: "17 Oct" },
    { dayName: "Wednesday", dayDate: "17 Oct" },
    { dayName: "Thursday", dayDate: "17 Oct" },
    { dayName: "Friday", dayDate: "17 Oct" },
    { dayName: "Saturday", dayDate: "17 Oct" },
    { dayName: "Sunday", dayDate: "17 Oct" },
  ];

  function handleDayTimeClick(dayName) {
    setSelectedOption(dayName);
  }

  return (
    <ScrollView horizontal>
      <View style={{ flexDirection: "row" }}>
        {options.map((option, index) => (
          <DayTimeCard
            key={index}
            dayName={option.dayName}
            dayDate={option.dayDate}
            onPress={() => handleDayTimeClick(option.dayName)}
            isSelected={selectedOption === option.dayName}
          />
        ))}
      </View>
    </ScrollView>
  );
}
