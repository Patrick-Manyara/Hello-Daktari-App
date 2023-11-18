import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Pressable,
  ToastAndroid,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import NotificationBell from "../components/ui/NotificationBell";
import SearchInput from "../components/FormElements/SearchInput";
import HeaderText from "../components/ui/HeaderText";
import NormalText from "../components/ui/NormalText";
import CategoriesCard from "../components/Cards/CategoriesCard";
import ProductCard from "../components/Cards/ProductCard";
import LoadingOverlay from "../components/ui/LoadingOverlay";

import { Path } from "../constants/path";

import { globalStyles } from "../constants/globalcss";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { faBagShopping, faCheck } from "@fortawesome/free-solid-svg-icons";

export default function ShopScreen({ route, navigation }) {
  const [products, setProducts] = useState([]);
  const [initialProducts, setInitialProducts] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [categories, setCategories] = useState([
    { category_id: "ALL", category_name: "ALL" },
  ]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  //fetching
  const productsUrl = Path.API_URL + "products.php?action=all";
  const categoriesUrl = Path.API_URL + "products.php?action=categories";
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    try {
      fetch(productsUrl)
        .then((response) => response.json())
        .then((data) => {
          setIsFetching(false);
          const productData = data.products;
          setProducts(productData);

          const uniqueCategoryPairs = [
            ...new Set(
              productData.map((product) =>
                JSON.stringify({
                  category_id: product.category_id,
                  category_name: product.category_name,
                })
              )
            ),
          ];
          // Convert the unique pairs back to an array
          const categoryArray = uniqueCategoryPairs.map((pairString) =>
            JSON.parse(pairString)
          );

          // Add "ALL" category if not already included
          if (
            !categoryArray.some((category) => category.category_id === "ALL")
          ) {
            categoryArray.unshift({ category_id: "ALL", category_name: "ALL" });
          }

          // Set the categories state with the unique category_id and category_name pairs
          setCategories(categoryArray);

          setInitialProducts(data.products);
        })
        .catch((error) => {
          setIsFetching(false);
          console.error("Fetch error:", error);
        });
    } catch (error) {
      setIsFetching(false);
      console.error("Request setup error:", error);
    }
  }, []);

  function handleCategoryClick(categoryKey) {
    setSelectedCategory(categoryKey);

    if (categoryKey === "ALL") {
      setProducts(initialProducts);
    } else {
      setIsFetching(true);
      const filteredProducts = initialProducts.filter(
        (product) => product.category_id === categoryKey
      );
      setIsFetching(false);
      setProducts(filteredProducts);
    }
  }

  const navigateToSingleProduct = (product) => {
    navigation.navigate("SingleProductScreen", { product: product });
  };

  //ADD TO CART
  const addToCart = async (product) => {
    let itemArray = await AsyncStorage.getItem("cartItems");
    const newItem = { product: product, quantity: quantity };
    itemArray = JSON.parse(itemArray);
    if (itemArray) {
      let array = itemArray;

      // Check if the product already exists in the cart
      const existingProductIndex = array.findIndex(
        (item) => item.product.product_id === product.product_id
      );

      if (existingProductIndex !== -1) {
        // Product already exists, update the quantity
        array[existingProductIndex].quantity = quantity;
      } else {
        // Product doesn't exist, add it to the cart
        array.push(newItem);
      }

      try {
        await AsyncStorage.setItem("cartItems", JSON.stringify(array));
        setIcon("faCheck");
        ToastAndroid.show(
          "Item Added Successfully to cart",
          ToastAndroid.SHORT
        );
      } catch (error) {
        return error;
      }
    } else {
      let array = [];
      array.push(newItem);
      try {
        await AsyncStorage.setItem("cartItems", JSON.stringify(array));
        ToastAndroid.show(
          "Item Added Successfully to cart",
          ToastAndroid.SHORT
        );
      } catch (error) {
        return error;
      }
    }
  };

  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <NotificationBell />
      <ScrollView>
        {isFetching ? (
          <LoadingOverlay message="Fetching products." />
        ) : (
          <View>
            <HeaderText>Pharmacy</HeaderText>
            <SearchInput message="Products/Items" />
            <ScrollView horizontal>
              <View style={{ flexDirection: "row" }}>
                {categories.map((category) => (
                  <CategoriesCard
                    key={category.category_id}
                    categoryName={category.category_name}
                    onPress={() => handleCategoryClick(category.category_id)}
                    isSelected={selectedCategory === category.category_id}
                  />
                ))}
              </View>
            </ScrollView>
            <View style={styles.sortContainer}>
              <Pressable style={styles.sortInner}>
                <Image
                  source={require("../assets/images/filter.png")}
                  style={styles.image}
                />
                <NormalText>Filter</NormalText>
              </Pressable>
              <Pressable style={styles.sortInner}>
                <Image
                  source={require("../assets/images/sort.png")}
                  style={styles.image}
                />
                <NormalText>Sort By</NormalText>
              </Pressable>
            </View>
            {products && (
              <View style={styles.productContainer}>
                {products.map((product, index) => (
                  <ProductCard
                    key={product.product_id}
                    image={product.product_image}
                    title={product.product_name}
                    price={product.product_price}
                    newPrice={product.product_offer_price}
                    onPress={() => navigateToSingleProduct(product)}
                    style={styles.column}
                    onAddToCart={() => addToCart(product)}
                    
                  />
                ))}
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 20,
    height: 20,
    objectFit: "contain",
    marginHorizontal: 2,
  },
  sortContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginVertical: 10,
  },
  sortInner: {
    flexDirection: "row",
    marginHorizontal: 2,
  },
  productContainer: {
    flexDirection: "row", // Arrange child Views in a row
    flexWrap: "wrap", // Allow wrapping to the next row
    width: "100%",
    justifyContent: "flex-start",
  },
  column: {
    flexBasis: "50%", // Distribute the columns evenly in a row
  },
});
