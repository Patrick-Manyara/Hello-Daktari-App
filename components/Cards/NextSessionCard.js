import React, { useEffect, useState } from "react";
import { StyleSheet, Pressable, Image } from "react-native";
import { Path } from "../../constants/path";

import NormalText from "../ui/NormalText";

import { getDayMonthAndYear, getTimeInAmPm } from "../../util/dateFormat";

import { globalStyles } from "../../constants/globalcss";
import { Colors } from "../../constants/styles";

export default function NextSessionCard({
  userimg,
  username,
  sessionDate,
  sessionTime,
  isToday,
  onPress,
}) {
  const [userImage, setUserImage] = useState("");
  useEffect(() => {
    if (userimg === null) {
      setUserImage("white_bg_image.png");
    } else {
      setUserImage(userimg);
    }
  }, []);

  return (
    <Pressable
      android_ripple={{ color: "#ccc" }}
      style={({ pressed }) => [
        styles.card,
        isToday ? styles.pinkBg : styles.blueBg,
        pressed ? globalStyles.buttonPressed : null,
      ]}
      onPress={onPress}
    >
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
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 100,
    height: 180,
    marginRight: 10,
    // backgroundColor: Colors.mediumPink,
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
  pinkBg: {
    backgroundColor: Colors.mediumPink,
  },
  blueBg: {
    backgroundColor: Colors.darkBlue,
  },
});
