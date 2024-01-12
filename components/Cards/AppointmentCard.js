import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, Pressable, Text } from "react-native";
import { Path } from "../../constants/path";

import HeaderText from "../ui/HeaderText";
import NormalText from "../ui/NormalText";

import { Colors } from "../../constants/styles";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

import { getDayMonthAndYear, getTimeInAmPm } from "../../util/dateFormat";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import MediumText from "../ui/MediumText";

export default function AppointmentCard({
  userImage,
  userName,
  sessionDate,
  sessionTime,
  dateToday,
  imgIcon,
  sessionMode,
}) {
  //   const backgroundColor = sessionDate >= dateToday ? "#EFBC408C" : "#018B1F70";

  const [backgroundColor, setBackgroundColor] = useState("");
  const [iconSource, setIconSource] = useState("");
  const [dateText, setDateText] = useState("");
  const [sessionIcon, setSessionIcon] = useState("");

  useEffect(() => {
    const assignStates = () => {
      if (sessionDate >= dateToday) {
        setIconSource(require("../../assets/icons/yellow.png"));
        setBackgroundColor("#EFBC408C");
        setDateText("Upcoming");
      } else {
        setIconSource(require("../../assets/icons/green.png"));
        setBackgroundColor("#018B1F70");
        setDateText("Completed");
      }

      if (sessionMode == "live") {
        setSessionIcon(require("../../assets/images/meeting.png"));
      } else {
        setSessionIcon(require("../../assets/images/cam.png"));
      }
    };

    

    assignStates(); // Call it once when the component mounts
  }, []);

  return (
    <View style={[styles.card, { backgroundColor: backgroundColor }]}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Image style={styles.imgIcon} source={iconSource} />
          <View style={{ marginLeft: 5 }}>
            <MediumText>{dateText}</MediumText>
            <NormalText>{getDayMonthAndYear(sessionDate)}</NormalText>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Image style={styles.sessionIcon} source={sessionIcon} />
          <Image
            style={styles.sessionIcon}
            source={require("../../assets/images/trash.png")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "96%",
    margin: 5,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  imgIcon: {
    width: 50,
    height: 50,
  },
  sessionIcon: {
    width: 25,
    height: 25,
  },
});
