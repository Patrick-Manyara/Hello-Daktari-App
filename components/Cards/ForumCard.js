import React from "react";
import { View, Image, StyleSheet, Pressable } from "react-native";
import { Path } from "../../constants/path";

import HeaderText from "../ui/HeaderText";
import NormalText from "../ui/NormalText";

import { Colors } from "../../constants/styles";
import { globalStyles } from "../../constants/globalcss";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBookmark,
  faComments,
  faEye,
} from "@fortawesome/free-regular-svg-icons";
import MediumText from "../ui/MediumText";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

export default function ForumCard({ onPress, forum }) {
  const truncateText = (text, maxLength) => {
    const words = text.split(" ");
    const truncatedText =
      words.length > maxLength
        ? words.slice(0, maxLength).join(" ") + "..."
        : text;
    return truncatedText;
  };

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: "#ccc" }}
      style={({ pressed }) => [
        styles.card,
        { marginTop: 4 },
        pressed ? globalStyles.buttonPressed : null,
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <View>
          <Image
            style={{ width: 40, height: 40, borderRadius: 20 }}
            source={{ uri: Path.IMAGE_URL + forum.user_image }}
          />
        </View>
        <View style={{ marginLeft: 10, flex: 1, marginVertical: 5 }}>
          <HeaderText styleProp={{ fontSize: 14 }} fontProp="poppins-semibold">
            {forum.forum_title}
          </HeaderText>
          <MediumText styleProp={{ fontSize: 10 }}>
            {forum.user_name}
          </MediumText>
        </View>
      </View>
      <View>
        <NormalText style={{ flexWrap: "wrap", maxWidth: "90%" }}>
          {truncateText(forum.forum_text, 20)}
        </NormalText>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FontAwesomeIcon icon={faComments} color={Colors.mainBlue} />
          <MediumText styleProp={{ fontSize: 12, marginHorizontal: 4 }}>
            {forum.comment_count}
          </MediumText>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FontAwesomeIcon icon={faEye} color={Colors.mainBlue} />
          <MediumText styleProp={{ fontSize: 12, marginHorizontal: 4 }}>
            View
          </MediumText>
        </View>
        <View 
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FontAwesomeIcon icon={faBookmark} color={Colors.mainBlue} />
          <MediumText styleProp={{ fontSize: 12, marginHorizontal: 4 }}>
            Save
          </MediumText>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "96%",
    backgroundColor: Colors.whiteBg,
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
  },
});
