import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Path } from "../constants/path";

import HeaderText from "../components/ui/HeaderText";
import NotificationBell from "../components/ui/NotificationBell";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import LabCard from "../components/Cards/LabCard";
import NormalText from "../components/ui/NormalText";

import { globalStyles } from "../constants/globalcss";

export default function LabScreen({ route, navigation }) {
  const [labs, setLabs] = useState([]);
  const baseurl = Path.API_URL + "lab.php";
  const [isFetching, setIsFetching] = useState(true);
  const [page, setPage] = useState(1);

  const PAGE_SIZE = 5; // Number of items to load at a time

  const fetchLabServices = () => {
    const apiUrl = `${baseurl}?page=${page}&pageSize=${PAGE_SIZE}`;
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

  const navigateToAddressScreen = (item) => {
    navigation.navigate("AddressScreen", { lab: item });
  };

  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <NotificationBell />
      {isFetching ? (
        <LoadingOverlay message="Getting Lab Services." />
      ) : (
        <View style={{ marginBottom: 100 }}>
          <HeaderText>Select A Service</HeaderText>
          <NormalText>
            Which lab service(s) would you like to access?
          </NormalText>
          {labs.length > 0 ? (
            <FlatList
              data={labs}
              keyExtractor={(item) => item.lab_id}
              renderItem={({ item }) => (
                <LabCard
                  name={item.lab_care_name}
                  code={item.lab_care_code}
                  price={item.lab_amount}
                  onPress={() => navigateToAddressScreen(item)}
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
