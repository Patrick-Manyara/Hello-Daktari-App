import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, Pressable, Animated } from "react-native";

import { Path } from "../../constants/path";

import NormalText from "../ui/NormalText";
import HeaderText from "../ui/HeaderText";

import { Colors } from "../../constants/styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBagShopping, faCheck } from "@fortawesome/free-solid-svg-icons";

export default function ProductCard({
  image,
  title,
  price,
  newPrice,
  onPress,
  onAddToCart,
}) {
  const handleAddToCart = () => {
    onAddToCart();
  };

  return (
    <View style={styles.productCard}>
      <View style={styles.imageContainer}>
        <Pressable onPress={onPress}>
          <Image
            source={{
              uri: Path.IMAGE_URL + image,
            }}
            style={styles.image}
          />
        </Pressable>
      </View>
      <View style={styles.textBlock}>
        <Pressable onPress={onPress}>
          <HeaderText styleProp={{ fontSize: 12 }}>{title}</HeaderText>
        </Pressable>

        <NormalText>Ksh. {price}</NormalText>
        <NormalText>{newPrice}</NormalText>
      </View>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <View style={styles.tagContainer}>
          <Pressable onPress={onAddToCart}>
            <FontAwesomeIcon
              size={20}
              icon={faBagShopping}
              color={Colors.mainBlue}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  productCard: {
    width: "45%",
    backgroundColor: Colors.lightGrey,
    margin: 5,
    borderRadius: 8,
    elevation: 4,
    padding: 5,
    // IOS
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    backgroundColor: "white",
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  textBlock: {},
  tagContainer: {
    borderRadius: 4,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: Colors.mainBlue,
    padding: 2,
  },
  image: {
    width: 100,
    height: 100,
    objectFit: "cover",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addCartBtn: {
    height: 16,
    width: 16,
    objectFit: "contain",
  },
  tagContainer: {
    borderRadius: 4,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: Colors.mainBlue,
    padding: 2,
  },
});
