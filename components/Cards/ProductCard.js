import React from "react";
import { View, Image, StyleSheet, Pressable } from "react-native";
import { Colors } from "../../constants/styles";
import NormalText from "../ui/NormalText";
import TransparentButton from "../ui/TransparentButton";
import PrimaryButton from "../ui/PrimaryButton";
import HeaderText from "../ui/HeaderText";
import { globalStyles } from "../../constants/globalcss";
import { Path } from "../../constants/path";
 
export default function ProductCard({
  image,
  title,
  price,
  newPrice,
  productId,
  onPress,
  onAddToCart,
}) {
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
        <Pressable onPress={onAddToCart} style={styles.tagContainer}>
          <Image
            source={require("../../assets/images/cart.png")}
            style={styles.addCartBtn}
          />
        </Pressable>
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
