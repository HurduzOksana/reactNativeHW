import React, { useState, useEffect } from "react";
import RegistrationScreen from "./Screens/RegistrationScreen/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";

import * as Font from "expo-font";

const loadFonts = {
  "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
};

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function loadFontsAsync() {
      await Font.loadAsync(loadFonts);
      setIsReady(true);
    }
    loadFontsAsync();
  }, []);
  if (!isReady) {
    return null;
  }
  return <RegistrationScreen />;
}
