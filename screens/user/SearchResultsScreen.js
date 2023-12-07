import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import NotificationBell from "../../components/ui/NotificationBell";
import HeaderText from "../../components/ui/HeaderText";
import SearchInput from "../../components/FormElements/SearchInput";
import LabCard from "../../components/Cards/LabCard";
import SearchShopCard from "../../components/Cards/SearchShopCard";
import SearchDoctorCard from "../../components/Cards/SearchDoctorCard";
import NormalText from "../../components/ui/NormalText";

import { globalStyles } from "../../constants/globalcss";

export default function SearchResultsScreen({ route, navigation }) {
  const [labs, setLabs] = useState([]);
  const [products, setProducts] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
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
  }, [route.params]);

  const navigateToAddressScreen = (item) => {
    navigation.navigate("AddressScreen", { lab: item });
  };

  const navigateToSingleProduct = (product) => {
    navigation.navigate("SingleProductScreen", { product: product });
  };

  const navigateToDoctorProfile = (doctor) => {
    navigation.navigate("DoctorProfileScreen", {
      doctor: doctor,
      fromSearch: true,
    });
  };

  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <NotificationBell />
      <SearchInput message="Doctors, Products or Services" />
      <View style={{ marginBottom: 100 }}>
        {labs.length > 0 ? (
          <View>
            <HeaderText
              styleProp={styles.headerText}
              fontProp="poppins-semibold"
            >
              laboratory tests
            </HeaderText>

            <FlatList
              data={labs}
              keyExtractor={(item) => item.lab_id}
              renderItem={({ item }) => (
                <LabCard
                  name={item.lab_care_name}
                  price={item.lab_amount}
                  onPress={() => navigateToAddressScreen(item)}
                />
              )}
            />
          </View>
        ) : null}

        {products.length > 0 ? (
          <View style={{ marginVertical: 24 }}>
            <HeaderText
              styleProp={styles.headerText}
              fontProp="poppins-semibold"
            >
              Products In Our Pharmacy
            </HeaderText>
            <FlatList
              data={products}
              keyExtractor={(item) => item.product_id}
              renderItem={({ item }) => (
                <SearchShopCard
                  image={item.product_image}
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
              Doctors We Have For You
            </HeaderText>
            <FlatList
              data={doctors}
              keyExtractor={(item) => item.doctor_id}
              renderItem={({ item }) => (
                <SearchDoctorCard
                  image={item.doctor_image}
                  name={item.doctor_name}
                  price={item.doctor_rate}
                  onPress={() => navigateToDoctorProfile(item)}
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
    textTransform: "capitalize",
  },
});
