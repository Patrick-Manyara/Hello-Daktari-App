import React from "react";
import { View, Image, StyleSheet, Pressable } from "react-native";
import { Path } from "../../constants/path";

import HeaderText from "../ui/HeaderText";
import IconButton from "../ui/IconButton";

import { globalStyles } from "../../constants/globalcss";
import { Colors } from "../../constants/styles";
import NormalText from "../ui/NormalText";
import { getDayMonthAndYear, getTimeInAmPm } from "../../util/dateFormat";

export default function SessionSummaryCard({ session }) {
  const sessionData = [
    {
      img: require("../../assets/icons/date.png"),
      column: getDayMonthAndYear(session.session_date),
    },
    {
      img: require("../../assets/icons/hourglass.png"),
      column: getTimeInAmPm(session.session_start_time),
    },
    {
      img: require("../../assets/icons/payment.png"),
      column: "Ksh. 4500",
    },
  ];

  const sessionData2 = [
    {
      img: require("../../assets/icons/mode.png"),
      column: session.session_mode,
    },
    {
      img: require("../../assets/icons/channel.png"),
      column:
        session.session_channel == null ? "None" : session.session_channel,
    },
    {
      img: require("../../assets/icons/link.png"),
      column: session.session_link == null ? "None" : "Click",
    },
  ];
  return (
    <View style={styles.card}>
      <View style={styles.topView}>
        <View style={styles.halfView}>
          {sessionData.map((item, index) => (
            <View
              key={index}
              style={{
                marginVertical: 5,
                flexDirection: "row",
              }}
            >
              <Image source={item.img} style={styles.iconImg} />
              <NormalText>{item.column}</NormalText>
            </View>
          ))}
        </View>

        <View style={styles.halfView}>
          {sessionData2.map((item, index) => (
            <View
              key={index}
              style={{
                marginVertical: 5,
                flexDirection: "row",
              }}
            >
              <Image source={item.img} style={styles.iconImg} />
              <NormalText>{item.column}</NormalText>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.bottomView}>
        <NormalText fontProp="poppins-semibold">
          {session.session_code} 
        </NormalText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "98%",
    backgroundColor: Colors.whiteBg,
    margin: 5,
    borderRadius: 10,
    elevation: 4,

    // IOS
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    backgroundColor: "white",
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  topView: {
    padding: 5,
    flexDirection: "row",
  },
  bottomView: {
    backgroundColor: Colors.lightBlue,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
  },
  bottomViewText: {
    color: "white",
    fontSize: 10,
    padding: 5,
    textTransform: "capitalize",
  },
  iconImg: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  halfView: {
    width: "50%",
  },
});
