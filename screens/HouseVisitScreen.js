import React, { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  ToastAndroid,
  Text,
  Button,
  Animated,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../store/auth-context";
import { Picker } from "@react-native-picker/picker";

import { Path } from "../constants/path";

import LoadingOverlay from "../components/ui/LoadingOverlay";

import NotificationBell from "../components/ui/NotificationBell";
import HeaderText from "../components/ui/HeaderText";
import PrimaryButton from "../components/ui/PrimaryButton";
import NormalText from "../components/ui/NormalText";
import UrgencyCard from "../components/Cards/UrgencyCard";
import LocationCard from "../components/Cards/LocationCard";
import FieldCard from "../components/Cards/FieldCard";

import { globalStyles } from "../constants/globalcss";

//FIELDS
const SlideInView = ({ text, onClose }) => {
  const [slideAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [slideAnim]);

  const handleOnClose = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => onClose());
  };

  const slideStyles = {
    transform: [
      {
        translateY: slideAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [-10, 0], // Adjust the value as needed for the desired sliding distance
        }),
      },
    ],
  };

  return (
    <Animated.View style={[styles.slideInView, slideStyles]}>
      <Text>{text}</Text>
      <Button title="Close" onPress={handleOnClose} />
    </Animated.View>
  );
};

export default function HouseVisitScreen({ navigation }) {
  //TOKEN AND URLs
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  let queryParams = "";
  let baseurl = "";
  let url = "";

  //URGENCY
  const [selectedUrgency, setSelectedUrgency] = useState(null);

  const urgencyOptions = [
    {
      text: "Urgent. Would like to see available doctor immediately.",
      keyProp: "urgent",
    },
    {
      text: "Scheduled. Select a date and time to see a doctor",
      keyProp: "scheduled",
    },
  ];

  function handleUrgencyOption(keyProp) {
    setSelectedUrgency(keyProp);
  }

  const renderUrgencyOptions = (
    urgencyOptions,
    handleUrgencyOption,
    selectedUrgency
  ) => {
    return (
      <View>
        {urgencyOptions.map((option, index) => (
          <UrgencyCard
            key={index}
            text={option.text}
            onPress={() => handleUrgencyOption(option.keyProp)}
            isSelected={selectedUrgency === option.keyProp}
          />
        ))}
      </View>
    );
  };

  //ADDRESS
  const [selectedOption, setSelectedOption] = useState(null);
  const [optionExists, setoptionExists] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchAddresses = () => {
    queryParams = `action=all&user_id=${token.user_id}`;
    baseurl = Path.API_URL + "addresses.php";
    url = `${baseurl}?${queryParams}`;
    try {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setIsFetching(false);
          let arr = data.addresses;
          if (Array.isArray(arr)) {
            setAddresses(data.addresses);
          } else {
            console.log("No addresses");
          }
        })
        .catch((error) => {
          setIsFetching(false);
          console.error("Fetch error:", error);
        });
    } catch (error) {
      setIsFetching(false);
      console.error("Request setup error:", error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchAddresses();
    });

    return unsubscribe;
  }, [navigation]);

  const navigateToAddressManager = (address) => {
    navigation.navigate("HouseAddressManager", { address: address });
  };

  const navigateToAddressManager2 = () => {
    navigation.navigate("HouseAddressManager");
  };

  function handleAddressSelection(keyProp) {
    setSelectedOption(keyProp);
    setoptionExists(true);
  }

  const removeAddress = (address_id) => {
    setIsDeleting(true);
    baseurl = Path.API_URL + "addresses.php";
    queryParams = `action=delete`;
    url = `${baseurl}?${queryParams}`;
    const body = new FormData();
    body.append("address_id", address_id);
    try {
      fetch(url, {
        method: "POST",
        body: body,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            ToastAndroid.show(
              "Address successfully deleted",
              ToastAndroid.SHORT
            );
            setIsDeleting(false);
            fetchAddresses();
          } else {
            setIsDeleting(false);
            console.error("Failed to delete address:", data.error);
          }
        })
        .catch((error) => {
          setIsDeleting(false);
          console.error("Delete address error:", error);
        });
    } catch (error) {
      setIsDeleting(false);
      console.error("Delete address request setup error:", error);
    }
  };

  const renderAddressCards = (
    addresses,
    selectedOption,
    navigateToAddressManager,
    removeAddress,
    handleAddressSelection,
    navigateToAddressManager2
  ) => {
    if (addresses.length > 0) {
      return (
        <View>
          {addresses.map((address) => (
            <LocationCard
              key={address.address_id}
              location={address.address_name}
              tag={address.address_label}
              description={address.address_phone}
              editAddress={() => navigateToAddressManager(address)}
              removeAddress={() => removeAddress(address.address_id)}
              onPress={() => handleAddressSelection(address.address_id)}
              isSelected={selectedOption === address.address_id}
            />
          ))}
        </View>
      );
    } else {
      return (
        <View>
          <NormalText>You have not saved any addresses.</NormalText>
        </View>
      );
    }
  };

  //DETAILS
  const [enteredDetails, setEnteredDetails] = useState("");

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "details":
        setEnteredDetails(enteredValue);
        break;
    }
  }

  const renderTextInput = (updateInputValueHandler, enteredDetails) => {
    return (
      <View>
        <NormalText>Enter details below(optional):</NormalText>
        <TextInput
          style={{ backgroundColor: "#F4F5F7", borderRadius: 10 }}
          multiline={true}
          numberOfLines={6}
          placeholderTextColor="black"
          onChangeText={updateInputValueHandler.bind(this, "details")}
          value={enteredDetails}
        />
      </View>
    );
  };

  //FIND FOR YOURSELF
  const [selectedSearch, setSelectedSearch] = useState(null);

  const searchOptions = [
    {
      text: "I'd like the system to assign me a doctor",
      keyProp: "assign",
    },
    {
      text: "I'd like to search for a doctor myself",
      keyProp: "myself",
    },
  ];

  function handleSearchOption(keyProp) {
    setSelectedSearch(keyProp);
  }

  const renderSearchOptions = (
    searchOptions,
    handleSearchOption,
    selectedSearch
  ) => {
    return (
      <View>
        {searchOptions.map((option, index) => (
          <UrgencyCard
            key={index}
            text={option.text}
            onPress={() => handleSearchOption(option.keyProp)}
            isSelected={selectedSearch === option.keyProp}
          />
        ))}
      </View>
    );
  };

  //SUBMISSION
  const [uploading, setUploading] = useState(false);

  baseurl = Path.API_URL + "session.php";
  queryParams = `action=house`;
  url = `${baseurl}?${queryParams}`;

  let submitForm = async () => {
    try {
      if (
        selectedUrgency != null &&
        selectedOption != null &&
        selectedSearch != null
      ) {
        setUploading(true);

        const fd = new FormData();

        fd.append("urgency", selectedUrgency);
        fd.append("address", selectedOption);
        fd.append("search", selectedSearch);
        fd.append("details", enteredDetails);
        fd.append("user_id", token.user_id);

        let res = await fetch(url, {
          method: "POST",
          body: fd,
        });
        if (res.ok) {
          let responseJson = await res.json();
          if (responseJson.data === true) {
            if (responseJson.search === "assign") {
              navigation.navigate("DoctorProfileScreen", {
                doctor: responseJson.doctor,
                session_data: responseJson.session_data,
              });
            } else if (responseJson.search === "myself") {
              navigation.navigate("AllDoctorsScreen", {
                doctors: responseJson.doctors,
                session_data: responseJson.session_data,
              });
            }
          } else {
            Alert.alert("Error");
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

  const _maybeRenderUploadingOverlay = () => {
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
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  //RENDER
  const [activeView, setActiveView] = useState(null);

  const handleOpen = (view) => {
    setActiveView(view);
  };

  const handleClose = () => {
    setActiveView(null);
  };

  const renderMainView = () => {
    return (
      <>
        <NotificationBell />
        <FieldCard
          title="Urgency"
          subtitle="Please tell us how urgent this is"
          onPress={() => handleOpen("Urgency")}
          isActive={activeView === "Urgency"}
          handleClose={handleClose}
        />

        {activeView === "Urgency" && (
          <View>
            {renderUrgencyOptions(
              urgencyOptions,
              handleUrgencyOption,
              selectedUrgency
            )}
          </View>
        )}

        <FieldCard
          title="Location"
          subtitle="Please tell us where you are"
          onPress={() => handleOpen("Location")}
          isActive={activeView === "Location"}
          handleClose={handleClose}
        />

        {activeView === "Location" && (
          <View>
            {isFetching || isDeleting ? (
              <LoadingOverlay message="Getting your addresses" />
            ) : (
              <View>
                {renderAddressCards(
                  addresses,
                  selectedOption,
                  navigateToAddressManager,
                  removeAddress,
                  handleAddressSelection,
                  navigateToAddressManager2
                )}
                <PrimaryButton
                  styleProp={styles.blueBtn}
                  onPress={navigateToAddressManager2}
                >
                  Add Address
                </PrimaryButton>
              </View>
            )}
          </View>
        )}

        <FieldCard
          title="Search"
          subtitle="Please tell us where you are"
          onPress={() => handleOpen("Search")}
          isActive={activeView === "Search"}
          handleClose={handleClose}
        />

        {activeView === "Search" && (
          <View>
            {renderSearchOptions(
              searchOptions,
              handleSearchOption,
              selectedSearch
            )}
          </View>
        )}
        <FieldCard
          title="Details"
          subtitle="Please tell us where you are"
          onPress={() => handleOpen("Details")}
          isActive={activeView === "Details"}
          handleClose={handleClose}
        />

        {activeView === "Details" && (
          <View>
            {renderTextInput(updateInputValueHandler, enteredDetails)}
          </View>
        )}
        <PrimaryButton onPress={submitForm}>Proceed</PrimaryButton>
        {_maybeRenderUploadingOverlay()}
      </>
    );
  };

  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      {renderMainView()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  customInput: {
    height: 50,
    paddingLeft: 5,
    paddingRight: 5,
    paddingVertical: 8,
    marginVertical: 2,
  },

  mainView: {
    marginBottom: 16,
  },
  slideInView: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "lightgray",
    padding: 8,
    borderRadius: 5,
  },
});
