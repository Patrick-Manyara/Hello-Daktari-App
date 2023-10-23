import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5"; // Import FontAwesome 5 icon set
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { Colors } from "../../constants/styles";
import { StyleSheet, View } from "react-native";

export default function NotificationBell() {
  return (
    <View style={style.topView}>
      <View style={style.bellWrapper}>
        <Icon name="bell" size={20} color="#333" icon={faBell} />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  topView: {
    width: "100%",
    height: "auto",
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  bellWrapper: {
    height: 28,
    width: 28,
    borderRadius: 14,
    backgroundColor: Colors.lightBlue,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
