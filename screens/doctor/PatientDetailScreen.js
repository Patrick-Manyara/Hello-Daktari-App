import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Text,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import HeaderText from "../../components/ui/HeaderText";
import PrimaryButton from "../../components/ui/PrimaryButton";
import NotificationBell from "../../components/ui/NotificationBell";
import AddressCard from "../../components/Cards/AddressCard";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import NormalText from "../../components/ui/NormalText";
import MediumText from "../../components/ui/MediumText";

import { Colors } from "../../constants/styles";

import { globalStyles } from "../../constants/globalcss";
import { Path } from "../../constants/path";
import FlatButton from "../../components/ui/FlatButton";

export default function PatientDetailScreen({ route, navigation }) {
  const [patient, setPatient] = useState();
  const [addresses, setAddresses] = useState([]);
  const [uploads, setUploads] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [isSettingData, setIsSettingData] = useState(true);

  useEffect(() => {
    if (route.params) {
      // Set patient
      if (route.params.patient) {
        setPatient(route.params.patient);
      }

      // Set addresses
      if (route.params.addresses) {
        setAddresses(route.params.addresses);
      }

      // Set uploads
      if (route.params.uploads) {
        setUploads(route.params.uploads);
      }

      // Set sessions
      if (route.params.sessions) {
        setSessions(route.params.sessions);
      }

      // Set prescriptions
      if (route.params.prescriptions) {
        setPrescriptions(route.params.prescriptions);
      }
      setIsSettingData(false);
    }
  }, [route.params]);

  function navigateToScreen(screenName, type) {
    let itemName;
    let itemsToPass;

    switch (type) {
      case "sessions":
        itemName = "sessions";
        itemsToPass = sessions;
        break;
      case "addresses":
        itemName = "addresses";
        itemsToPass = addresses;
        break;
      case "uploads":
        itemName = "uploads";
        itemsToPass = uploads;
        break;
      case "prescriptions":
        itemName = "prescriptions";
        itemsToPass = prescriptions;
        break;
      default:
        break;
    }

    navigation.navigate(screenName, { item: itemsToPass, patient: patient });
  }

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 5, backgroundColor: "#fff" }}>
      <NotificationBell />
      {isSettingData ? (
        <LoadingOverlay message="Fetching" />
      ) : (
        <View>
          <View style={styles.userHeader}>
            <HeaderText>{patient?.user_name}</HeaderText>
            <Image
              source={{ uri: Path.IMAGE_URL + patient.user_image }}
              style={styles.userImage}
            />
          </View>

          <View style={styles.userDetails}>
            <View style={styles.userDetailsInner}>
              <View style={styles.details}>
                <MediumText>Email:</MediumText>
                <NormalText>{patient.user_email}</NormalText>
              </View>

              <View style={styles.details}>
                <MediumText>Phone Number:</MediumText>
                <NormalText>{patient.user_phone}</NormalText>
              </View>

              <View style={styles.details}>
                <MediumText>Date of Birth:</MediumText>
                <NormalText>{patient.user_dob}</NormalText>
              </View>

              <View style={styles.details}>
                <MediumText>Weight:</MediumText>
                <NormalText>{patient.user_weight}</NormalText>
              </View>

              <View style={styles.details}>
                <MediumText>Height:</MediumText>
                <NormalText>{patient.user_height}</NormalText>
              </View>

              <View style={styles.details}>
                <MediumText>Blood Group:</MediumText>
                <NormalText>{patient.user_blood_group}</NormalText>
              </View>

              {addresses.length > 0 && (
                <View style={styles.details}>
                  <MediumText>Addresses:</MediumText>
                  <FlatButton onPress={() => {}}>View</FlatButton>
                </View>
              )}

              {uploads.length > 0 && (
                <View style={styles.details}>
                  <MediumText>uploads:</MediumText>
                  <FlatButton>View</FlatButton>
                </View>
              )}

              {sessions.length > 0 && (
                <View style={styles.details}>
                  <MediumText>sessions:</MediumText>
                  <FlatButton
                    onPress={() => {
                      navigateToScreen("PatientSessionsScreen", "sessions");
                    }}
                  >
                    View
                  </FlatButton>
                </View>
              )}

              {prescriptions.length > 0 && (
                <View style={styles.details}>
                  <MediumText>prescriptions:</MediumText>
                  <FlatButton>View</FlatButton>
                </View>
              )}
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userHeader: {
    justifyContent: "center",
    alignItems: "center",
  },
  userDetails: {
    backgroundColor: Colors.mainBlue,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 5,
    marginTop: 10,
    height: "100%",
  },
  userDetailsInner: {
    backgroundColor: Colors.lightBlue,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 10,
    height: "100%",
  },
  details: {
    justifyContent: "space-between",
    flexDirection: "row",
    borderBottomColor: Colors.textColor,
    borderBottomWidth: 0.5,
    marginVertical: 5,
  },
});
