import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthContext } from "../../store/auth-context";

import HeaderText from "../../components/ui/HeaderText";
import PrimaryButton from "../../components/ui/PrimaryButton";
import NotificationBell from "../../components/ui/NotificationBell";
import AddressCard from "../../components/Cards/AddressCard";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import NormalText from "../../components/ui/NormalText";

import { Colors } from "../../constants/styles";
import { globalStyles } from "../../constants/globalcss";
import { Path } from "../../constants/path";
import UploadList from "../../components/Cards/UploadList";

export default function PatientUploadsScreen({ route, navigation }) {
  const fileUrl = Path.DOC_ULR;
  const [uploads, setUploads] = useState([]);
  const [isSettingState, setIsSettingState] = useState(true);
  const patient = route.params.patient;

  useEffect(() => {
    const assignStates = () => {
      if (route.params && route.params?.item) {
        setUploads(route.params.item);
        setIsSettingState(false);
      }
    };

    assignStates(); // Call it once when the component mounts

    const unsubscribe = navigation.addListener("focus", () => {
      assignStates(); // Call it on focus events
    });

    return unsubscribe;
  }, [route.params, navigation]);

  const navigateToPDF = (upload) => {
    navigation.navigate("PDFScreen", { upload: upload });
  };

  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <NotificationBell />
      <ScrollView>
        {isSettingState ? (
          <LoadingOverlay message="setting data" />
        ) : (
          <View>
            <HeaderText>Uploads For : {patient.user_name}</HeaderText>
            {uploads.length > 0 ? (
              uploads.map((upload) => (
                <UploadList
                  key={upload.upload_id}
                  name={upload.upload_name}
                  file={upload.upload_file}
                  code={upload.upload_code}
                  onPress={() => {
                    navigateToPDF(upload);
                  }}
                />
              ))
            ) : (
              <View>
                <NormalText>You have not saved any uploads.</NormalText>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
