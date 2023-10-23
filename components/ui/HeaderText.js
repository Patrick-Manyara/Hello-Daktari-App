import { Pressable, StyleSheet, Text, View } from "react-native";

import { Colors } from "../../constants/styles";

export default function HeaderText({ children, styleProp }) {
  return <Text style={[styles.headerText, styleProp]}>{children}</Text>;
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    color: Colors.mainBlue,
  },
});
