import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProxyView from "../views/ProxyView";
import AddProxyView from "../views/AddProxyView";
import SelectSourceScreen from "../views/SelectSourceScreen";
import ProxyDetailScreen from "../views/ProxyDetailScreen";
import { Source } from "../../../sources/sourceSlice";
import useColorTheme from "../../../../styles/hooks/useColorTheme";

export type ProxyStackParams = {
  "Proxy-Overview": undefined;
  "Proxy-Add": { selectedSource?: Source };
  "Proxy-SelectSource": undefined;
  "Proxy-Detail": { proxyPk: string };
};

const Stack = createNativeStackNavigator<ProxyStackParams>();

const ProxyNavigator = () => {
  const colors = useColorTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.backgroundSecondary },
        headerTitleStyle: { color: colors.textPrimary },
        headerTintColor: colors.textSecondary,
      }}
    >
      <Stack.Screen name="Proxy-Overview" component={ProxyView} />
      <Stack.Screen name="Proxy-Add" component={AddProxyView} />
      <Stack.Screen name="Proxy-SelectSource" component={SelectSourceScreen} />
      <Stack.Screen name="Proxy-Detail" component={ProxyDetailScreen} />
    </Stack.Navigator>
  );
};

export default ProxyNavigator;
