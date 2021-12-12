import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useSelector } from "react-redux";
import OrderItem from "../../components/shop/OrderItem";

const OrdersScreen = () => {
  const orders = useSelector((state) => state.orders.orders);
  return (
    <FlatList
      data={orders}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
        />
      )}
    />
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({});
