import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProxyView from "../views/ProxyView";
import AddProxyView from "../views/AddProxyView";
import SelectSourceScreen from "../views/SelectSourceScreen";
import ProxyDetailScreen from "../views/ProxyDetailScreen";
import { Source } from "../../../sources/sourceSlice";

export type ProxyStackParams = {
  "Proxy-Overview": undefined;
  "Proxy-Add": { selectedSource?: Source };
  "Proxy-SelectSource": undefined;
  "Proxy-Detail": { proxyPk: string };
};

const Stack = createNativeStackNavigator<ProxyStackParams>();

const ProxyNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Proxy-Overview"
        component={ProxyView}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Proxy-Add" component={AddProxyView} />
      <Stack.Screen name="Proxy-SelectSource" component={SelectSourceScreen} />
      <Stack.Screen name="Proxy-Detail" component={ProxyDetailScreen} />
    </Stack.Navigator>
  );
};

export default ProxyNavigator;
