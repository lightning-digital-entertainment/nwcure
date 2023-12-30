import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SourcesOverview from "../../sources/views/SourcesOverview";
import ProxyNavigator from "../proxy/nav/ProxyNavigator";
import ConnectionMenuView from "../views/ConnectionMenuView";
import SourceNavigator from "../../sources/nav/SourceNavigator";

const Stack = createNativeStackNavigator();

const ConnectionNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Connection-Menu" component={ConnectionMenuView} />
      <Stack.Screen name="Connection-Source" component={SourceNavigator} />
      <Stack.Screen name="Connection-Proxy" component={ProxyNavigator} />
    </Stack.Navigator>
  );
};

export default ConnectionNavigator;
