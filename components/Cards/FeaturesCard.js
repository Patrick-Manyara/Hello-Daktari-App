import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { Colors } from "../../constants/styles";
import NormalText from "../ui/NormalText";

export default function FeaturesCard({ src, text }) {
  return (
    <Pressable style={{ width: "33.33%" }}>
      <View style={styles.featuresCard}>
        <Image style={styles.image} source={src} />
        <NormalText styleProp={styles.text}>{text}</NormalText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  featuresCard: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.mainBlue,
    margin: 2,
    height: 100,
    borderRadius: 10,
    width: "95%",
  },
  image: {
    width: 35,
    height: 35,
    objectFit: "contain",
  },
  text: {
    fontSize: 10,
    color: "white",
    marginTop: 2,
  },
});
