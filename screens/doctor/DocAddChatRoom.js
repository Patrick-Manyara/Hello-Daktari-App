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
import MediumText from "../../components/ui/MediumText";
import NormalText from "../../components/ui/NormalText";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import SearchInput from "../../components/FormElements/SearchInput";
import PatientListCard from "../../components/Cards/PatientListCard";
import InputHybrid from "../../components/FormElements/InputHybrid";

import { doc, setDoc } from "firebase/firestore";

import { globalStyles } from "../../constants/globalcss";
import { firestore } from "../../firebaseConfig";
import PrimaryButton from "../../components/ui/PrimaryButton";

export default function DocAddChatRoom({ route, navigation }) {
  //TOKEN
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  const user = route.params.user;
  const [addChat, setAddChat] = useState("");

  const createNewChat = async () => {
    setIsSubmitting(true);
    let id = `${Date.now()}`;
    const _doc = {
      id: id,
      user: user,
      doctor: token,
      chatName: addChat,
      sender: token.doctor_id,
      receiver: user.user_id,
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
      <MediumText> Starting a new chat with {user.user_name} </MediumText>
      <View style={{ flex: 1 }}>
        <NormalText>Give the chat a chatroom name.</NormalText>
        <InputHybrid
          placeholder="Add Chatroom Name"
          value={addChat}
          onUpdateValue={(text) => setAddChat(text)}
        />
      </View>
      <View>
        <PrimaryButton onPress={createNewChat}>Send</PrimaryButton>
      </View>
      {_maybeRenderUploadingOverlay()}
    </SafeAreaView>
  );
}
