import React from "react";
import { View, Image, StyleSheet, Pressable } from "react-native";
import { Path } from "../../constants/path";

import HeaderText from "../ui/HeaderText";
import NormalText from "../ui/NormalText";

import { Colors } from "../../constants/styles";


export default function PatientListCard({ img, username }) {
  return (
    <View style={styles.card}>
      <View>
        <Image
          style={{ width: 50, height: 50, borderRadius: 25 }}
          source={{ uri: Path.IMAGE_URL + img }}
        />
      </View>
      <View style={{ marginLeft: 10 }}>
        <HeaderText styleProp={{ fontSize: 14 }} fontProp="poppins-semibold">
          {username}
        </HeaderText>
        
      </View>
    </View>
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
