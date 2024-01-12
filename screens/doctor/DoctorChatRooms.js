import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
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
  where,
} from "firebase/firestore";
import { firestore } from "../../firebaseConfig";
import TransparentButton from "../../components/ui/TransparentButton";
import ChatListCard from "../../components/Cards/ChatListCard";
import IconButton from "../../components/ui/IconButton";
import { Colors } from "../../constants/styles";
import InputHybrid from "../../components/FormElements/InputHybrid";

export default function DoctorChatRooms({ navigation }) {
  //TOKEN
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  const [chats, setChats] = useState(null);
  const [originalChats, setOriginalChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    const chatQuery = query(
      collection(firestore, "chats"),
      orderBy("id", "desc")
    );

    const unsubscribe = onSnapshot(chatQuery, (querySnapshot) => {
      const chatRooms = querySnapshot.docs.map((doc) => doc.data());
      setChats(chatRooms);
      setOriginalChats(chatRooms);
      setIsLoading(false);

      const filteredChats = chatRooms.filter(
        (chat) => chat.sender === token.doctor_id
      );
      setChats(filteredChats);
    });

    return unsubscribe;
  }, [token.doctor_id]);

  const renderItem = ({ item }) => (
    <ChatListCard
      onPress={() => {
        navigation.navigate("ChatScreen", { item: item });
      }}
      img={item.user.user_image}
      userName={item.user.user_name}
      chatName={item.chatName}
    />
  );

  const [search, setSearch] = useState("");

  const searchPatiens = (val) => {
    setSearch(val);
    if (val === "") {
      // If search input is empty, reset to the original list of chats
      setChats(originalChats);
    } else {
      // If search input is not empty, filter the chats based on the search value
      setChats(originalChats.filter((chat) => chat.user.user_name.match(val)));
    }
  };

  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <NotificationBell />
      {isLoading ? (
        <LoadingOverlay message="Fetching your client list" />
      ) : (
        <View style={{ flex: 1 }}>
          <InputHybrid
            placeholder="Search By Name"
            onUpdateValue={(val) => searchPatiens(val)}
            value={search}
          />

          <HeaderText>Your Chats</HeaderText>
          <NormalText>List of your Chats</NormalText>
          <FlatList
            data={chats}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
          <IconButton
            onPress={() => {
              navigation.navigate("StartNewChat", { chats: chats });
            }}
            styleProp={styles.chatButton}
            icon="people"
            color={Colors.mainBlue}
            size={24}
            iconStyle={{ margin: 10 }}
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
    zIndex: 999,
    backgroundColor: Colors.whiteSmoke,
  },
});
