import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import { Colors } from "../../constants/styles";
import TransparentButton from "../ui/TransparentButton";
import PrimaryButton from "../ui/PrimaryButton";
import HeaderText from "../ui/HeaderText";
import NormalText from "../ui/NormalText";

export default function TabBlocks({ src, mainText, secondaryText }) {
  return (
    <View style={styles.container}>
      <View style={styles.contentView}>
        <Image style={styles.image} source={src} />
        <HeaderText styleProp={styles.text}>{mainText}</HeaderText>
        <NormalText styleProp={styles.text}>{secondaryText}</NormalText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  contentView: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 250,
    width: 250,
    objectFit: "contain",
  },
  text: {
    textAlign: "center",
  },
  buttonView: {
    width: "100%",
    paddingHorizontal: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
