import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Modal,
  Linking,
} from "react-native";
import { globalStyles } from "../../constants/globalcss";
import { Colors } from "../../constants/styles";
import PrimaryButton from "../ui/PrimaryButton";
import NormalText from "../ui/NormalText";

export default function AmbulanceModal({ visible, closeModal }) {
  const phoneNumber = "+254758535448"; // Replace with the actual phone number

  const makePhoneCall = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.modalView}>
        <View style={styles.modalInnerView}>
          <View style={styles.chooseView}>
            <Pressable style={styles.card} onPress={makePhoneCall}>
              <Image
                style={styles.image}
                source={require("../../assets/images/out.png")}
              />
              <NormalText styleProp={styles.consultText}>
                External Call
              </NormalText>
            </Pressable>
            <Pressable style={styles.card}>
              <Image
                style={styles.image}
                source={require("../../assets/images/in.png")}
              />
              <NormalText styleProp={styles.consultText}>In-App</NormalText>
              <NormalText styleProp={styles.consultText}>
                (Coming Soon)
              </NormalText>
            </Pressable>
          </View>

          <PrimaryButton onPress={closeModal}>Close</PrimaryButton>
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
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Add a semi-transparent background to dim the rest of the screen
  },
  modalInnerView: {
    width: "80%", // Adjust the width of the modal as needed
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  chooseView: {
    flexDirection: "row",
    width: "100%",
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
    width: "45%",
  },
  consultText: {
    fontSize: 10,
  },
});
