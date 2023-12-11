import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthContext } from "../../store/auth-context";
import { getDayAndMonth } from "../../util/dateFormat";
import LoadingOverlay from "../../components/ui/LoadingOverlay";

import NotificationBell from "../../components/ui/NotificationBell";
import HeaderText from "../../components/ui/HeaderText";
import NormalText from "../../components/ui/NormalText";
import SearchInput from "../../components/FormElements/SearchInput";

import { Path } from "../../constants/path";

import { globalStyles } from "../../constants/globalcss";
import { Colors } from "../../constants/styles";
import NextSessionCard from "../../components/Cards/NextSessionCard";
import PrimaryButton from "../../components/ui/PrimaryButton";

export default function DoctorWelcomeScreen() {
  const authCtx = useContext(AuthContext);
  const today = new Date();

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(today);

  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(authCtx.token);
  }, [authCtx]);

  useEffect(() => {
    fetchSessions();
  }, []);

  const [futureSessions, setFutureSessions] = useState([]);
  const [pastSessions, setPastSessions] = useState([]);

  useEffect(() => {
    // Separate future and past sessions
    const today = new Date().toISOString().split("T")[0];
    const future = sessions.filter((session) => session.session_date > today);
    const past = sessions.filter((session) => session.session_date < today);

    setFutureSessions(future);
    setPastSessions(past);
  }, [sessions]);

  //SESSIONS
  const [isFetching, setIsFetching] = useState(true);
  const [sessions, setSessions] = useState([]);
  const [initialSessions, setInitialSessions] = useState([]);

  const fetchSessions = () => {
    const fetchurl = Path.API_URL + "session.php";
    const queryParams = `action=docall&doctor_id=${token.doctor_id}`;
    const url = `${fetchurl}?${queryParams}`;
    try {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setIsFetching(false);
          let arr = data.sessions;
          if (Array.isArray(arr)) {
            setSessions(data.sessions);
            setInitialSessions(data.sessions);
          } else {
            console.log("No sessions");
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

  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <NotificationBell />
      <ScrollView>
        <View>
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
                You do not have a session today. Check your activity log below
                for more details.
              </NormalText>
            </View>
          </ImageBackground>
          <SearchInput message="Doctors, Products or Services" />
          {isFetching ? (
            <LoadingOverlay message="Fetching your session history" />
          ) : sessions.length > 0 ? (
            <View>
              {futureSessions.length > 0 ? (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.cardContainer}
                >
                  {futureSessions.map((item) => (
                    <NextSessionCard
                      key={item.session_id}
                      userimg={item.user_image}
                      username={item.user_name}
                      sessionDate={item.session_date}
                      sessionTime={item.session_start_time}
                    />
                  ))}
                </ScrollView>
              ) : (
                <View>
                  <NormalText>No sessions found</NormalText>
                  <PrimaryButton onPress={fetchSessions}>Reload</PrimaryButton>
                </View>
              )}
            </View>
          ) : (
            <View>
              <NormalText>No Sessions Found</NormalText>
            </View>
          )}
        </View>
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
