import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
} from "react-native";
import { globalStyles } from "../constants/globalcss";
import { SafeAreaView } from "react-native-safe-area-context";
import NotificationBell from "../components/ui/NotificationBell";
import { Colors } from "../constants/styles";
import SearchInput from "../components/FormElements/SearchInput";
import HeaderText from "../components/ui/HeaderText";
import NormalText from "../components/ui/NormalText";
import CategoriesCard from "../components/Cards/CategoriesCard";
import ProductCard from "../components/Cards/ProductCard";
import { useNavigation } from "@react-navigation/native";
import PrimaryButton from "../components/ui/PrimaryButton";
import { Path } from "../constants/path";

export default function SingleProductScreen({ route, navigation }) {
  const product = route.params.product;
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
    console.log("Quantity increased:", quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      console.log("Quantity decreased:", quantity - 1);
    }
  };

  function addToCartHandler() {}

  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <NotificationBell />
      <ScrollView>
        <View>
          <HeaderText>Shop this product</HeaderText>
          <View style={styles.productCard}>
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: Path.IMAGE_URL + product.product_image,
                }}
                style={styles.image}
              />
            </View>
            <HeaderText>{product.product_name}</HeaderText>
            <NormalText>Ksh. {product.product_price}</NormalText>

            <View>
              <View style={styles.container}>
                <TouchableOpacity
                  onPress={handleDecrement}
                  style={styles.buttonMinus}
                >
                  <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <View style={styles.textContainer}>
                  <Text style={styles.quantityText}>{quantity}</Text>
                </View>

                <TouchableOpacity
                  onPress={handleIncrement}
                  style={styles.buttonPlus}
                >
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <NormalText>{product.product_description}</NormalText>
            </View>
            <PrimaryButton onPress={addToCartHandler}>
              Add To Cart
            </PrimaryButton>
          </View>
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
  },
  image: {
    width: 200,
    height: 200,
    objectFit: "contain",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
  },
  quantityText: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  buttonMinus: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",

    borderRightColor: Colors.lightBlue,
    borderRightWidth: 2,

    borderLeftColor: Colors.lightBlue,
    borderLeftWidth: 2,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,

    borderTopColor: Colors.lightBlue,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderBottomColor: Colors.lightBlue,
  },
  buttonPlus: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",

    borderLeftColor: Colors.lightBlue,
    borderLeftWidth: 2,

    borderRightColor: Colors.lightBlue,
    borderRightWidth: 2,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,

    borderTopColor: Colors.lightBlue,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderBottomColor: Colors.lightBlue,
  },
  textContainer: {
    borderTopColor: Colors.lightBlue,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderBottomColor: Colors.lightBlue,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
  },
});
