import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import NotificationBell from "../components/ui/NotificationBell";
import HeaderText from "../components/ui/HeaderText";
import SearchInput from "../components/FormElements/SearchInput";
import LabCard from "../components/Cards/LabCard";
import SearchShopCard from "../components/Cards/SearchShopCard";
import SearchDoctorCard from "../components/Cards/SearchDoctorCard";
import NormalText from "../components/ui/NormalText";

import { globalStyles } from "../constants/globalcss";

export default function SearchResultsScreen({ route, navigation }) {
  const [labs, setLabs] = useState([]);
  const [products, setProducts] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    console.log(route.params);
    if (route.params) {
      if (route.params.doctors) {
        setDoctors(route.params.doctors);
      }
      if (route.params.labs) {
        setLabs(route.params.labs);
      }
      if (route.params.products) {
        setProducts(route.params.products);
      }
    }
  }, []);

  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <NotificationBell />
      <SearchInput />
      <View style={{ marginBottom: 100 }}>
        {labs.length > 0 ? (
          <View>
            <HeaderText
              styleProp={styles.headerText}
              fontProp="poppins-semibold"
            >
              Lab Results
            </HeaderText>

            <FlatList
              data={labs}
              keyExtractor={(item) => item.lab_id}
              renderItem={({ item }) => (
                <LabCard
                  name={item.lab_care_name}
                  code={item.lab_care_code}
                  price={item.lab_amount}
                  onPress={() => navigateToSingleProduct(item)}
                />
              )}
            />
          </View>
        ) : null}

        {products.length > 0 ? (
          <View>
            <HeaderText
              styleProp={styles.headerText}
              fontProp="poppins-semibold"
            >
              Lab Results
            </HeaderText>
            <FlatList
              data={products}
              keyExtractor={(item) => item.product_id}
              renderItem={({ item }) => (
                <SearchShopCard
                  name={item.product_name}
                  price={item.product_price}
                  onPress={() => navigateToSingleProduct(item)}
                />
              )}
            />
          </View>
        ) : null}

        {doctors.length > 0 ? (
          <View>
            <HeaderText
              styleProp={styles.headerText}
              fontProp="poppins-semibold"
            >
              Lab Results
            </HeaderText>
            <FlatList
              data={doctors}
              keyExtractor={(item) => item.doctor_id}
              renderItem={({ item }) => (
                <SearchDoctorCard
                  name={item.doctor_name}
                  price={item.doctor_rate}
                  onPress={() => navigateToSingleProduct(item)}
                />
              )}
            />
          </View>
        ) : null}

        {labs.length < 1 && products.length < 1 && doctors.length < 1 && (
          <NormalText>Nothing found</NormalText>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
  },
});
