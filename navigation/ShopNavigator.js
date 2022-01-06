import React from "react";
import { Platform, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import AuthScreen from "../screens/user/AuthScreen";
import StartupScreen from "../screens/StartupScreen";

import Colors from "../constants/Colors";
import HeaderButton from "../components/UI/HeaderButton";

import * as authActions from "../store/actions/auth";

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

const AdminNavigatorStack = createStackNavigator();

const AdminNavigator = () => {
  return (
    <AdminNavigatorStack.Navigator screenOptions={screenOptions}>
      <AdminNavigatorStack.Screen
        name="Admin"
        component={UserProductsScreen}
        options={({ navigation }) => ({
          title: "Your Product",
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
                title="Add"
                iconName={
                  Platform.OS === "android" ? "md-create" : "ios-create"
                }
                onPress={() => {
                  navigation.navigate("EditProduct");
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
      <AdminNavigatorStack.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={({ route }) => ({
          title: route.params?.productId ? "Edit Product" : "Add Product",
        })}
      />
    </AdminNavigatorStack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const ShopNavigator = () => {
  const dispatch = useDispatch();

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContentOptions={{ activeTintColor: Colors.primary }}
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <Button
              title="Logout"
              color={Colors.primary}
              onPress={() => {
                dispatch(authActions.logout());
              }}
            />
          </DrawerContentScrollView>
        );
      }}
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
      <Drawer.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={23}
              color={color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const AuthNavigatorStack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthNavigatorStack.Navigator screenOptions={screenOptions}>
      <AuthNavigatorStack.Screen name="Auth" component={AuthScreen} />
    </AuthNavigatorStack.Navigator>
  );
};

const MainNavigator = () => {
  const token = useSelector((state) => !!state.auth.token);
  const isLoading = useSelector((state) => state.auth.isLoading);

  if (isLoading) {
    return <StartupScreen />;
  }

  return (
    <NavigationContainer>
      {token ? <ShopNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default MainNavigator;
