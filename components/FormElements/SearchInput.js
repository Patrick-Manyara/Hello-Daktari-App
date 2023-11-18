import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Path } from "../../constants/path";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

import { globalStyles } from "../../constants/globalcss";

export default function SearchInput({ message }) {
  const navigation = useNavigation();
  //SUBMISSION
  const [enteredQuery, setEnteredQuery] = useState("");
  const [uploading, setUploading] = useState(false);

  const url = Path.API_URL + "search.php";

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "query":
        setEnteredQuery(enteredValue);
        break;
    }
  }

  let submitForm = async () => {
    try {
      if (enteredQuery != "") {
        setUploading(true);

        const fd = new FormData();
        fd.append("query", enteredQuery);

        let res = await fetch(url, {
          method: "POST",
          body: fd,
        });
        if (res.ok) {
          let responseJson = await res.json();
          if (responseJson.data === true) {
            navigation.navigate("SearchResultsScreen", {
              doctors: responseJson.doctors,
              labs: responseJson.labs,
              products: responseJson.products,
            });
          } else {
            Alert.alert("No results found");
            console.log("error here");
          }
        } else {
          // Handle non-successful HTTP status codes here
          console.log("error here");
        }

        setUploading(false);
      } else {
        setUploading(false);
        alert("Please fill all the fields first");
      }
    } catch (error) {
      // Handle any errors that occur during the try block
      console.error("An error occurred:", error);
      // You can also display an error message to the user if needed
      // alert("An error occurred while submitting the form.");
    }
  };

  const searchingForData = () => {
    if (uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "rgba(0,0,0,0.4)",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <ActivityIndicator color="#fff" animating />
        </View>
      );
    }
  };

  return (
    <View style={[globalStyles.inputContainer, styles.extra]}>
      <TextInput
        style={globalStyles.input}
        placeholder={`Search ${message}`}
        placeholderTextColor="black"
        onChangeText={updateInputValueHandler.bind(this, "query")}
        value={enteredQuery}
      />

      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => [
          globalStyles.button,
          { marginTop: 4 },
          pressed ? globalStyles.buttonPressed : null,
        ]}
        onPress={submitForm}
      >
        <Icon name="search" style={globalStyles.icon} />
      </Pressable>
      {searchingForData()}
    </View>
  );
}

const styles = StyleSheet.create({
  extra: {
    marginVertical: 10,
  },
});
