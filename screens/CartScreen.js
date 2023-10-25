import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, ScrollView, Text, ToastAndroid } from "react-native";

import NotificationBell from "../components/ui/NotificationBell";
import HeaderText from "../components/ui/HeaderText";
import NormalText from "../components/ui/NormalText";
import CartCard from "../components/Cards/CartCard";
import PrimaryButton from "../components/ui/PrimaryButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingOverlay from "../components/ui/LoadingOverlay";

import { globalStyles } from "../constants/globalcss";

export default function CartScreen({ navigation }) {
  const navigateToCheckout = () => {
    navigation.navigate("CheckoutScreen");
  };

  const [cartData, setCartData] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    // Load cart data from AsyncStorage when the component mounts
    loadCartData();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadCartData();
    });

    return unsubscribe;
  }, [navigation]);

  const loadCartData = async () => {
    try {
      const cartData = await AsyncStorage.getItem("cartItems");
      if (cartData) {
        const parsedCartData = JSON.parse(cartData);
        setCartData(parsedCartData);
        setIsLoadingData(false);
      }
    } catch (error) {
      console.error("Error loading cart data:", error);
      setIsLoadingData(false);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const cartData = await AsyncStorage.getItem("cartItems");
      if (cartData) {
        let parsedCartData = JSON.parse(cartData);

        // Find the index of the item to remove
        const itemIndex = parsedCartData.findIndex(
          (item) => item.product.product_id === productId
        );

        if (itemIndex !== -1) {
          // Remove the item from the array
          parsedCartData.splice(itemIndex, 1);

          // Update the AsyncStorage with the modified cart data
          await AsyncStorage.setItem(
            "cartItems",
            JSON.stringify(parsedCartData)
          );

          // Reload the cart data
          loadCartData();

          // Show a message or toast indicating successful removal
          ToastAndroid.show(
            "Item Removed Successfully from cart",
            ToastAndroid.SHORT
          );
        }
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const emptyCart = async () => {
    try {
      // Clear the cart items in AsyncStorage
      await AsyncStorage.removeItem("cartItems");
      ToastAndroid.show("Cart is empty", ToastAndroid.SHORT);
    } catch (error) {
      console.error("Error emptying cart:", error);
    }
  };

  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <NotificationBell />
      <ScrollView>
        <HeaderText>Cart</HeaderText>
        {!isLoadingData ? (
          <View>
            {cartData.length > 0 ? (
              cartData.map((cartItem) => (
                <CartCard
                  onDelete={() => removeFromCart(cartItem.product.product_id)}
                  key={cartItem.product.product_id}
                  productImage={cartItem.product.product_image}
                  productName={cartItem.product.product_name}
                  productQty={cartItem.quantity}
                  productTotal={(
                    parseFloat(cartItem.product.product_price) *
                    cartItem.quantity
                  ).toFixed(2)}
                  productPrice={parseFloat(
                    cartItem.product.product_price
                  ).toFixed(2)}
                />
              ))
            ) : (
              <Text>No addresses to display.</Text>
            )}
            <View>
              <HeaderText>Order Info:</HeaderText>
              <View style={globalStyles.subTotal}>
                <NormalText>Subtotal:</NormalText>
                <NormalText>Ksh. 1</NormalText>
              </View>
              <View style={globalStyles.subTotal}>
                <NormalText>Shipping Fee:</NormalText>
                <NormalText>Ksh. 1</NormalText>
              </View>
              <View style={globalStyles.subTotal}>
                <NormalText>Total:</NormalText>
                <NormalText>Ksh. 1</NormalText>
              </View>
            </View>
          </View>
        ) : (
          <LoadingOverlay message="Loading cart data" />
        )}

        <PrimaryButton onPress={navigateToCheckout}>
          Proceed To Checkout
        </PrimaryButton>

        <PrimaryButton onPress={emptyCart}>Empty Cart</PrimaryButton>
      </ScrollView>
    </SafeAreaView>
  );
}
