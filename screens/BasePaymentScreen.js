import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { AuthContext } from "../store/auth-context";
import { Path } from "../constants/path";

import NotificationBell from "../components/ui/NotificationBell";
import HeaderText from "../components/ui/HeaderText";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import DisabledInput from "../components/FormElements/DisabledInput";
import PaymentCard from "../components/Cards/PaymentCard";
import PrimaryButton from "../components/ui/PrimaryButton";

import { globalStyles } from "../constants/globalcss";

export default function BasePaymentScreen({ route, navigation }) {
  const authCtx = useContext(AuthContext);

  const [token, setToken] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [from, setFrom] = useState("");
  const [table_id, setTableId] = useState("");

  const [labItems, setLabItems] = useState({});
  const [isLab, setIsLab] = useState(false);
  const [address, setAddress] = useState("");

  useEffect(() => {
    setToken(authCtx.token);
    if (route.params) {
      if (route.params?.from) {
        setFrom(route.params.from);
      }
      if (route.params?.table_id) {
        setTableId(route.params.table_id);
      }
      if (route.params?.labs) {
        setLabItems(route.params.labs);
        setIsLab(true);
      } else {
        console.log("Lab parameter is not defined");
      }

      if (route.params.address) {
        setAddress(route.params.address);
      } else {
        console.log("Lab parameter is not defined");
      }
    }
    setIsFetching(false);
    console.log(from);
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
    const submitUrl = Path.API_URL + "payment.php";
    const body = new FormData();
    if (paymentMethodValidity) {
      Alert.alert("Data invalid");
      setIsAdding(false);
    } else {
      body.append("user_id", token.user_id);

      body.append("payment_method", selectedPaymentMethod);
      if (route.params.labs) {
        body.append("from", "lab");
        body.append("address", address);
        body.append("labs", JSON.stringify(labItems));
      } else {
        body.append("from", from);
        body.append("table_id", table_id);
      }

      try {
        let res = await fetch(submitUrl, {
          method: "POST",
          body: body,
        });

        let responseJson = await res.json();
        if (responseJson.data == true) {
          navigation.navigate("SuccessScreen");
        }
        setIsAdding(false);
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
