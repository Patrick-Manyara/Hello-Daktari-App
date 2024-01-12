import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Path } from "../../constants/path";

import { getTimeInAmPm, getToday } from "../../util/dateFormat";

import HeaderText from "../../components/ui/HeaderText";
import MediumText from "../../components/ui/MediumText";

import AppointmentCard from "../../components/Cards/AppointmentCard";
import CategoriesCard from "../../components/Cards/CategoriesCard";

import { Divider, styled } from "@ui-kitten/components";

import { globalStyles } from "../../constants/globalcss";
import { Colors } from "../../constants/styles";

export default function AppointmentDetails({ route }) {
  const [sessions, setSessions] = useState(route.params.sessions);
  const userName = route.params.sessions[0].user_name;
  const userImage = route.params.sessions[0].user_image;
  const today = getToday();
  const [selectedPeriod, setSelectedPeriod] = useState("all");

  const [futureSessions, setFutureSessions] = useState([]);
  const [pastSessions, setPastSessions] = useState([]);
  const [todaySessions, setTodaySessions] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  function handlePeriodClick(period) {
    setIsLoading(true);
    setSelectedPeriod(period);
    switch (period) {
      case "all":
        setSessions(route.params.sessions);
        break;

      case "upcoming":
        setSessions(
          sessions.filter((session) => session.session_date >= today)
        );
        break;

      case "today":
        setSessions(
          sessions.filter((session) => session.session_date === today)
        );
        break;

      case "completed":
        setSessions(sessions.filter((session) => session.session_date < today));
        break;

      default:
        break;
    }

    setIsLoading(false);
  }

  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Image
            source={{ uri: Path.IMAGE_URL + userImage }}
            style={styles.userImage}
          />
          <MediumText
            styleProp={{ color: Colors.mainBlue, marginLeft: 4, marginTop: 4 }}
          >
            {userName}
          </MediumText>
        </View>
        <HeaderText styleProp={globalStyles.centerText}>
          Session List
        </HeaderText>
        <Divider />
        <View>
          <ScrollView horizontal>
            <View style={{ flexDirection: "row", marginVertical: 10 }}>
              <CategoriesCard
                categoryName={"all"}
                onPress={() => handlePeriodClick("all")}
                isSelected={selectedPeriod === "all"}
              />
              <CategoriesCard
                categoryName={"upcoming"}
                onPress={() => handlePeriodClick("upcoming")}
                isSelected={selectedPeriod === "upcoming"}
              />
              <CategoriesCard
                categoryName={"today"}
                onPress={() => handlePeriodClick("today")}
                isSelected={selectedPeriod === "today"}
              />
              <CategoriesCard
                categoryName={"completed"}
                onPress={() => handlePeriodClick("completed")}
                isSelected={selectedPeriod === "completed"}
              />
            </View>
          </ScrollView>
        </View>
        {isLoading ? (
          <View>
            <ActivityIndicator animating size="large" />
          </View>
        ) : (
          <View>
            {sessions.map((session) => (
              <AppointmentCard
                userImage={session.user_image}
                userName={session.user_name}
                sessionDate={session.session_date}
                sessionTime={getTimeInAmPm(session.session_start_time)}
                dateToday={today}
                key={session.session_id}
                sessionMode={session.session_mode}
                imgIcon={
                  session.session_date >= today
                    ? "../../assets/icons/green.png"
                    : "../../assets/icons/yellow.png"
                }
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  userImage: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
});
