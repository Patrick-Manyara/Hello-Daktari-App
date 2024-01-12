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
import MediumText from "../../components/ui/MediumText";
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
  where,
} from "firebase/firestore";
import { firestore } from "../../firebaseConfig";
import TransparentButton from "../../components/ui/TransparentButton";

export default function UserChatRooms({ navigation }) {
  const [chats, setChats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  //TOKEN
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  useLayoutEffect(() => {
    const chatQuery = query(
      collection(firestore, "chats"),
      orderBy("id", "desc")
    );

    const unsubscribe = onSnapshot(chatQuery, (querySnapshot) => {
      const chatRooms = querySnapshot.docs.map((doc) => doc.data());
      setChats(chatRooms);
      setIsLoading(false);

      const filteredChats = chatRooms.filter(
        (chat) => chat.receiver === token.user_id
      );
      setChats(filteredChats);
    });

    return unsubscribe;
  }, [token.user_id]);

  const renderItem = ({ item }) => (
    <PatientListCard
      onPress={() => {
        navigation.navigate("UserChatScreen", { item: item });
      }}
      img={item.doctor.doctor_image}
      username={item.doctor.doctor_name}
    />
  );

  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <NotificationBell />
      {isLoading ? (
        <LoadingOverlay message="Fetching your chat rooms" />
      ) : (
        <View>
          <MediumText>Your Chats</MediumText>
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
