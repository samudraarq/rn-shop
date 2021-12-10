import React from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import Colors from "../constants/Colors";
import HeaderButton from "../components/UI/HeaderButton";

const screenOptions = {
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
};

const ProductsNavigatorStack = createStackNavigator();

const ProductsNavigator = () => {
  return (
    <ProductsNavigatorStack.Navigator screenOptions={screenOptions}>
      <ProductsNavigatorStack.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={({ navigation }) => ({
          headerTitle: "All Products",
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
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
          title: "Your Cart",
        })}
      />
    </ProductsNavigatorStack.Navigator>
  );
};

const OrdersNavigatorStack = createStackNavigator();

const OrdersNavigator = () => {
  return (
    <OrdersNavigatorStack.Navigator screenOptions={screenOptions}>
      <OrdersNavigatorStack.Screen
        name="Orders"
        component={OrdersScreen}
        options={({ navigation }) => ({
          title: "Your Orders",
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
    </OrdersNavigatorStack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const ShopNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContentOptions={{ activeTintColor: Colors.primary }}
      >
        <Drawer.Screen
          name="Home"
          component={ProductsNavigator}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons
                name={Platform.OS === "android" ? "md-list" : "ios-list"}
                size={23}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Orders"
          component={OrdersNavigator}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons
                name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                size={23}
                color={color}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default ShopNavigator;
