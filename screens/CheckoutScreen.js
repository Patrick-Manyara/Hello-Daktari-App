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

export default function CheckoutScreen({ navigation }) {
  const [addresses, setAddresses] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const [cartData, setCartData] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    // Load cart data from AsyncStorage when the component mounts
    loadCartData();
    fetchAddresses();
  }, []);
 
  const loadCartData = async () => {
    try {
      const cartData = await AsyncStorage.getItem("cartItems");
      if (cartData) {
        const parsedCartData = JSON.parse(cartData);
        setCartData(parsedCartData);
        // console.log(cartData);
        setIsLoadingData(false);
      }
    } catch (error) {
      console.error("Error loading cart data:", error);
      setIsLoadingData(false);
    }
  };

  const [inputs, setInputs] = useState({
    address_name: {
      value: "",
      isValid: true,
    },
    address_label: {
      value: "",
      isValid: true,
    },
    address_location: {
      value: "",
      isValid: true,
    },
    address_phone: {
      value: "",
      isValid: true,
    },
  });

  function handlePaymentOption(keyProp) {
    setSelectedPaymentMethod(keyProp);
  }

  function updateInputValueHandler(inputIdentifier, enteredValue) {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  const renderAddressDropdown = () => (
    <View>
      <HeaderText styleProp={{ fontSize: 12, color: "black" }}>
        Address
      </HeaderText>

      <Picker
        style={[globalStyles.disabledContainer, styles.customInput]}
        selectedValue={selectedAddress}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedAddress(itemValue);
        }}
      >
        <Picker.Item label="Select an address" value={null} />
        {addresses.map((item) => (
          <Picker.Item
            key={item.address_id}
            label={item.address_label}
            value={item}
          />
        ))}
      </Picker>
    </View>
  );

  const renderNewAddressForm = () => (
    <View>
      <HeaderText styleProp={{ fontSize: 12, color: "black" }}>
        Address
      </HeaderText>
      <Input
        label="Address Name"
        onUpdateValue={updateInputValueHandler.bind(this, "address_name")}
        value={inputs.address_name.value}
        isInvalid={!inputs.address_name.isValid}
      />
      <Input
        label="Address Label"
        onUpdateValue={updateInputValueHandler.bind(this, "address_label")}
        value={inputs.address_label.value}
        isInvalid={!inputs.address_label.isValid}
      />
      <Input
        label="Address Location"
        onUpdateValue={updateInputValueHandler.bind(this, "address_location")}
        value={inputs.address_location.value}
        isInvalid={!inputs.address_location.isValid}
      />
      <Input
        label="Address Phone Number"
        onUpdateValue={updateInputValueHandler.bind(this, "address_phone")}
        value={inputs.address_phone.value}
        isInvalid={!inputs.address_phone.isValid}
      />
    </View>
  );

  const fetchAddresses = () => {
    const addressurl = Path.API_URL + "addresses.php";
    const queryParams = `action=all&user_id=${token.user_id}`;
    const url = `${addressurl}?${queryParams}`;
    try {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setIsFetching(false);
          let arr = data.addresses;
          if (Array.isArray(arr)) {
            setAddresses(data.addresses);
            // console.log(arr);
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
    let addressIsInvalid;

    if (addresses.length === 0) {
      addressIsInvalid =
        !inputs.address_name.value ||
        !inputs.address_label.value ||
        !inputs.address_phone.value ||
        !inputs.address_location.value;
    } else {
      addressIsInvalid = !selectedAddress;
    }
    const paymentMethodValidity = !selectedPaymentMethod;
    const submitUrl = Path.API_URL + "checkout.php";
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
              <View>
                {addresses.length === 0 ? (
                  renderNewAddressForm()
                ) : (
                  <View>
                    {renderAddressDropdown()}
                    {selectedAddress && (
                      <View>
                        <DisabledInput
                          placeholder="Address"
                          txt={selectedAddress.address_name}
                        />
                        <DisabledInput
                          placeholder="Location"
                          txt={selectedAddress.address_location}
                        />
                      </View>
                    )}
                  </View>
                )}
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
