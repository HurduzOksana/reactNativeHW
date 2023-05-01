import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Provider } from "react-redux";
import "expo-dev-menu";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RegistrationScreen from "./Screens/RegistrationScreen/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import Home from "./Screens/Home/Home";

import { store } from "./redux/store";

import * as Font from "expo-font";

import { currentState } from "./redux/auth/authOperations";
import { getIsLoggedIn } from "./redux/auth/authSelectors";

const loadFonts = {
  "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
};

const MainStack = createStackNavigator();

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const App = () => {
  const [isReady, setIsReady] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn);

  useEffect(() => {
    async function loadFontsAsync() {
      await Font.loadAsync(loadFonts);
      setIsReady(true);
    }
    loadFontsAsync();
  }, []);

  useEffect(() => {
    dispatch(currentState());
  }, []);

  if (!isReady) {
    return null;
  }
  return (
    // <Provider store={store}>
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Login">
        {isLoggedIn ? (
          <MainStack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <MainStack.Screen
              name="Registration"
              component={RegistrationScreen}
            />
            <MainStack.Screen name="Login" component={LoginScreen} />
          </>
        )}
      </MainStack.Navigator>
    </NavigationContainer>
    // </Provider>
  );
};
