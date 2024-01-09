import React, { useState, useEffect, useContext } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Path } from "../../constants/path";
import { AuthContext } from "../../store/auth-context";

import NotificationBell from "../../components/ui/NotificationBell";
import HeaderText from "../../components/ui/HeaderText";
import NormalText from "../../components/ui/NormalText";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import SearchInput from "../../components/FormElements/SearchInput";
import PatientListCard from "../../components/Cards/PatientListCard";

import { globalStyles } from "../../constants/globalcss";

export default function StartNewChat({ navigation }) {
  //TOKEN
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  //SESSIONS
  const [isFetching, setIsFetching] = useState(true);
  const [patients, setPatients] = useState([]);

  const fetchPatients = () => {
    setIsFetching(true);
    const fetchurl = Path.API_URL + "doctor.php";
    const queryParams = `action=patients&doctor_id=${token.doctor_id}`;
    const url = `${fetchurl}?${queryParams}`;
    try {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setIsFetching(false);
          setPatients(data.patients);
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
    fetchPatients();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchPatients();
    });

    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }) => (
    <PatientListCard
      onPress={() => {
        navigation.navigate("DocAddChatRoom", { user: item });
      }}
      img={item.user_image}
      username={item.user_name}
    />
  );
  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <NotificationBell />
      {isFetching ? (
        <LoadingOverlay message="Fetching your client list" />
      ) : (
        <View>
          <SearchInput message="Clients" />
          <HeaderText>Your Patients</HeaderText>
          <NormalText>List of your patients</NormalText>
          <FlatList
            data={patients}
            keyExtractor={(item) => item.user_id.toString()}
            renderItem={renderItem}
          />
        </View>
      )}
    </SafeAreaView>
  );
}
