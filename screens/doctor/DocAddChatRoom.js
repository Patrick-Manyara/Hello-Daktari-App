import React, { useState, useEffect, useContext } from "react";
import {
  FlatList,
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Path } from "../../constants/path";
import { AuthContext } from "../../store/auth-context";

import NotificationBell from "../../components/ui/NotificationBell";
import HeaderText from "../../components/ui/HeaderText";
import NormalText from "../../components/ui/NormalText";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import SearchInput from "../../components/FormElements/SearchInput";
import PatientListCard from "../../components/Cards/PatientListCard";

import { doc, setDoc } from "firebase/firestore";

import { globalStyles } from "../../constants/globalcss";
import { firestore } from "../../firebaseConfig";
import PrimaryButton from "../../components/ui/PrimaryButton";

export default function DocAddChatRoom({ route, navigation }) {
  const user = route.params.user;
  const [addChat, setAddChat] = useState("");

  const createNewChat = async () => {
    setIsSubmitting(true);
    let id = `${Date.now()}`;
    const _doc = {
      id: id,
      user: user,
      chatName: addChat,
    };

    if (addChat !== "") {
      setDoc(doc(firestore, "chats", id), _doc)
        .then(() => {
          setIsSubmitting(false);
          setAddChat("");
          navigation.navigate("DoctorChatRooms");
        })
        .catch((err) => {
          setIsSubmitting(false);
          console.log("Error:", err);
        });
    } else {
      Alert.alert("Data needed");
      setIsSubmitting(false);
    }
  };

  //RENDER
  const [isSubmitting, setIsSubmitting] = useState(false);
  const _maybeRenderUploadingOverlay = () => {
    if (isSubmitting) {
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

  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <NormalText>{user.user_name}</NormalText>
      <View>
        <TextInput
          placeholder="Create A Chat"
          value={addChat}
          onChangeText={(text) => setAddChat(text)}
        />
        <PrimaryButton onPress={createNewChat}>Send</PrimaryButton>
      </View>
      {_maybeRenderUploadingOverlay()}
    </SafeAreaView>
  );
}
