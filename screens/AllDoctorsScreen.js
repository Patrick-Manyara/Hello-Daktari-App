import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { globalStyles } from "../constants/globalcss";
import { SafeAreaView } from "react-native-safe-area-context";
import NotificationBell from "../components/ui/NotificationBell";
import SearchInput from "../components/FormElements/SearchInput";
import HeaderText from "../components/ui/HeaderText";
import DoctorsBlock from "../components/Blocks/DoctorsBlock";

export default function AllDoctorsScreen() {
  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <NotificationBell />
      <ScrollView>
        <View>
          <HeaderText>Doctors</HeaderText>
          <SearchInput />
          <View style={globalStyles.viewCard}>
            <DoctorsBlock />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
