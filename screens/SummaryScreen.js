import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { globalStyles } from "../constants/globalcss";
import { SafeAreaView } from "react-native-safe-area-context";

import NotificationBell from "../components/ui/NotificationBell";
import HeaderText from "../components/ui/HeaderText";
import NormalText from "../components/ui/NormalText";
import PrimaryButton from "../components/ui/PrimaryButton";
import LoadingOverlay from "../components/ui/LoadingOverlay";

import { getDayMonthAndYear } from "../util/dateFormat";
import { Path } from "../constants/path";

export default function SummaryScreen({ route, navigation }) {
  const [doctor, setDoctor] = useState("");
  const [session_data, setSessionData] = useState([]);
  const [payment_method, setPaymentMethod] = useState("");
  const [address, setAddress] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);
  const [submitting, setIsSubmitting] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    setDoctor(route.params.doctor);
    setSessionData(route.params.session_data);
    setPaymentMethod(route.params.payment_method);
    setAddress(route.params.address);
    setDataLoaded(true);
    setUrl(Path.API_URL + "session.php?action=complete");
  }, [route.params]);

  let submitForm = async () => {
    setIsSubmitting(true);
    const data = new FormData();
    data.append("session_id", session_data.session_id);
    data.append("address", address);

    let res = await fetch(url, {
      method: "post",
      body: data,
      headers: {
        "Content-Type": "multipart/form-data; ",
      },
    });

    let responseJson = await res.json();
    if (responseJson.status == 1) {
      // navigation.navigate("SuccessScreen");
    }

    setIsSubmitting(false);

    navigation.navigate("SuccessScreen");
  };

  //RENDER

  const _maybeRenderUploadingOverlay = () => {
    if (submitting) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "rgba(0,0,0,0.4)",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  if (!dataLoaded) {
    return <LoadingOverlay message="Still loading data" />;
  }

  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <NotificationBell />
      <ScrollView>
        <View>
          <HeaderText>Summary</HeaderText>
          <View style={styles.profileIntro}>
            <View>
              <Image
                style={styles.image}
                source={{
                  uri: Path.IMAGE_URL + doctor.doctor_image,
                }}
              />
            </View>
            <View style={styles.textArea}>
              <HeaderText styleProp={styles.title}>
                {doctor.doctor_name}
              </HeaderText>
              <NormalText styleProp={styles.subTitle}>
                {doctor.doctor_qualifications}
              </NormalText>
              <NormalText styleProp={styles.subTitle}>
                Years of Experience: {doctor.doctor_experience} Years
              </NormalText>
            </View>
          </View>

          <View>
            <View
              style={{
                width: "100%",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <NormalText>Date & hour</NormalText>
              <NormalText>
                {" "}
                {getDayMonthAndYear(session_data.selectedDate)} |{" "}
                {session_data.selectedTime}
              </NormalText>
            </View>
            <View
              style={{
                width: "100%",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <NormalText>Package</NormalText>
              <NormalText> {session_data.session_mode}</NormalText>
            </View>
          </View>

          <View
            style={{ width: "100%", height: 3, backgroundColor: "#B3B3B370" }}
          ></View>

          <View>
            <View
              style={{
                width: "100%",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <NormalText>Amount</NormalText>
              <NormalText> Ksh. 3000</NormalText>
            </View>
            <View
              style={{
                width: "100%",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <NormalText>Payment</NormalText>
              <NormalText>{payment_method} </NormalText>
            </View>
            <View
              style={{
                width: "100%",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <NormalText>Total</NormalText>
              <NormalText> Ksh. 3000 </NormalText>
            </View>
          </View>

          <PrimaryButton onPress={submitForm}>Pay Now</PrimaryButton>
        </View>
        {_maybeRenderUploadingOverlay()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
  },
  subTitle: {
    marginTop: 5,
    marginBottom: 5,
  },
  ratingArea: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 5,
  },
  innerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    padding: 5,
  },
  image: {
    height: 140,
    width: 140,
    borderRadius: 70,
  },
  profileIntro: {
    flexDirection: "row",
    width: "100%",
  },
  textArea: {
    justifyContent: "center",
    marginLeft: 5,
  },
});
