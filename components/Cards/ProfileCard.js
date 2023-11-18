import React from "react";
import { View, Image, StyleSheet, Pressable } from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import NormalText from "../ui/NormalText";

import { globalStyles } from "../../constants/globalcss";
import { Colors } from "../../constants/styles";

export default function ProfileCard({ src, header, info, onPress }) {
  return (
    <Pressable
      style={[
        globalStyles.smallerCard,
        { height: 80, justifyContent: "center" },
      ]}
      onPress={onPress}
    >
      <View style={styles.profileMainInner}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={styles.imageContainer}>
            <Image source={src} style={styles.image} />
          </View>
          <View style={{ marginLeft: 10 }}>
            <NormalText>{header}</NormalText>
            <NormalText>{info}</NormalText>
          </View>
        </View>

        <View style={{ justifyContent: "flex-end" }}>
          <FontAwesomeIcon icon={faArrowRight} color={Colors.mainBlue} />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  profileMain: {
    backgroundColor: Colors.darkBlue,
    padding: 10,
    margin: 5,
    borderRadius: 8,
    elevation: 4,
    padding: 10,
    // IOS
    shadowColor: Colors.darkBlue,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  profileMainInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  imageContainer: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: Colors.lightGrey,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 20,
    height: 20,
  },
});
