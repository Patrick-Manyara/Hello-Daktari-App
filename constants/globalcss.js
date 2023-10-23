import { StyleSheet } from "react-native";
import { Colors } from "./styles";

const globalStyles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    paddingTop: 5,
    paddingHorizontal: 10,
  },
  centerText: {
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.lightGrey,
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "#F4F5F7",
  },
  icon: {
    fontSize: 20,
    color: "grey",
  },
  smallerText: {
    fontSize: 16,
    marginTop: 5,
  },
  viewCard: {
    flex: 1,
    margin: 5,
    borderRadius: 8,
    elevation: 4,
    padding: 10,
    // IOS
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    backgroundColor: "white",
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  whiteText: {
    color: "white",
  },
  smallerCard: {
    margin: 5,
    borderRadius: 8,
    elevation: 4,
    padding: 10,
    // IOS
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    backgroundColor: "white",
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
});

export { globalStyles };
