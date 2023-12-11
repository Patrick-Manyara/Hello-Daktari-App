import React, { useEffect, useState } from "react";
import { View, StyleSheet, Pressable, Image } from "react-native";

import NormalText from "../ui/NormalText";
import PrimaryButton from "../ui/PrimaryButton";
import HeaderText from "../ui/HeaderText";

import { Colors } from "../../constants/styles";
import { globalStyles } from "../../constants/globalcss";

import { getDayMonthAndYear, getTimeInAmPm } from "../../util/dateFormat";

import { Path } from "../../constants/path";

export default function NextSessionCard({
  userimg,
  username,
  sessionDate,
  sessionTime,
}) {
  const [userImage, setUserImage] = useState("");
  useEffect(() => {
    if (userimg == "") {
      setUserImage("white_bg_image.png");
    } else {
      setUserImage(userimg);
    }
  }, []);
  return (
    <View style={styles.card}>
      <Image
        style={{ width: 50, height: 50, borderRadius: 25 }}
        source={{ uri: Path.IMAGE_URL + userImage }}
      />
      <NormalText styleProp={styles.userName} fontProp="poppins-semibold">
        {username}
      </NormalText>
      <NormalText styleProp={styles.userName}>
        {getDayMonthAndYear(sessionDate)}
      </NormalText>
      <NormalText styleProp={styles.userName}>
        {getTimeInAmPm(sessionTime)}
      </NormalText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 100,
    height: 180,
    marginRight: 10,
    backgroundColor: Colors.mediumPink,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  userName: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
  },
});
