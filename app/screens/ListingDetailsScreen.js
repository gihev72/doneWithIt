import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppText from "../components/AppText";
import colors from "../config/colors";
import ListItem from "../components/ListItem";
import Screen from "../components/Screen";

import { Image } from "react-native-expo-image-cache";

const ListingDetailsScreen = ({ route }) => {
  const listing = route.params;
  return (
    <Screen>
      <Image
        style={styles.image}
        resizeMode="cover"
        uri={listing.images[0].url}
        preview={{ uri: listing.images[0].thumnailUrl }}
        tint="light"
      />
      <View style={styles.detailsContainer}>
        <AppText style={styles.title}>{listing.title}</AppText>
        <AppText style={styles.price}>${listing.price}</AppText>
        <View style={styles.userContainer}>
          <ListItem
            image={require("../assets/mosh.jpg")}
            title="Mohsen Ahmadi"
            subTitle="5 Listings"
          />
        </View>
      </View>
    </Screen>
  );
};

export default ListingDetailsScreen;

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    color: colors.secondary,
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  userContainer: {
    marginVertical: 40,
  },
});
