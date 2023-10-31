import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text,
  Pressable,
} from "react-native";
import { AuthContext } from "../store/auth-context";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import NotificationBell from "../components/ui/NotificationBell";
import HeaderText from "../components/ui/HeaderText";
import NormalText from "../components/ui/NormalText";
import ProfileCard from "../components/Cards/ProfileCard";
import LoadingOverlay from "../components/ui/LoadingOverlay";

import { Path } from "../constants/path";

import { globalStyles } from "../constants/globalcss";
import { Colors } from "../constants/styles";

export default function ShoppingHistoryScreen({ navigation }) {
  //token fetching
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const [orders, setOrders] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const [ordersGrouped, setGroupedOrdersByMonthAndOrderId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    const baseurl = Path.API_URL + "profile.php";
    const queryParams = `action=orders&user_id=${token.user_id}`;
    const url = `${baseurl}?${queryParams}`;
    try {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setIsFetching(false);
          let arr = data.orders;
          if (Array.isArray(arr)) {
            setOrders(data.orders);
            const groupedData = processOrders(data.orders); // Process the data
            setGroupedOrdersByMonthAndOrderId(groupedData); // Set the processed data
          } else {
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

  // Define a function to process and group the orders
  const processOrders = (ordersData) => {
    // Sort the orders by date_created in descending order (latest to oldest).
    const sortedOrders = ordersData.sort((a, b) => {
      const dateA = new Date(a.date_created);
      const dateB = new Date(b.date_created);
      return dateB - dateA;
    });

    // Group the orders by month.
    const groupedOrdersByMonth = sortedOrders.reduce((groups, order) => {
      const dateCreated = new Date(order.date_created);
      const monthYear = `${dateCreated.getFullYear()}-${(
        dateCreated.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}`;

      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }

      groups[monthYear].push(order);
      return groups;
    }, {});

    // Now, within each month, group the orders by order_id.
    const groupedOrdersByMonthAndOrderId = Object.keys(
      groupedOrdersByMonth
    ).reduce((result, month) => {
      const orders = groupedOrdersByMonth[month];
      const groupedOrders = orders.reduce((groups, order) => {
        if (!groups[order.order_id]) {
          groups[order.order_id] = [];
        }
        groups[order.order_id].push(order);
        return groups;
      }, {});
      result[month] = groupedOrders;
      return result;
    }, {});

    return groupedOrdersByMonthAndOrderId; // Return the processed data
  };

  // Add an event listener to refetch addresses when the screen is focused
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchOrders();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <NotificationBell />
      <ScrollView>
        {isFetching ? (
          <LoadingOverlay message="Fetching products." />
        ) : (
          <View>
            <HeaderText>Order History</HeaderText>

            <View>
              {ordersGrouped ? (
                Object.keys(ordersGrouped).map((month, index) => (
                  <View key={month}>
                    <Text>Month {index + 1}</Text>
                    <Text>Num orders For {month}:</Text>
                    <Text>Total Amount For This Month:</Text>
                    <View>
                      {Object.keys(ordersGrouped[month]).map((orderId) => (
                        <View key={orderId}>
                          <Text>
                            Order {orderId} For {month}
                          </Text>
                          <Text>
                            Order Code:
                            {ordersGrouped[month][orderId][0].order_code}
                          </Text>
                          <Text>
                            Order Amount:
                            {ordersGrouped[month][orderId][0].order_amount}
                          </Text>
                          <View>
                            <Text>Details about order {orderId}</Text>
                          </View>
                        </View>
                      ))}
                    </View>
                  </View>
                ))
              ) : (
                <Text>Loading data...</Text>
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
