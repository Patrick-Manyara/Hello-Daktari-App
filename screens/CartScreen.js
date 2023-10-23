import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Image, Pressable } from "react-native";
import { globalStyles } from "../constants/globalcss";
import { SafeAreaView } from "react-native-safe-area-context";
import NotificationBell from "../components/ui/NotificationBell";
import SearchInput from "../components/FormElements/SearchInput";
import HeaderText from "../components/ui/HeaderText";
import NormalText from "../components/ui/NormalText";
import CategoriesCard from "../components/Cards/CategoriesCard";
import CartCard from "../components/Cards/CartCard";
import { useNavigation } from "@react-navigation/native";
import PrimaryButton from "../components/ui/PrimaryButton";
// src, text, qty, price
export default function CartScreen() {
  const navigation = useNavigation();

  const navigateToCheckout = () => {
    navigation.navigate("CheckoutScreen");
  };
  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <NotificationBell />
      <ScrollView>
        <HeaderText>Cart</HeaderText>
        <CartCard
          productImage={require("../assets/images/product.png")}
          productName="Refroeni- 12 blood"
          productQty={1}
          productPrice={4500}
        />
        <CartCard
          productImage={require("../assets/images/product.png")}
          productName="Refroeni- 12 blood"
          productQty={1}
          productPrice={4500}
        />
        <CartCard
          productImage={require("../assets/images/product.png")}
          productName="Refroeni- 12 blood"
          productQty={1}
          productPrice={4500}
        />
        <CartCard
          productImage={require("../assets/images/product.png")}
          productName="Refroeni- 12 blood"
          productQty={1}
          productPrice={4500}
        />
        <PrimaryButton onPress={navigateToCheckout}>
          Proceed To Checkout
        </PrimaryButton>
      </ScrollView>
    </SafeAreaView>
  );
}
