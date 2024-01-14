import React, { useState, useEffect } from "react";
import { View, ScrollView, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Path } from "../../constants/path";

import HeaderText from "../../components/ui/HeaderText";
import NotificationBell from "../../components/ui/NotificationBell";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import NormalText from "../../components/ui/NormalText";
import UploadList from "../../components/Cards/UploadList";

import { globalStyles } from "../../constants/globalcss";

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

  const openWebURL = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
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
                    openWebURL(`${Path.DOC_ULR}/${upload.upload_file}`);
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
