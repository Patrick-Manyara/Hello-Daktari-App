import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, Pressable, Animated } from "react-native";
import { Colors } from "../../constants/styles";
import NormalText from "../ui/NormalText";
import TransparentButton from "../ui/TransparentButton";
import PrimaryButton from "../ui/PrimaryButton";
import HeaderText from "../ui/HeaderText";
import { globalStyles } from "../../constants/globalcss";
import { Path } from "../../constants/path";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { faBagShopping, faCheck } from "@fortawesome/free-solid-svg-icons";

export default function ProductCard({
  image,
  title,
  price,
  newPrice,
  productId,
  onPress,
  icon,
  style,
  onAddToCart,
}) {
  // Add a state variable for animation
  const [fadeAnim] = useState(new Animated.Value(0));
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  useEffect(() => {
    // If the product is added to the cart, trigger the animation
    if (isAddedToCart) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000, // Adjust the duration as needed
        useNativeDriver: false, // Add this line for non-native driver
      }).start();
    }
  }, [isAddedToCart, fadeAnim]);

  const handleAddToCart = () => {
    // Call the original onAddToCart function
    onAddToCart();

    // Update state to indicate that the product is added to the cart
    setIsAddedToCart(true);
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
          {/* Conditionally render the icons based on isAddedToCart state */}
          {isAddedToCart ? (
            <Animated.View style={{ opacity: fadeAnim }}>
              <FontAwesomeIcon
                size={20}
                icon={faCheck}
                color={Colors.successGreen}
              />
            </Animated.View>
          ) : (
            <Pressable onPress={() => handleAddToCart()}>
              <FontAwesomeIcon
                size={20}
                icon={faBagShopping}
                color={Colors.mainBlue}
              />
            </Pressable>
          )}
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
