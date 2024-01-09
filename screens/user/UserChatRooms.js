import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// import { SearchBar } from "@rneui/themed";

import { Path } from "../../constants/path";
import { AuthContext } from "../../store/auth-context";

import NotificationBell from "../../components/ui/NotificationBell";
import HeaderText from "../../components/ui/HeaderText";
import NormalText from "../../components/ui/NormalText";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import SearchInput from "../../components/FormElements/SearchInput";
import PatientListCard from "../../components/Cards/PatientListCard";

import { globalStyles } from "../../constants/globalcss";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { firestore } from "../../firebaseConfig";
import TransparentButton from "../../components/ui/TransparentButton";

export default function UserChatRooms({ navigation }) {
  const [chats, setChats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    const chatQuery = query(
      collection(firestore, "chats"),
      orderBy("id", "desc")
    );

    const unsubscibe = onSnapshot(chatQuery, (querySnapshot) => {
      const chatRooms = querySnapshot.docs.map((doc) => doc.data());
      setChats(chatRooms);
      setIsLoading(false);
    });

    return unsubscibe;
  }, []);

  const renderItem = ({ item }) => (
    <PatientListCard
      onPress={() => {
        navigation.navigate("ChatScreen", { item: item });
      }}
      username={item.chatName}
    />
  );

  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <NotificationBell />
      {isLoading ? (
        <LoadingOverlay message="Fetching your client list" />
      ) : (
        <View>
          {/* <SearchBar
            placeholder="Search By Name"
            onChangeText={(val) => searchPatiens(val)}
            value={search}
          /> */}
          <TransparentButton
            onPress={() => {
              navigation.navigate("StartNewChat");
            }}
          >
            New ChatRoom
          </TransparentButton>
          <HeaderText>Your Patients</HeaderText>
          <NormalText>List of your patients</NormalText>
          <FlatList
            data={chats}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  chatButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 50,
    zIndex: 999, // Higher z-index to make it appear above other content
  },
});
