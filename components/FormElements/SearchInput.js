import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { globalStyles } from "../../constants/globalcss";

export default function SearchInput() {
  return (
    <View style={[globalStyles.inputContainer, styles.extra]}>
      <TextInput
        style={globalStyles.input}
        placeholder="Search Anything..."
        placeholderTextColor="black"
      />
      <Icon name="search" style={globalStyles.icon} />
    </View>
  );
}

const styles = StyleSheet.create({
  extra: {
    marginVertical: 10,
  },
});
