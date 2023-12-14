import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, FlatList, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Path } from "../../constants/path";
import { AuthContext } from "../../store/auth-context";

import NotificationBell from "../../components/ui/NotificationBell";
import HeaderText from "../../components/ui/HeaderText";
import NormalText from "../../components/ui/NormalText";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import SessionHistoryCard from "../../components/Cards/SessionHistoryCard";
import CategoriesCard from "../../components/Cards/CategoriesCard";
import SearchInput from "../../components/FormElements/SearchInput";
import PatientListCard from "../../components/Cards/PatientListCard";

import { globalStyles } from "../../constants/globalcss";
import { Colors } from "../../constants/styles";

export default function AllPatientsScreen({ navigation }) {
  //TOKEN
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  //SESSIONS
  const [isFetching, setIsFetching] = useState(true);
  const [patients, setPatients] = useState([]);
  const [addresses, setAddresses] = useState({});
  const [uploads, setUploads] = useState({});
  const [prescriptions, setPrescriptions] = useState({});
  const [sessions, setSessions] = useState({});

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
          setAddresses(data.addresses);
          setUploads(data.uploads);
          setPrescriptions(data.prescriptions);
          setSessions(data.sessions);
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
      onPress={() =>
        navigation.navigate("PatientDetailScreen", {
          patient: item,
          addresses: addresses[item.user_id] || [],
          uploads: uploads[item.user_id] || [],
          prescriptions: prescriptions[item.user_id] || [],
          sessions: sessions[item.user_id] || [],
        })
      }
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
