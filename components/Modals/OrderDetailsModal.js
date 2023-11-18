import React from "react";
import { Modal, View, StyleSheet, Image } from "react-native";
import { Path } from "../../constants/path";

import NormalText from "../ui/NormalText";
import TransparentButton from "../ui/TransparentButton";

import { Colors } from "../../constants/styles";

export default function OrderDetailsModal({ isVisible, onClose, orderData }) {
  return (
    <Modal visible={isVisible} animationType="fade" transparent={true}>
      <View style={styles.modalView}>
        <View style={styles.modalInnerView}>
          {orderData.map((order) => (
            <View style={styles.card}>
              <View key={order.product_id}>
                <Image
                  source={{
                    uri: Path.IMAGE_URL + order.product_image,
                  }}
                  style={styles.image}
                />
              </View>
              <View key={order.id} style={{ marginLeft: 3 }}>
                <NormalText
                  styleProp={{ fontSize: 10 }}
                  fontProp="poppins-semibold"
                >
                  {order.product_name}
                </NormalText>
                <NormalText>QTY: {order.quantity}</NormalText>
                <NormalText>Ksh. {order.total_price}</NormalText>
              </View>
            </View>
          ))}
          <TransparentButton onPress={onClose}>Close</TransparentButton>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Add a semi-transparent background to dim the rest of the screen
  },
  modalInnerView: {
    width: "80%", // Adjust the width of the modal as needed
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  chooseView: {
    flexDirection: "row",
  },
  image: {
    width: 50,
    height: 50,
  },
  card: {
    backgroundColor: Colors.whiteSmoke,
    alignItems: "center",
    marginVertical: 5,
    padding: 2,
    borderRadius: 5,
    flexDirection: "row",
  },
  consultText: {
    fontSize: 10,
  },
});
