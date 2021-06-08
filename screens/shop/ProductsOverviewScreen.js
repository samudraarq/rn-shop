import React from "react";
import { StyleSheet, FlatList, Text } from "react-native";
import { useSelector } from "react-redux";

const ProductsOverviewScreen = () => {
  const products = useSelector((state) => state.products.availableProducts);

  return (
    <FlatList
      data={products}
      renderItem={(itemData) => <Text>{itemData.item.title}</Text>}
    />
  );
};

export default ProductsOverviewScreen;

const styles = StyleSheet.create({});
