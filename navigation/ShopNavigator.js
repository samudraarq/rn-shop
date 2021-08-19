import React from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import Colors from "../constants/Colors";
import HeaderButton from "../components/UI/HeaderButton";

const ProductsNavigatorStack = createStackNavigator();

const ProductsNavigator = () => {
  return (
    <NavigationContainer>
      <ProductsNavigatorStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Platform.OS === "android" ? Colors.primary : "",
          },
          headerTitleStyle: {
            fontFamily: "OpenSansBold",
          },
          headerBackTitleStyle: {
            fontFamily: "OpenSans",
          },
          headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
        }}
      >
        <ProductsNavigatorStack.Screen
          name="ProductsOverview"
          component={ProductsOverviewScreen}
          options={({ navigation }) => ({
            headerTitle: "All Products",
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="Cart"
                  iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                  onPress={() => {
                    navigation.navigate("Cart");
                  }}
                />
              </HeaderButtons>
            ),
          })}
        />
        <ProductsNavigatorStack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={({ route }) => ({
            title: route.params.productTitle,
          })}
        />
        <ProductsNavigatorStack.Screen
          name="Cart"
          component={CartScreen}
          options={({ route }) => ({
            title: "Cart",
          })}
        />
      </ProductsNavigatorStack.Navigator>
    </NavigationContainer>
  );
};

const ShopNavigator = () => {
  return <ProductsNavigator />;
};

export default ShopNavigator;
