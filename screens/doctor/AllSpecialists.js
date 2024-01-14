import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { AuthContext } from "../../store/auth-context";
import { SafeAreaView } from "react-native-safe-area-context";

import NotificationBell from "../../components/ui/NotificationBell";
import SearchInput from "../../components/FormElements/SearchInput";
import HeaderText from "../../components/ui/HeaderText";
import NormalText from "../../components/ui/NormalText";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import DoctorCard from "../../components/Cards/DoctorCard";

import { globalStyles } from "../../constants/globalcss";
import { Path } from "../../constants/path";

export default function AllSpecialists({ route, navigation }) {
  const [doctors, setDoctors] = useState([]);
  const [session, setSession] = useState("");
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    setSession(route.params.session);
  }, [route.params]);

  const navigateToDoctorProfile = (doctor) => {
    navigation.navigate("SpecialistProfile", {
      doctor: doctor,
      session: session,
    });
  };
  //TOKEN
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  const fetchDoctors = async () => {
    setIsFetching(true);
    const fetchurl = Path.API_URL + "doctor.php";
    const queryParams = `action=all_docs&doctor_id=${token.doctor_id}`;
    const url = `${fetchurl}?${queryParams}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.data === true) {
        setDoctors(data.doctors);
        setIsFetching(false);
      } else {
        console.log("No sessions");
        setIsFetching(false);
      }
    } catch (error) {
      setIsFetching(false);
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <NotificationBell />
      <ScrollView>
        <View>
          <HeaderText>Specialists</HeaderText>

          <SearchInput message="Specialists" />
          <View style={globalStyles.viewCard}>
            <View style={styles.container}>
              {doctors.length > 0 ? (
                doctors.map((doctor, index) => (
                  <DoctorCard
                    key={doctor.doctor_id} // Replace 'index' with a unique identifier if available
                    rating="4.5"
                    doctor={doctor}
                    onPress={() => navigateToDoctorProfile(doctor)}
                  />
                ))
              ) : (
                <LoadingOverlay message="Loading doctors" />
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Arrange child Views in a row
    flexWrap: "wrap", // Allow wrapping to the next row
  },
  column: {
    flexBasis: "50%", // Distribute the columns evenly in a row
    alignItems: "center", // Center content horizontally
    // You can add more styling here
  },
});
