import React from "react";
import { Modal, View, Text, Button, StyleSheet } from "react-native";
import { Colors } from "../../constants/styles";
export default function OrderDetailsModal({ isVisible, onClose, orderData }) {
  return (
    <Modal visible={isVisible} animationType="fade" transparent={true}>
      <View style={styles.modalView}>
        <View style={styles.modalInnerView}>
          <Text>Order Details</Text>
          {orderData.map((order) => (
            <Text key={order.id}>{order.product_name}</Text>
          ))}
          <Button title="Close" onPress={onClose} />
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
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    padding: 5,
    borderRadius: 10,
  },
  consultText: {
    fontSize: 10,
  },
});
