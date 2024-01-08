import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, FlatList, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Path } from "../../constants/path";
import { AuthContext } from "../../store/auth-context";

import NotificationBell from "../../components/ui/NotificationBell";
import HeaderText from "../../components/ui/HeaderText";
import NormalText from "../../components/ui/NormalText";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import SessionHistoryCard from "../../components/Cards/SessionHistoryCard";
import CategoriesCard from "../../components/Cards/CategoriesCard";

import { globalStyles } from "../../constants/globalcss";
import { Colors } from "../../constants/styles";

export default function SessionHistoryScreen({ navigation }) {
  //TOKEN
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  //SESSIONS
  const [isFetching, setIsFetching] = useState(true);
  const [sessions, setSessions] = useState([]);
  const [initialSessions, setInitialSessions] = useState([]);

  const fetchSessions = () => {
    const fetchurl = Path.API_URL + "session.php";
    const queryParams = `action=all&user_id=${token.user_id}`;
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

  useEffect(() => {
    fetchSessions();
  }, []);

  //CHANNELS
  const [channels, setChannels] = useState(["All"]); // Initialize with 'All' as the first channel
  const [selectedChannel, setSelectedChannel] = useState("All"); // Initialize with 'All' as the selected channel

  const extractUniqueChannels = (sessions) => {
    const uniqueChannels = [
      "All",
      ...new Set(sessions.map((session) => session.session_channel)),
    ];
    return uniqueChannels;
  };

  useEffect(() => {
    if (initialSessions.length > 0) {
      const uniqueChannels = extractUniqueChannels(initialSessions);
      setChannels(uniqueChannels);
    }
  }, [initialSessions]);

  function handleChannelClick(sessionKey) {
    setSelectedChannel(sessionKey);

    if (sessionKey === "All") {
      setSessions(initialSessions);
    } else {
      setIsFetching(true);
      const filteredSessions = initialSessions.filter(
        (session) => session.session_channel === sessionKey
      );
      setIsFetching(false);
      setSessions(filteredSessions);
    }
  }

  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <NotificationBell />
      <HeaderText>Your Session History</HeaderText>
      {isFetching ? (
        <LoadingOverlay message="Getting your session history" />
      ) : sessions.length > 0 ? (
        <View style={{ marginBottom: 150 }}>
          <ScrollView horizontal>
            <View style={{ flexDirection: "row", marginVertical: 10 }}>
              {channels.map((channel, index) => (
                <CategoriesCard
                  key={index}
                  categoryName={channel}
                  onPress={() => handleChannelClick(channel)}
                  isSelected={selectedChannel === channel}
                />
              ))}
            </View>
          </ScrollView>
          <FlatList
            data={sessions}
            keyExtractor={(item, index) => index.toString()} // Use the index as the key
            renderItem={({ item }) => (
              <SessionHistoryCard
                img={item.doctor_image}
                username={item.doctor_name}
                sessionDate={item.session_date}
                sessionTime={item.session_start_time}
              />
            )}
          />
        </View>
      ) : (
        <View>
          <NormalText>No Sessions Found</NormalText>
        </View>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  card: {
    width: "96%",
    backgroundColor: Colors.darkGrey,
    margin: 5,
    borderRadius: 5,
    elevation: 1,
    padding: 5,
    // IOS
    shadowColor: "black",
    shadowOpacity: 0.125,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    //LAYOUT

    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
