import { Pressable, StyleSheet, Text, View } from "react-native";

import { Colors } from "../../constants/styles";

export default function NormalText({ children, styleProp }) {
  return <Text style={[styles.secondaryText, styleProp]}>{children}</Text>;
}

const styles = StyleSheet.create({
  secondaryText: {
    fontSize: 12,
    color: Colors.textColor,
  },
});
