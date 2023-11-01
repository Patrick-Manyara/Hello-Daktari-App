import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { globalStyles } from "../constants/globalcss";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../store/auth-context";
import NotificationBell from "../components/ui/NotificationBell";
import HeaderText from "../components/ui/HeaderText";
import NormalText from "../components/ui/NormalText";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import DisabledInput from "../components/FormElements/DisabledInput";
import Input from "../components/Auth/Input";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Path } from "../constants/path";
import { Picker } from "@react-native-picker/picker";

import { useNavigation } from "@react-navigation/native";

import PaymentCard from "../components/Cards/PaymentCard";
import PrimaryButton from "../components/ui/PrimaryButton";
import { Alert } from "react-native";

export default function BasePaymentScreen({ route, navigation }) {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [from, setFrom] = useState("");
  const [endpoint, setEndpoint] = useState("");

  useEffect(() => {
    if (route.params) {
      if (route.params.from) {
        setFrom(route.params.from);
      }
    }
  }, [route.params]);

  function handlePaymentOption(keyProp) {
    setSelectedPaymentMethod(keyProp);
  }

  const paymentOptions = [
    {
      text: "Pay with mobile money",
      img1: require("../assets/images/mpesa.png"),
      img2: require("../assets/images/airtel.png"),
      keyProp: "mobile",
    },
    {
      text: "Pay with Credit Card",
      img1: require("../assets/images/visa.png"),
      img2: require("../assets/images/mastercard.png"),
      keyProp: "card",
    },
  ];

  const checkoutHandler = async () => {
    setIsAdding(true);

    const paymentMethodValidity = !selectedPaymentMethod;
    const submitUrl = Path.API_URL + "base_checkout.php";
    const body = new FormData();
    if (addressIsInvalid || paymentMethodValidity) {
      Alert.alert("address is invalid");
      setIsAdding(false);
    } else {
      if (addresses.length === 0) {
        body.append("address_name", inputs.address_name.value);
        body.append("address_label", inputs.address_label.value);
        body.append("address_phone", inputs.address_phone.value);
        body.append("address_location", inputs.address_location.value);
      } else {
        body.append("address_id", selectedAddress.address_id);
      }

      body.append("user_id", token.user_id);
      body.append("cart_data", JSON.stringify(cartData));
      body.append("payment_method", selectedPaymentMethod);

      try {
        fetch(submitUrl, {
          method: "POST",
          body: body,
        })
          .then((response) => response.text())
          .then((data) => {
            setIsAdding(false);
            navigation.navigate("OrderSuccess");
          })
          .catch((error) => {
            setIsAdding(false);
            console.error("Fetch error:", error);
          });
      } catch (error) {
        setIsAdding(false);
        console.error("Request setup error:", error);
      }
    }
  };

  const _maybeRenderUploadingOverlay = () => {
    if (isAdding) {
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
      <NotificationBell />
      <ScrollView>
        {isFetching ? (
          <LoadingOverlay message="Setting all your data." />
        ) : (
          <View>
            <HeaderText>Checkout</HeaderText>
            <View style={globalStyles.viewCard}>
              <View>
                <HeaderText styleProp={{ fontSize: 12, color: "black" }}>
                  Personal Details
                </HeaderText>
                <DisabledInput placeholder="Full Name" txt={token.user_name} />
                <DisabledInput
                  placeholder="Phone Number"
                  txt={token.user_phone}
                />
                <DisabledInput
                  placeholder="Email Address"
                  txt={token.user_email}
                />
              </View>
            </View>
            <View style={globalStyles.viewCard}>
              <View>
                {paymentOptions.map((option, index) => (
                  <PaymentCard
                    key={index}
                    text={option.text}
                    img1={option.img1}
                    img2={option.img2}
                    onPress={() => handlePaymentOption(option.keyProp)}
                    isSelected={selectedPaymentMethod === option.keyProp}
                  />
                ))}
              </View>
            </View>
            <PrimaryButton onPress={checkoutHandler}>Next</PrimaryButton>
          </View>
        )}
      </ScrollView>
      {_maybeRenderUploadingOverlay()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  customInput: {
    height: 50,
    paddingLeft: 5,
    paddingRight: 5,
    paddingVertical: 8,
    marginVertical: 2,
  },
});
