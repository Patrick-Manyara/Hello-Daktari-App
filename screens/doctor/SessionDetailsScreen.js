import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Path } from "../../constants/path";

import {
  calculateAge,
  getDayMonthAndYear,
  getTimeInAmPm,
} from "../../util/dateFormat";

import HeaderText from "../../components/ui/HeaderText";
import NormalText from "../../components/ui/NormalText";
import MediumText from "../../components/ui/MediumText";
import IconButton from "../../components/ui/IconButton";
import PrimaryButton from "../../components/ui/PrimaryButton";
import TransparentButton from "../../components/ui/TransparentButton";

import { globalStyles } from "../../constants/globalcss";
import { Colors } from "../../constants/styles";

export default function SessionDetailsScreen({ route, navigation }) {
  const session = route.params.session;
  const [userImg, setUserImg] = useState("");
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (session.user_image === null) {
      setUserImg("white_bg_image.png");
    } else {
      setUserImg(session.user_image);
    }
  }, [session]);

  const sessionData = [
    {
      txt: "Date",
      column: getDayMonthAndYear(session.session_date),
    },
    {
      txt: "Start Time",
      column: getTimeInAmPm(session.session_start_time),
    },
    {
      txt: "End Time",
      column: getTimeInAmPm(session.session_end_time),
    },
    {
      txt: "Amount",
      column: "Ksh. 4500",
    },
    {
      txt: "Mode",
      column: session.session_mode,
    },
    {
      txt: "Channel",
      column:
        session.session_channel == null ? "None" : session.session_channel,
    },
    {
      txt: "Link",
      column: session.session_link == null ? "None" : "Click",
    },
  ];

  const navigateToSpecialists = () => {
    navigation.navigate("AllSpecialists", { session: session });
  };

  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View>
          <Image
            source={{
              uri:
                Path.IMAGE_URL +
                (session.user_image === null
                  ? "default.png"
                  : session.user_image),
            }}
            resizeMode="cover"
            style={styles.userImage}
          />
        </View>
        <View style={{ marginLeft: 5 }}>
          <MediumText styleProp={{ color: Colors.mainBlue }}>
            {session.user_name}
          </MediumText>
          <MediumText>{calculateAge(session.user_dob)}</MediumText>
          <MediumText>{session.user_email}</MediumText>
          <MediumText>{session.user_phone}</MediumText>
        </View>
      </View>

      {sessionData.map((item, index) => (
        <View key={index} style={styles.details}>
          <MediumText>{item.txt}</MediumText>
          <NormalText>{item.column}</NormalText>
        </View>
      ))}

      {session.session_date == today ? (
        <View
          style={{
            padding: 5,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            icon="checkmark-circle-outline"
            color={Colors.darkBlue}
            size={20}
            text="Start"
            styleProp={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              height: 50,
              width: 100,
              backgroundColor: Colors.lightBlue,
            }}
            textStyle={{ color: "black" }}
          />

          <IconButton
            icon="close-circle-outline"
            color={Colors.darkBlue}
            size={20}
            text="Cancel"
            styleProp={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              height: 50,
              width: 100,
              backgroundColor: Colors.lightPink,
            }}
            textStyle={{ color: "black" }}
          />
        </View>
      ) : (
        <View>
          <PrimaryButton style={{ backgroundColor: Colors.mainBlue }}>
            Accept
          </PrimaryButton>
          <PrimaryButton>Decline</PrimaryButton>
          <TransparentButton
            onPress={() => {
              navigateToSpecialists();
            }}
          >
            Refer
          </TransparentButton>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  iconImg: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  userImageView: {
    width: 102,
    height: 102,
    borderRadius: 51,
    borderColor: "black",
    borderWidth: 10,
    borderStyle: "solid",
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  userImage: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  details: {
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: Colors.textColor,
    borderBottomWidth: 0.5,
    marginVertical: 5,
  },
});
