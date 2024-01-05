import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthContext } from "../../store/auth-context";
import { Path } from "../../constants/path";

import HeaderText from "../../components/ui/HeaderText";
import PrimaryButton from "../../components/ui/PrimaryButton";
import NotificationBell from "../../components/ui/NotificationBell";
import AddressCard from "../../components/Cards/AddressCard";
import LoadingOverlay from "../../components/ui/LoadingOverlay";

import { Colors } from "../../constants/styles";
import { globalStyles } from "../../constants/globalcss";

export default function ProfileAddressScreen({ route, navigation }) {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  const [selectedOption, setSelectedOption] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const [deleting, setIsDeleting] = useState(false);

  const [doctor, setDoctor] = useState("");
  const [channel, setChannel] = useState("");
  const [session_data, setSessionData] = useState("");

  const baseUrl = Path.API_URL + "addresses.php";

  const fetchAddresses = () => {
    const queryParams = `action=all&user_id=${token.user_id}`;
    const url = `${baseUrl}?${queryParams}`;
    try {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setIsFetching(false);
          let arr = data.addresses;
          if (Array.isArray(arr)) {
            setAddresses(data.addresses);
          } else {
            console.log("No addresses");
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
    if (route.params) {
      if (route.params.doctor) {
        setDoctor(route.params.doctor);
      }
      if (route.params.channel) {
        setChannel(route.params.channel);
      }
      if (route.params.session_data) {
        setSessionData(route.params.session_data);
      }
    }

    fetchAddresses(); // Ensure this function is not dependent on the route parameters.
  }, [route.params]);

  // Add an event listener to refetch addresses when the screen is focused
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchAddresses();
    });

    return unsubscribe;
  }, [navigation]);

  const navigateToProfile = () => {
    navigation.navigate("ProfileScreen2");
  };

  const navigateToAddressManager = (address) => {
    navigation.navigate("AddressManager", { address: address });
  };

  const navigateToAddressManager2 = () => {
    navigation.navigate("AddressManager");
  };

  function handleAddressSelection(keyProp) {
    setSelectedOption(keyProp);
    console.log(`Selected option: ${keyProp}`);
  }

  //RENDER

  const _maybeRenderUploadingOverlay = () => {
    if (deleting) {
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

  const removeAddress = (address_id) => {
    setIsDeleting(true);
    const queryParams = `action=delete`;
    const url = `${baseUrl}?${queryParams}`;
    const formData = new FormData();
    formData.append("address_id", address_id);
    try {
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            ToastAndroid.show(
              "Address successfully deleted",
              ToastAndroid.SHORT
            );
            setIsDeleting(false);
            fetchAddresses();
          } else {
            setIsDeleting(false);
            console.error("Failed to delete address:", data.error);
          }
        })
        .catch((error) => {
          setIsDeleting(false);
          console.error("Delete address error:", error);
        });
    } catch (error) {
      setIsDeleting(false);
      console.error("Delete address request setup error:", error);
    }
  };

  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <NotificationBell />
      <ScrollView>
        {isFetching ? (
          <LoadingOverlay message="Fetching products." />
        ) : (
          <View>
            <HeaderText>Enter Your Address</HeaderText>
            <View>
              {addresses.length > 0 ? (
                addresses.map((address) => (
                  <AddressCard
                    key={address.address_id}
                    location={address.address_name}
                    tag={address.address_label}
                    description={address.address_location}
                    editAddress={() => navigateToAddressManager(address)}
                    removeAddress={() => removeAddress(address.address_id)}
                    onPress={() => handleAddressSelection(address.address_id)}
                    isSelected={selectedOption === address.address_id}
                  />
                ))
              ) : (
                <Text>No addresses to display.</Text>
              )}
            </View>
            <PrimaryButton
              styleProp={styles.blueBtn}
              onPress={navigateToAddressManager2}
            >
              Add Address
            </PrimaryButton>

            <PrimaryButton onPress={navigateToProfile}>
              Back To Profile
            </PrimaryButton>
          </View>
        )}
        {_maybeRenderUploadingOverlay()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  blueBtn: {
    backgroundColor: Colors.mainBlue,
  },
});
