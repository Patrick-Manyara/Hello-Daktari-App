import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  ToastAndroid,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthContext } from "../store/auth-context";
import { Path } from "../constants/path";

import HeaderText from "../components/ui/HeaderText";
import PrimaryButton from "../components/ui/PrimaryButton";
import NotificationBell from "../components/ui/NotificationBell";
import AddressCard from "../components/Cards/AddressCard";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import LabCard from "../components/Cards/LabCard";

import { Colors } from "../constants/styles";
import { globalStyles } from "../constants/globalcss";
import NormalText from "../components/ui/NormalText";

export default function LabScreen({ route, navigation }) {
  const [labs, setLabs] = useState([]);
  const baseurl = Path.API_URL + "lab.php";
  const [isFetching, setIsFetching] = useState(true);

  const fetchLabServices = () => {
    try {
      fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
          setIsFetching(false);
          let arr = data.labs;
          if (Array.isArray(arr)) {
            setLabs(data.labs);
          } else {
            console.log("No labs");
          }
        })
        .catch((error) => {
          setIsFetching(false);
          console.error("Fetch error:", error);
        });
    } catch (error) {
      setIsFetching(false);
      console.error("Request setup error:", error);
    }
  };

  useEffect(() => {
    fetchLabServices();
  }, []);

  const navigateToAddressScreen = (item) => {
    navigation.navigate("AddressScreen", { lab: item });
  };

  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <NotificationBell />
      {isFetching ? (
        <LoadingOverlay message="Getting Lab Services." />
      ) : (
        <View style={{ marginBottom: 100 }}>
          <HeaderText>Select A Service</HeaderText>
          {labs.length > 0 ? (
            <FlatList
              data={labs}
              keyExtractor={(item) => item.lab_id}
              renderItem={({ item }) => (
                <LabCard
                  name={item.lab_care_name}
                  code={item.lab_care_code}
                  price={item.lab_amount}
                  onPress={() => navigateToAddressScreen(item)}
                />
              )}
            />
          ) : (
            <NormalText>No addresses to display.</NormalText>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}
