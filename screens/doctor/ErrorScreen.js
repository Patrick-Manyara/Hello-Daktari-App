import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../store/auth-context";
import { useNavigation } from "@react-navigation/native";

import { Path } from "../../constants/path";

import LoadingOverlay from "../../components/ui/LoadingOverlay";
import NotificationBell from "../../components/ui/NotificationBell";
import HeaderText from "../../components/ui/HeaderText";
import NormalText from "../../components/ui/NormalText";
import SessionHistoryCard from "../../components/Cards/SessionHistoryCard";
import NextSessionCard from "../../components/Cards/NextSessionCard";
import PrimaryButton from "../../components/ui/PrimaryButton";

import { globalStyles } from "../../constants/globalcss";
import { Colors } from "../../constants/styles";

export default function ErrorScreen() {
  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <NotificationBell />
      <ScrollView>
        <HeaderText
          styleProp={{ fontSize: 16, color: "red", textAlign: "center" }}
        >
          Error. The global expo-cli package has been deprecated. │ │ │ │ The
          new Expo ReactForum extension (recommended in Android 9 and higher) is
          now bundled in your project in the expo package. │ │
        </HeaderText>
        <HeaderText
          styleProp={{ fontSize: 16, color: "red", textAlign: "center" }}
        >
          Error. The global expo-cli package has been deprecated. │ │ │ │ The
          new Expo ReactForum extension (recommended in Android 9 and higher) is
          now bundled in your project in the expo package. │ │
        </HeaderText>
        <HeaderText
          styleProp={{ fontSize: 16, color: "red", textAlign: "center" }}
        >
          Error. The global expo-cli package has been deprecated. │ │ │ │ The
          new Expo ReactForum extension (recommended in Android 9 and higher) is
          now bundled in your project in the expo package. │ │
        </HeaderText>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    height: 100,
    resizeMode: "cover",
    borderRadius: 20,

    marginTop: 10,
  },
  bannerText: {
    color: "white",
    fontSize: 16,
  },
  subText: {
    color: "white",
    fontSize: 12,
  },
  cardContainer: {
    flexDirection: "row",
    padding: 10,
  },
});
