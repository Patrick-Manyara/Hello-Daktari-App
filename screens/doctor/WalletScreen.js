import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../constants/globalcss";
import NotificationBell from "../../components/ui/NotificationBell";
import NormalText from "../../components/ui/NormalText";
export default function WalletScreen() {
  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <NotificationBell />
      <ScrollView>
        <NormalText>Your wallet will appear here</NormalText>
      </ScrollView>
    </SafeAreaView>
  );
}
