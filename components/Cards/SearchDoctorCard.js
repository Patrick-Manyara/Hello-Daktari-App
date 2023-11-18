import React from "react";
import { View, Image, StyleSheet, Pressable } from "react-native";
import { Path } from "../../constants/path";

import HeaderText from "../ui/HeaderText";

import { Colors } from "../../constants/styles";
import { globalStyles } from "../../constants/globalcss";

export default function SearchDoctorCard({ image, name, price, onPress }) {
  return (
    <Pressable
      android_ripple={{ color: "#ccc" }}
      style={({ pressed }) => [
        globalStyles.button,
        { marginTop: 4 },
        pressed ? globalStyles.buttonPressed : null,
      ]}
    >
      <View style={styles.card}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            padding: 5,
          }}
        >
          <View style={{ width: "20%" }}>
            <Image
              source={{ uri: Path.IMAGE_URL + image }}
              style={{ width: 40, height: 40, objectFit: "cover" }}
            />
          </View>
          <View style={{ width: "60%" }}>
            <HeaderText
              styleProp={styles.labName}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {name}
            </HeaderText>
            <HeaderText styleProp={styles.labPrice}>Ksh. {price}</HeaderText>
          </View>
          <View style={{ width: "20%", justifyContent: "flex-end" }}></View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "98%",
    backgroundColor: Colors.lightGrey,
    margin: 5,
    borderRadius: 12,
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
    backgroundColor: Colors.mainBlue,
    flexDirection: "row",
  },
  topViewText: {
    color: "white",
    fontSize: 10,
    padding: 5,
  },
  labName: {
    color: "black",
    fontSize: 12,
  },
  labPrice: {
    fontSize: 10,
  },
});
