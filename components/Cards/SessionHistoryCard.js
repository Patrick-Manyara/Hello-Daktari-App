import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, Pressable } from "react-native";
import { Path } from "../../constants/path";

import HeaderText from "../ui/HeaderText";
import NormalText from "../ui/NormalText";

import { Colors } from "../../constants/styles";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

import { getDayMonthAndYear, getTimeInAmPm } from "../../util/dateFormat";
import { globalStyles } from "../../constants/globalcss";

export default function SessionHistoryCard({ session, isToday, onPress }) {
  const [userImage, setUserImage] = useState("");
  useEffect(() => {
    if (session.user_image === null) {
      setUserImage("white_bg_image.png");
    } else {
      setUserImage(session.user_image);
    }
  }, []);

  return (
    <Pressable
      android_ripple={{ color: "#ccc" }}
      style={({ pressed }) => [
        styles.card,
        pressed ? globalStyles.buttonPressed : null,
      ]}
      onPress={onPress}
    >
      <View>
        <Image
          style={{ width: 50, height: 50, borderRadius: 25 }}
          source={{ uri: Path.IMAGE_URL + userImage }}
        />
      </View>
      <View style={{ marginLeft: 10 }}>
        <HeaderText styleProp={{ fontSize: 14 }} fontProp="poppins-semibold">
          {session.user_name}
        </HeaderText>
        <View style={{ flexDirection: "row", marginVertical: 5 }}>
          <FontAwesomeIcon icon={faClock} color="black" />
          <NormalText styleProp={{ marginLeft: 5 }}>
            {getDayMonthAndYear(session.session_date)} |
            {getTimeInAmPm(session.session_start_time)}
          </NormalText>
          <NormalText>{isToday ? "Yes" : "No"}</NormalText>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "96%",
    backgroundColor: Colors.darkGrey,
    margin: 5,
    borderRadius: 5,
    elevation: 1,
    padding: 5,
    // IOS
    shadowColor: "black",
    shadowOpacity: 0.125,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    //LAYOUT

    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
