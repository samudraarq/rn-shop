import React from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

import productsReducer from "./store/reducers/products";
import ShopNavigator from "./navigation/ShopNavigator";

const rootReducer = combineReducers({
  products: productsReducer,
});

const store = createStore(rootReducer);

export default function App() {
  const [loaded] = useFonts({
    OpenSans: require("./assets/fonts/OpenSans-Regular.ttf"),
    OpenSansBold: require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!loaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}
