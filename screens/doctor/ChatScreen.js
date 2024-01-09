import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// import { SearchBar } from "@rneui/themed";

import { Path } from "../../constants/path";
import { AuthContext } from "../../store/auth-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
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
import { Colors } from "../../constants/styles";
import { faSmile } from "@fortawesome/free-regular-svg-icons";

export default function ChatScreen({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const item = route.params.item;
  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <HeaderText>{item.chatName}</HeaderText>
      <View style={styles.outerView}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={160}
        >
          <>
            <ScrollView>
              {isLoading ? (
                <>
                  <View>
                    <ActivityIndicator size={large} color={"#007fff"} />
                  </View>
                </>
              ) : (
                <>{/* messages */}</>
              )}
            </ScrollView>

            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 8,
              }}
            >
              <View
                style={{
                  backgroundColor: Colors.lightGrey,
                  borderRadius: 16,
                  paddingHorizontal: 4,
                  marginHorizontal: 4,
                  paddingVertical: 4,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FontAwesomeIcon icon={faSmile} color={Colors.mainPink} />
              </View>
            </View>
          </>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outerView: {
    borderRadius: 24,
    paddingHorizontal: 16,
    flex: 1,
    
  },
});
