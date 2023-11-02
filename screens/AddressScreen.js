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

import { AuthContext } from "../store/auth-context";
import { Path } from "../constants/path";

import HeaderText from "../components/ui/HeaderText";
import PrimaryButton from "../components/ui/PrimaryButton";
import NotificationBell from "../components/ui/NotificationBell";
import AddressCard from "../components/Cards/AddressCard";
import LoadingOverlay from "../components/ui/LoadingOverlay";

import { Colors } from "../constants/styles";
import { globalStyles } from "../constants/globalcss";
import NormalText from "../components/ui/NormalText";

export default function AddressScreen({ route, navigation }) {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  const [selectedOption, setSelectedOption] = useState(null);
  const [optionExists, setoptionExists] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const [deleting, setIsDeleting] = useState(false);

  const [doctor, setDoctor] = useState("");
  const [session_data, setSessionData] = useState("");

  const [labItem, setLabItem] = useState({});
  const [isLab, setIsLab] = useState(false);

  const baseurl = Path.API_URL + "addresses.php";

  const fetchAddresses = () => {
    const queryParams = `action=all&user_id=${token.user_id}`;
    const url = `${baseurl}?${queryParams}`;
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
      if (route.params.session_data) {
        setSessionData(route.params.session_data);
      }
      if (route.params.lab) {
        setLabItem(route.params.lab);
        setIsLab(true);
        console.log(isLab);
      } else {
        console.log("Lab parameter is not defined");
      }
    }

    console.log(route.params);

    fetchAddresses(); // Ensure this function is not dependent on the route parameters.
  }, [route.params]);

  // Add an event listener to refetch addresses when the screen is focused
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchAddresses();
    });

    return unsubscribe;
  }, [navigation]);

  const navigateToPayment = () => {
    navigation.navigate("PaymentScreen", {
      doctor: doctor,
      session_data: session_data,
      address: selectedOption,
    });
  };

  const navigateToBasePayment = () => {
    navigation.navigate("BasePaymentScreen", {
      lab: labItem,
      address: selectedOption,
    });
  };

  const navigateToAddressManager = (address) => {
    navigation.navigate("AddressManager", { address: address });
  };

  const navigateToAddressManager2 = () => {
    navigation.navigate("AddressManager");
  };

  function handleAddressSelection(keyProp) {
    setSelectedOption(keyProp);
    setoptionExists(true);
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
    const url = `${baseurl}?${queryParams}`;
    const body = new FormData();
    body.append("address_id", address_id);
    try {
      fetch(url, {
        method: "POST",
        body: body,
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
          <LoadingOverlay message="Getting your addresses" />
        ) : (
          <View>
            <HeaderText>Select An Address</HeaderText>
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
                <View>
                  <NormalText>You have not saved any addresses.</NormalText>
                </View>
              )}
            </View>
            <PrimaryButton
              styleProp={styles.blueBtn}
              onPress={navigateToAddressManager2}
            >
              Add Address
            </PrimaryButton>
            {optionExists && (
              <View>
                <PrimaryButton
                  onPress={
                    route.params.lab ? navigateToBasePayment : navigateToPayment
                  }
                >
                  Proceed
                </PrimaryButton>
              </View>
            )}
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
