import { useEffect, useState } from "react";
import { StyleSheet, Platform, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import AuthNavigator from "./app/navigation/AuthNavigator";
import navigationTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import OfflineNotice from "./app/components/OfflineNotice";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();
export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);
  const restoreUser = async () => {
    try {
      const user = await authStorage.getUser();
      if (user) setUser(user);
    } catch (error) {
      console.log(error);
    } finally {
      setIsReady(true);
    }
  };

  useEffect(() => {
    restoreUser();
  }, []);

  if (!isReady) {
    return null;
  } else {
    SplashScreen.hideAsync();
  }
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <OfflineNotice />

      <NavigationContainer theme={navigationTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  img: {
    width: 300,
    height: 300,
  },
});
