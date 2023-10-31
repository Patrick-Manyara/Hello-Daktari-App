import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { globalStyles } from "../constants/globalcss";
import { SafeAreaView } from "react-native-safe-area-context";
import NotificationBell from "../components/ui/NotificationBell";
import SearchInput from "../components/FormElements/SearchInput";
import HeaderText from "../components/ui/HeaderText";
import NormalText from "../components/ui/NormalText";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import DoctorCard from "../components/Cards/DoctorCard";

export default function AllDoctorsScreen({ route, navigation }) {
  const [doctors, setDoctors] = useState([]);
  const [session_data, setSessionData] = useState("");

  useEffect(() => {
    setDoctors(route.params.doctors);
    setSessionData(route.params.session_data);
  }, [route.params]);

  const navigateToDoctorProfile = (doctor) => {
    navigation.navigate("DoctorProfileScreen", {
      doctor: doctor,
      session_data: session_data,
    });
  };

  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <NotificationBell />
      <ScrollView>
        <View>
          <HeaderText>Doctors</HeaderText>
          <SearchInput />
          <View style={globalStyles.viewCard}>
            <View style={styles.container}>
              {doctors.length > 0 ? (
                doctors.map((doctor, index) => (
                  <DoctorCard
                    key={doctor.doctor_id} // Replace 'index' with a unique identifier if available
                    src={doctor.doctor_image}
                    name={doctor.doctor_name}
                    post={doctor.doctor_qualifications}
                    years={doctor.doctor_experience}
                    rating="4.5"
                    price={doctor.doctor_rate}
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
