import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../../constants/styles";
import NormalText from "../ui/NormalText";
import PrimaryButton from "../ui/PrimaryButton";
import HeaderText from "../ui/HeaderText";
import { globalStyles } from "../../constants/globalcss";

export default function CartCard({
  productImage,
  productName,
  productQty,
  productPrice,
}) {
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
  return (
    <View style={styles.cartCard}>
      <View style={styles.topView}>
        <View style={styles.imageContainer}>
          <Image source={productImage} style={styles.image} />
        </View>
        <View style={styles.detailsView}>
          <NormalText>{productName}</NormalText>
          <NormalText>{productQty}</NormalText>
          <NormalText>{productPrice}</NormalText>
        </View>
        <View>
          <View style={styles.container}>
            <TouchableOpacity onPress={handleDecrement} style={styles.button}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity onPress={handleIncrement} style={styles.button}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.bottomView}>
        <PrimaryButton styleProp={[styles.btn, styles.blueBtn]}>
          Update
        </PrimaryButton>
        <PrimaryButton styleProp={styles.btn}>Delete</PrimaryButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  bottomView: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
  },
  detailsView: {},
  text: {
    marginLeft: 5,
  },
  cartCard: {
    width: "95%",
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
    width: 80,
    height: 80,
    objectFit: "cover",
  },
  btn: {
    width: 100,
  },
  blueBtn: {
    backgroundColor: Colors.mainBlue,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityText: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: "lightgray",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
  },
});
