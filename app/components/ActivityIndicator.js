import React from "react";
import LottieView from "lottie-react-native";

const ActivityIndicator = ({ visible = false }) => {
  if (!visible) return null;
  return (
    <LottieView source={require("../assets/loading.json")} autoPlay loop />
  );
};

export default ActivityIndicator;
