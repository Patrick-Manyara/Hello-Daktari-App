import React, { useState, useEffect } from "react";
import { View, FlatList, ToastAndroid } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Path } from "../../constants/path";

import HeaderText from "../../components/ui/HeaderText";
import NotificationBell from "../../components/ui/NotificationBell";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import LabCard from "../../components/Cards/LabCard";
import NormalText from "../../components/ui/NormalText";
import SearchInput from "../../components/FormElements/SearchInput";
import PrimaryButton from "../../components/ui/PrimaryButton";

import { globalStyles } from "../../constants/globalcss";

export default function LabScreen({ route, navigation }) {
  const [labs, setLabs] = useState([]);
  const baseUrl = Path.API_URL + "lab.php";
  const [isFetching, setIsFetching] = useState(true);
  const [page, setPage] = useState(1);

  const PAGE_SIZE = 5; // Number of items to load at a time

  const fetchLabServices = () => {
    const apiUrl = `${baseUrl}?page=${page}&pageSize=${PAGE_SIZE}`;
    try {
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          setIsFetching(false);
          if (Array.isArray(data.labs)) {
            // Append the fetched labs to the existing list
            setLabs((prevLabs) => [...prevLabs, ...data.labs]);
          } else {
            console.log("No labs");
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
    fetchLabServices();
  }, [page]);

  const loadMore = () => {
    setPage(page + 1);
  };

  const [selectedLabs, setSelectedLabs] = useState([]);

  const handleLabCardPress = (item) => {
    const isItemInCart = selectedLabs.some((lab) => lab.lab_id === item.lab_id);

    if (isItemInCart) {
      // Remove the item from the cart
      const updatedLabs = selectedLabs.filter(
        (lab) => lab.lab_id !== item.lab_id
      );
      setSelectedLabs(updatedLabs);

      ToastAndroid.show("Item Removed From Cart", ToastAndroid.SHORT);
    } else {
      // Add the item to the cart
      setSelectedLabs((prevSelectedLabs) => [...prevSelectedLabs, item]);

      ToastAndroid.show("Item Added Successfully to cart", ToastAndroid.SHORT);
    }
  };

  const navigateToAddressScreen = () => {
    // Pass the selected labs to the next screen or perform any other necessary actions
    navigation.navigate("AddressScreen", { labs: selectedLabs });
  };

  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <NotificationBell />
      {isFetching ? (
        <LoadingOverlay message="Getting Lab Services." />
      ) : (
        <View style={{ marginBottom: 100 }}>
          <SearchInput message="Lab Tests" />
          <HeaderText>Select A Service</HeaderText>

          <NormalText>
            Once you've selected the lab service(s) you would like to access,
            press proceed.
          </NormalText>
          <PrimaryButton onPress={navigateToAddressScreen}>
            Proceed
          </PrimaryButton>
          {labs.length > 0 ? (
            <FlatList
              data={labs}
              keyExtractor={(item) => item.lab_id}
              renderItem={({ item }) => (
                <LabCard
                  name={item.lab_care_name}
                  code={item.lab_care_code}
                  price={item.lab_amount}
                  onPress={() => handleLabCardPress(item)}
                  isInCart={selectedLabs.some(
                    (lab) => lab.lab_id === item.lab_id
                  )}
                />
              )}
              onEndReached={loadMore}
              onEndReachedThreshold={0.1} // Adjust as needed
            />
          ) : (
            <NormalText>No addresses to display.</NormalText>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}
