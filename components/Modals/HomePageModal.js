import React from "react";
import { View, Image, StyleSheet, Pressable, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";

import PrimaryButton from "../ui/PrimaryButton";
import NormalText from "../ui/NormalText";

import { Colors } from "../../constants/styles";

export default function HomePageModal({ visible, closeModal }) {
  const navigation = useNavigation();

  const navigateToAvailableDoctors = () => {
    navigation.navigate("AutoDetailsScreen");
    closeModal();
  };

  const navigateToManualDetails = () => {
    navigation.navigate("ManualDetailsScreen");
    closeModal();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.modalView}>
        <View style={styles.modalInnerView}>
          <View style={styles.chooseView}>
            <Pressable style={styles.card} onPress={navigateToAvailableDoctors}>
              <Image
                style={styles.image}
                source={require("../../assets/images/team.png")}
              />
              <NormalText styleProp={styles.consultText}>
                Consult Available Doctor
              </NormalText>
            </Pressable>
            <Pressable style={styles.card} onPress={navigateToManualDetails}>
              <Image
                style={styles.image}
                source={require("../../assets/images/form.png")}
              />
              <NormalText styleProp={styles.consultText}>
                Consult A Specialist
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
