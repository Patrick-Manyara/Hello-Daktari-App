import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text,
  Pressable,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { AuthContext } from "../../store/auth-context";
import { Path } from "../../constants/path";
import {
  formatMonthToMonthName,
  getOrdinalDateAndTime,
} from "../../util/dateFormat";

import NotificationBell from "../../components/ui/NotificationBell";
import HeaderText from "../../components/ui/HeaderText";
import NormalText from "../../components/ui/NormalText";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import OrderDetailsModal from "../../components/Modals/OrderDetailsModal";

import { globalStyles } from "../../constants/globalcss";
import { Colors } from "../../constants/styles";

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
    const baseUrl = Path.API_URL + "profile.php";
    const queryParams = `action=orders&user_id=${token.user_id}`;
    const url = `${baseUrl}?${queryParams}`;
    try {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setIsFetching(false);
          let arr = data.orders;
          if (Array.isArray(arr)) {
            setOrders(data.orders);
            const groupedData = processOrders(data.orders); // Process the data
            setGroupedOrdersByMonthAndOrderId(groupedData); // Set the processed datac
            // console.log(groupedData);
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

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedOrderData, setSelectedOrderData] = useState([]);

  const openOrderDetailsModal = (orderData) => {
    setSelectedOrderData(orderData);
    setModalVisible(true);
  };

  const closeOrderDetailsModal = () => {
    setModalVisible(false);
    setSelectedOrderData([]);
  };

  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <NotificationBell />
      <ScrollView>
        {isFetching ? (
          <LoadingOverlay message="Fetching products." />
        ) : (
          <View>
            <HeaderText>Order History</HeaderText>
            <NormalText>
              Click on the order icon to view more details about each order.
            </NormalText>
            <View>
              {ordersGrouped ? (
                Object.keys(ordersGrouped).map((month, index) => (
                  <View key={month} style={{ marginVertical: 10 }}>
                    <HeaderText
                      styleProp={styles.headerText}
                      fontProp="poppins-semibold"
                    >
                      {formatMonthToMonthName(month)}:
                    </HeaderText>
                    <View>
                      {Object.keys(ordersGrouped[month]).map((orderId) => (
                        <View key={orderId} style={styles.card}>
                          <View>
                            <NormalText
                              styleProp={styles.codeText}
                              fontProp="poppins-semibold"
                            >
                              Order Code:
                              {ordersGrouped[month][orderId][0].order_code}
                            </NormalText>
                            <NormalText>
                              {getOrdinalDateAndTime(
                                ordersGrouped[month][orderId][0].date_created
                              )}
                            </NormalText>

                            <NormalText fontProp="poppins-semibold">
                              Ksh.
                              {ordersGrouped[month][orderId][0].order_amount}
                            </NormalText>
                          </View>

                          <View key={ordersGrouped[month][orderId][0].id}>
                            <Pressable
                              android_ripple={{ color: "#ccc" }}
                              style={({ pressed }) => [
                                globalStyles.button,
                                styles.orderBtn,
                                pressed ? globalStyles.buttonPressed : null,
                              ]}
                              onPress={() =>
                                openOrderDetailsModal(
                                  ordersGrouped[month][orderId]
                                )
                              }
                            >
                              <Image
                                source={require("../../assets/images/cargo.png")}
                                style={styles.orderImg}
                              />
                            </Pressable>
                          </View>

                          <OrderDetailsModal
                            isVisible={isModalVisible}
                            onClose={closeOrderDetailsModal}
                            orderData={selectedOrderData}
                          />
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

const styles = StyleSheet.create({
  card: {
    width: "96%",
    backgroundColor: Colors.lightGrey,
    margin: 5,
    borderRadius: 5,
    elevation: 1,
    padding: 5,
    // IOS
    shadowColor: "black",
    shadowOpacity: 0.125,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    backgroundColor: "white",
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    //LAYOUT
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    color: "black",
    fontSize: 16,
  },
  codeText: {
    fontSize: 12,
    color: Colors.mainBlue,
  },
  orderBtn: {
    width: 50,
    height: 50,
    backgroundColor: Colors.lightGrey,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  orderImg: {
    width: 30,
    height: 30,
    objectFit: "contain",
  },
});
