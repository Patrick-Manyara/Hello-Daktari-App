import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Pressable,
  ImageBackground,
} from "react-native";

import HeaderText from "../ui/HeaderText";

import { globalStyles } from "../../constants/globalcss";
import { Colors } from "../../constants/styles";

import Icon from "react-native-vector-icons/FontAwesome5";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function AdBlock() {
  return (
    <ImageBackground
      source={require("../../assets/images/banner3.png")}
      style={styles.backgroundImage}
    >
      <Pressable style={styles.outerView}>
        <View style={styles.innerView}>
          <View style={styles.firstHalf}>
            <HeaderText
              styleProp={[globalStyles.smallerText, { color: "white" }]}
            >
              Get 30% Discount on your First Purchase
            </HeaderText>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <HeaderText
                styleProp={[globalStyles.smallerText, { color: "white" }]}
              >
                Shop Now
              </HeaderText>
              <Icon
                name="arrow-right"
                size={20}
                color="#333"
                icon={faArrowRight}
                style={{ color: "white", marginLeft: 1 }}
              />
            </View>
          </View>
          <View style={styles.secondHalf}>
            <Image source={require("../../assets/images/panadol.png")} />
          </View>
        </View>
      </Pressable>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  outerView: {
    width: "100%",
    margin: 5,
    borderRadius: 10,
  },
  backgroundImage: {
    height: 160,
    resizeMode: "cover",
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 40,
  },
  innerView: {
    flexDirection: "row",
    width: "100%",
  },
  firstHalf: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  secondHalf: {
    width: "50%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
