import React from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import Colors from "../constants/Colors";

const ProductsNavigatorStack = createStackNavigator();

const ProductsNavigator = () => {
  return (
    <NavigationContainer>
      <ProductsNavigatorStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Platform.OS === "android" ? Colors.primary : "",
          },
          headerTintColor: Platform.OS === "android" ? white : Colors.primary,
        }}
      >
        <ProductsNavigatorStack.Screen
          name="ProductsOverview"
          component={ProductsOverviewScreen}
          options={{
            headerTitle: "All Products",
          }}
        />
      </ProductsNavigatorStack.Navigator>
    </NavigationContainer>
  );
};

const ShopNavigator = () => {
  return <ProductsNavigator />;
};

export default ShopNavigator;