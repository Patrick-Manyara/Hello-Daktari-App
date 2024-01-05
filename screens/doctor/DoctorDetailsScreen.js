import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, ScrollView, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { Path } from "../../constants/path";
import { AuthContext } from "../../store/auth-context";

import NotificationBell from "../../components/ui/NotificationBell";
import HeaderText from "../../components/ui/HeaderText";
import NormalText from "../../components/ui/NormalText";
import ProfileCard from "../../components/Cards/ProfileCard";

import { globalStyles } from "../../constants/globalcss";
import { Colors } from "../../constants/styles";
import LoadingOverlay from "../../components/ui/LoadingOverlay";

export default function DoctorDetailsScreen({ route }) {
  const authCtx = useContext(AuthContext);
  const tk = authCtx.token;

  const [token, setToken] = useState("");

  const [isFetching, setIsFetching] = useState(true);

  const fetchProfile = () => {
    const baseUrl = Path.API_URL + "doctor.php";
    const queryParams = `action=profile&doctor_id=${tk.doctor_id}`;
    const fetchurl = `${baseUrl}?${queryParams}`;
    try {
      fetch(fetchurl)
        .then((response) => response.json())
        .then((data) => {
          setToken(data.data);
          setIsFetching(false);
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
    fetchProfile();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchProfile();
    });

    return unsubscribe;
  }, [navigation]);

  const navigation = useNavigation();

  function navigateToScreen(screenName) {
    navigation.navigate(screenName);
  }

  function navigateWithToken(screenName) {
    navigation.navigate(screenName, { token: token });
  }
  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <NotificationBell />
      <ScrollView>
        {isFetching ? (
          <LoadingOverlay message="Fetching" />
        ) : (
          <View>
            <HeaderText>Profile</HeaderText>
            <View style={styles.profileMain}>
              <View style={styles.profileMainInner}>
                <Pressable style={styles.imageContainer}>
                  <Image
                    source={{
                      uri: Path.IMAGE_URL + token.doctor_image,
                    }}
                    style={styles.image}
                  />
                </Pressable>
                <View style={{ marginLeft: 10 }}>
                  <NormalText styleProp={globalStyles.whiteText}>
                    {token.doctor_name}
                  </NormalText>
                  <NormalText styleProp={globalStyles.whiteText}>
                    {token.doctor_email}
                  </NormalText>
                </View>
              </View>
            </View>
            <NormalText>General</NormalText>
            <ProfileCard
              src={require("../../assets/images/pro_user.png")}
              header="Account Information"
              info="Change your account information"
              onPress={() => navigateWithToken("EditDetailsScreen")}
            />
            <ProfileCard
              src={require("../../assets/images/pro_category.png")}
              header="Specialties"
              info="Change your Specialties"
              onPress={() => navigateWithToken("SpecialtyScreen")}
            />
            <ProfileCard
              src={require("../../assets/images/pro_wallet.png")}
              header="Wallet"
              info="Wallet"
              onPress={() => navigateToScreen("WalletScreen")}
            />
            <ProfileCard
              src={require("../../assets/images/pro_logout.png")}
              header="Logout"
              info="Logout of your account"
              onPress={authCtx.logout}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profileMain: {
    backgroundColor: Colors.darkBlue,
    padding: 10,
    margin: 5,
    borderRadius: 8,
    elevation: 4,
    padding: 10,
    // IOS
    shadowColor: Colors.darkBlue,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  profileMainInner: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {},
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
});
