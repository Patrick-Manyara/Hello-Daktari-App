import React, { useState } from "react";
import { View, ImageBackground, Image, StyleSheet } from "react-native";

import PrimaryButton from "../ui/PrimaryButton";
import HeaderText from "../ui/HeaderText";
import HomePageModal from "../Modals/HomePageModal";
import NormalText from "../ui/NormalText";

export default function BannerBlock() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };
  return (
    <ImageBackground
      source={require("../../assets/images/banner.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.mainView}>
        <View style={styles.leftHalfView}>
          <HeaderText>Find & Search Your Favorite Doctor</HeaderText>
          <Image source={require("../../assets/images/curve.png")} />
          <NormalText>
            Instant consultations with our trusted doctors
          </NormalText>
          <PrimaryButton onPress={openModal}>Consult A Doctor</PrimaryButton>
          <HomePageModal visible={isModalVisible} closeModal={closeModal} />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
    marginTop: 10,
  },
  mainView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
  },
  leftHalfView: {
    width: "50%",
    justifyContent: "flex-start",
  },
  bannerText: {
    color: "white",
    fontSize: 24,
  },
});
