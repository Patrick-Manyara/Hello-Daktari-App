import { View, Image, StyleSheet, Pressable } from "react-native";

import NormalText from "../ui/NormalText";

import { Colors } from "../../constants/styles";

export default function FeaturesCard({
  src,
  text,
  onPress,
  bgColor,
  txtColor,
}) {
  return (
    <Pressable onPress={onPress} style={{ width: "33.33%" }}>
      <View style={[styles.featuresCard, { backgroundColor: bgColor }]}>
        <Image style={styles.image} source={src} />
        <NormalText styleProp={[styles.text, { color: txtColor }]}>
          {text}
        </NormalText>
      </View>
    </Pressable>
  );
}
 
const styles = StyleSheet.create({
  featuresCard: {
    justifyContent: "center",
    alignItems: "center",

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
    color: "black",
    marginTop: 2,
  },
});
