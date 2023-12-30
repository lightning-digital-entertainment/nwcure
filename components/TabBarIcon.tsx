import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const TabBarIcon = ({ route, focused, color, size }) => {
  let iconName;

  if (route.name === "Tab-Home") {
    iconName = focused ? "home-sharp" : "home-outline";
  } else if (route.name === "Tab-Source") {
    iconName = focused ? "wallet" : "wallet-outline";
  } else if (route.name === "Tab-Proxy") {
    iconName = focused ? "flash" : "flash-outline";
  }
  return <Ionicons name={iconName} size={size} color={color} />;
};

export default TabBarIcon;
