import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  ScrollView,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../store/auth-context";

import { Path } from "../../constants/path";

import LoadingOverlay from "../../components/ui/LoadingOverlay";
import NotificationBell from "../../components/ui/NotificationBell";
import HeaderText from "../../components/ui/HeaderText";
import NormalText from "../../components/ui/NormalText";
import SearchInput from "../../components/FormElements/SearchInput";
import SessionHistoryCard from "../../components/Cards/SessionHistoryCard";
import NextSessionCard from "../../components/Cards/NextSessionCard";
import PrimaryButton from "../../components/ui/PrimaryButton";

import { globalStyles } from "../../constants/globalcss";
import { Colors } from "../../constants/styles";

export default function DoctorWelcomeScreen() {
  const today = new Date();

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(today);

  //TOKEN
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  //SESSIONS
  const [isFetching, setIsFetching] = useState(true);
  const [sessions, setSessions] = useState([]);
  const [futureSessions, setFutureSessions] = useState([]);
  const [pastSessions, setPastSessions] = useState([]);

  const fetchSessions = async () => {
    setIsFetching(true);
    const fetchurl = Path.API_URL + "session.php";
    const queryParams = `action=docall&doctor_id=${token.doctor_id}`;
    const url = `${fetchurl}?${queryParams}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      

      if (Array.isArray(data.sessions)) {
        setSessions(data.sessions);
        const today = new Date().toISOString().split("T")[0];
        const future = data.sessions.filter(
          (session) => session.session_date > today
        );
        const past = data.sessions.filter(
          (session) => session.session_date < today
        );
        setFutureSessions(future);
        setPastSessions(past);
        setIsFetching(false);
      } else {
        console.log("No sessions");
      }
    } catch (error) {
      setIsFetching(false);
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <NotificationBell />
      <ScrollView>
        <HeaderText styleProp={{ fontSize: 16 }}>
          Welcome {token.doctor_name}!
        </HeaderText>
        <ImageBackground
          source={require("../../assets/images/bluebg.png")}
          style={styles.backgroundImage}
        >
          <View
            style={[globalStyles.deeStart, { padding: 10, borderRadius: 20 }]}
          >
            <NormalText
              fontProp="poppins-semibold"
              styleProp={styles.bannerText}
            >
              {formattedDate}
            </NormalText>
            <NormalText styleProp={styles.subText}>
              You do not have a session today. Check your activity log below for
              more details.
            </NormalText>
          </View>
        </ImageBackground>
        <SearchInput message="Doctors, Products or Services" />
        {isFetching ? (
          <LoadingOverlay message="Fetching your session history" />
        ) : sessions.length > 0 ? (
          <View>
            {pastSessions.length <= 0 ? (
              <View>
                <NormalText>No sessions found</NormalText>
                <PrimaryButton onPress={fetchSessions}>
                  Reload Data
                </PrimaryButton>
              </View>
            ) : (
              <View>
                <View>
                  <NormalText
                    fontProp="poppins-semibold"
                    styleProp={{ color: Colors.mainBlue, marginVertical: 5 }}
                  >
                    Upcoming Appointments
                  </NormalText>
                </View>
                {futureSessions.length > 0 && (
                  <ScrollView horizontal={true}>
                    {futureSessions.map((item, index) => (
                      <NextSessionCard
                        key={index}
                        userimg={item.user_image}
                        username={item.user_name}
                        sessionDate={item.session_date}
                        sessionTime={item.session_start_time}
                      />
                    ))}
                  </ScrollView>
                )}

                <View>
                  <NormalText
                    fontProp="poppins-semibold"
                    styleProp={{ color: Colors.mainBlue, marginVertical: 5 }}
                  >
                    Past Appointments
                  </NormalText>
                </View>

                {pastSessions.length > 0 && (
                  <View>
                    {pastSessions.map((item, index) => (
                      <SessionHistoryCard
                        img={item.user_image}
                        username={item.user_name}
                        sessionDate={item.session_date}
                        sessionTime={item.session_start_time}
                        key={index}
                      />
                    ))}
                  </View>
                )}
              </View>
            )}
          </View>
        ) : (
          <View>
            <NormalText>No Sessions Found</NormalText>
            <PrimaryButton onPress={fetchSessions}>
              Try Again
            </PrimaryButton>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    height: 100,
    resizeMode: "cover",
    borderRadius: 20,
    marginTop: 10,
  },
  bannerText: {
    color: "white",
    fontSize: 16,
  },
  subText: {
    color: "white",
    fontSize: 12,
  },
  cardContainer: {
    flexDirection: "row",
    padding: 10,
  },
});
