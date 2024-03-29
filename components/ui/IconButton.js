import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "../../constants/styles";
import MediumText from "./MediumText";

function IconButton({
  icon,
  color,
  size,
  onPress,
  styleProp,
  text,
  textStyle,
  iconStyle
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        styleProp,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <Ionicons iconStyle={iconStyle} name={icon} color={color} size={size} />
      {text && <MediumText styleProp={textStyle}>{text}</MediumText>}
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  button: {
    margin: 8,
    borderRadius: 20,
    height: 40,
    width: 40,
    backgroundColor: Colors.lightPink,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.7,
  },
});
