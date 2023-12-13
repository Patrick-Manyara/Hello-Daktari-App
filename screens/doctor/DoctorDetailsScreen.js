import React, { useState, useEffect } from "react";
import { StyleSheet, Image, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import NotificationBell from "../../components/ui/NotificationBell";
import HeaderText from "../../components/ui/HeaderText";
import NormalText from "../../components/ui/NormalText";
import PrimaryButton from "../../components/ui/PrimaryButton";

import { Path } from "../../constants/path";

import { globalStyles } from "../../constants/globalcss";

export default function DoctorDetailsScreen() {
  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <NotificationBell />
      <ScrollView>
        <View>
          <HeaderText>Specialist Profile</HeaderText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
