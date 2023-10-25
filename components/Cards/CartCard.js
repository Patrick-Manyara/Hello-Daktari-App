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
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Path } from "../../constants/path";

export default function CartCard({
  productImage,
  productName,
  productQty,
  productPrice,
  productTotal,
  onDelete,
}) {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <View style={styles.cartCard}>
      <View style={styles.topView}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: Path.IMAGE_URL + productImage,
            }}
            style={styles.image}
          />
        </View>
        <View>
          <HeaderText styleProp={{ fontSize: 12 }}>{productName}</HeaderText>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <NormalText>
              {productQty} x Ksh. {productPrice} :{" "}
            </NormalText>
            <HeaderText styleProp={{ fontSize: 12 }}>
              Ksh. {productTotal}
            </HeaderText>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingBottom: 5,
        }}
      >
        <View>
          <NormalText>In Stock</NormalText>
        </View>
        <Pressable
          onPress={onDelete}
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Colors.whiteSmoke,
          }}
        >
          <FontAwesomeIcon icon={faTrash} color={Colors.mainPink} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    padding: 5,
  },
  bottomView: {
    justifyContent: "flex-end",
    flexDirection: "row",
    width: "100%",
    paddingVertical: 10,
    paddingRight: 10,
  },
  detailsView: {},
  text: {
    marginLeft: 5,
  },
  cartCard: {
    width: "98%",
    backgroundColor: Colors.lightGrey,
    margin: 5,
    borderRadius: 8,
    elevation: 4,

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
});
