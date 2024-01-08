import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PagerView from "react-native-pager-view";
import { globalStyles } from "../constants/globalcss";
import {
  Dimensions,
  Text,
  ImageBackground,
  View,
  StyleSheet,
  Image,
} from "react-native";
import TabBlocks from "../components/Blocks/TabBlocks";
import TransparentButton from "../components/ui/TransparentButton";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import HeaderText from "../components/ui/HeaderText";

export default function ChoiceScreen() {
  const navigation = useNavigation();

  function navigateToScreen(screenName) {
    navigation.navigate(screenName);
  }
  return (
    <ImageBackground
      style={[globalStyles.safeAreaView]}
      source={require("../assets/images/steth.png")}
    >
      <View style={styles.overlay}>
        <Image
          source={require("../assets/images/art.png")}
          style={{ height: 200, width: 200 }}
        />
        <View>
          <PrimaryButton
            style={{ width: 300 }}
            onPress={() => navigateToScreen("DoctorLoginScreen")}
          >
            I Am A Doctor
          </PrimaryButton>
          <PrimaryButton onPress={() => navigateToScreen("Login")}>
            I Am A Patient/Client
          </PrimaryButton>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#4C84C3BF", // Blue overlay with 50% opacity
    justifyContent: "center",
    padding: 10,
    alignItems: "center",
  },
});
