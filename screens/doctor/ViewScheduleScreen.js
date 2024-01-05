import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../constants/globalcss";
import NormalText from "../../components/ui/NormalText";
import MediumText from "../../components/ui/MediumText";
import { getDayMonthAndYear } from "../../util/dateFormat";
import Divider from "../../components/Cards/Divider";
import { Colors } from "../../constants/styles";
const sortByDay = (a, b) => {
  const daysOrder = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return daysOrder.indexOf(a.day) - daysOrder.indexOf(b.day);
};

const sortByStartTime = (a, b) => {
  return a.start_time.localeCompare(b.start_time);
};
export default function ViewScheduleScreen({ route, navigation }) {
  const doctor = route.params.doctor;
  const scheduleData = route.params.schedule;
  const sortedSchedule = scheduleData.sort(sortByDay);

  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <ScrollView>
        {sortedSchedule.map((daySchedule) => (
          <View style={globalStyles.card} key={daySchedule.date}>
            <MediumText>
              {daySchedule.day} - Next: {getDayMonthAndYear(daySchedule.date)}
            </MediumText>
            <Divider colorProp={Colors.lightBlue} />
            {daySchedule.times.sort(sortByStartTime).map((timeSlot) => (
              <NormalText key={`${timeSlot.start_time}-${timeSlot.end_time}`}>
                {`${timeSlot.start_time} - ${timeSlot.end_time}`}
              </NormalText>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
