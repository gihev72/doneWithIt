import { StyleSheet, Text, View, StatusBar, Platform } from "react-native";
import React from "react";
import AppText from "./AppText";
import colors from "../config/colors";
import { useNetInfo } from "@react-native-community/netinfo";

const OfflineNotice = () => {
  const netInfo = useNetInfo();
  if (netInfo.type !== "unknown" && netInfo.isInternetReachable === false)
    return (
      <View style={styles.conatiner}>
        <AppText style={styles.text}>No Internet Connection</AppText>
      </View>
    );
  return null;
};

export default OfflineNotice;

const styles = StyleSheet.create({
  conatiner: {
    backgroundColor: colors.primary,
    height: 50,
    position: "absolute",
    zIndex: 1,
    width: "100%",
    top: StatusBar.currentHeight,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: colors.white,
  },
});
