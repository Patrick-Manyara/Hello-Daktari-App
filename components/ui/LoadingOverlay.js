import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import NormalText from "./NormalText";
function LoadingOverlay({ message }) {
  return (
    <View style={styles.rootContainer}>
      <NormalText style={styles.message}>{message}</NormalText>
      <ActivityIndicator size="large" />
    </View>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  message: {
    fontSize: 16,
    marginBottom: 12,
  },
});
