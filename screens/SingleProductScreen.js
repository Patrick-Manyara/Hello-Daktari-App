import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
 
import HeaderText from "../components/ui/HeaderText";
import NormalText from "../components/ui/NormalText";
import PrimaryButton from "../components/ui/PrimaryButton";

import { Path } from "../constants/path";

import { Colors } from "../constants/styles";
import { globalStyles } from "../constants/globalcss";
import Entypo from "react-native-vector-icons/Entypo";

export default function SingleProductScreen({ route, navigation }) {
  const product = route.params.product;
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = async (product) => {
    let itemArray = await AsyncStorage.getItem("cartItems");
    const newItem = { product: product, quantity: quantity };
    itemArray = JSON.parse(itemArray);
    if (itemArray) {
      let array = itemArray;

      // Check if the product already exists in the cart
      const existingProductIndex = array.findIndex(
        (item) => item.product.product_id === product.product_id
      );

      if (existingProductIndex !== -1) {
        // Product already exists, update the quantity
        array[existingProductIndex].quantity = quantity;
      } else {
        // Product doesn't exist, add it to the cart
        array.push(newItem);
      }

      try {
        await AsyncStorage.setItem("cartItems", JSON.stringify(array));
        ToastAndroid.show(
          "Item Added Successfully to cart",
          ToastAndroid.SHORT
        );
      } catch (error) {
        return error;
      }
    } else {
      let array = [];
      array.push(newItem);
      try {
        await AsyncStorage.setItem("cartItems", JSON.stringify(array));
        ToastAndroid.show(
          "Item Added Successfully to cart",
          ToastAndroid.SHORT
        );
      } catch (error) {
        return error;
      }
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <ScrollView style={{ backgroundColor: Colors.lightGrey }}>
        <View style={styles.curvedView}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: Path.IMAGE_URL + product.product_image,
              }}
              style={styles.image}
            />
          </View>
        </View>
        <View style={{ padding: 10 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 14,
            }}
          >
            <Entypo
              name="shopping-cart"
              style={{
                fontSize: 18,
                color: Colors.mainBlue,
                marginRight: 6,
              }}
            />
            <Text
              style={{
                fontSize: 12,
                color: Colors.mainBlue,
              }}
            >
              Shopping
            </Text>
          </View>

          <HeaderText>{product.product_name}</HeaderText>
          <NormalText>Ksh. {product.product_price}</NormalText>

          <View>
            <View style={globalStyles.container}>
              <TouchableOpacity
                onPress={handleDecrement}
                style={globalStyles.buttonMinus}
              >
                <Text style={globalStyles.buttonText}>-</Text>
              </TouchableOpacity>
              <View style={globalStyles.textContainer}>
                <Text style={globalStyles.quantityText}>{quantity}</Text>
              </View>

              <TouchableOpacity
                onPress={handleIncrement}
                style={globalStyles.buttonPlus}
              >
                <Text style={globalStyles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <NormalText>{product.product_description}</NormalText>
          </View>
          <PrimaryButton onPress={() => addToCart(product)}>
            <Text>Add To Cart</Text>
          </PrimaryButton>
        </View>
      </ScrollView> 
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  productCard: {
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
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: 150,
    height: 150,
    objectFit: "contain",
    padding: 10,
  },
  curvedView: {
    height: 200,
    backgroundColor: "white",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});
