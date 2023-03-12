import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../config/colors";

const ListItemSeparator = () => {
  return <View style={styles.separator} />;
};

export default ListItemSeparator;

const styles = StyleSheet.create({
  separator: {
    width: "100%",
    backgroundColor: colors.light,
    height: 1,
  },
});
