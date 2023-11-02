import { Pressable, StyleSheet, Text, View } from "react-native";

import { Colors } from "../../constants/styles";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import NormalText from "./NormalText";

function FlatButton({ children, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View>
        <NormalText fontProp="poppins-semibold" styleProp={styles.buttonText}>
          {children}
        </NormalText>
      </View>
    </Pressable>
  );
}

export default FlatButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: "center",
    color: Colors.mainBlue,
  },
});
