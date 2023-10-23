import { Pressable, StyleSheet, Text, View } from "react-native";

import { Colors } from "../../constants/styles";

export default function TransparentButton({ children, onPress }) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View>
        <Text style={styles.text}>{children}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: Colors.mainPink,
  },
});
