import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import SourcesOverview from "../features/sources/views/SourcesOverview";
import ConnectionNavigator from "../features/connections/nav/ConnectionNavigator";
import SourceNavigator from "../features/sources/nav/SourceNavigator";
import ProxyNavigator from "../features/connections/proxy/nav/ProxyNavigator";
import HomeScreen from "../features/home/views/HomeScreen";
import TabBarIcon from "../components/TabBarIcon";
import ScannerView from "../features/scanner/ScannerView";
import TabBarHeaderRight from "../components/TabBarHeaderRight";
import useColorTheme from "../styles/hooks/useColorTheme";

type TabNavigatorProps = {
  "Tab-Home": undefined;
  "Tab-Connections": undefined;
};

const Tab = createBottomTabNavigator<TabNavigatorProps>();

const MainTabNavigator = () => {
  const colors = useColorTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => (
          <TabBarIcon
            route={route}
            focused={focused}
            color={color}
            size={size}
          />
        ),
        tabBarStyle: {
          backgroundColor: colors.backgroundSecondary,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: colors.accentPrimary,
        headerRight: () => <TabBarHeaderRight />,
        headerStyle: {
          backgroundColor: colors.backgroundSecondary,
        },
        headerTitleStyle: { color: colors.textPrimary },
        headerShadowVisible: false,
      })}
    >
      <Tab.Screen
        name="Tab-Home"
        component={HomeScreen}
        options={{ title: "Requests" }}
      />
      <Tab.Screen
        name="Tab-Camera"
        component={ScannerView}
        options={{
          title: "Camera",
          unmountOnBlur: true,
          headerShown: false,
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="Tab-Proxy"
        component={ProxyNavigator}
        options={{ title: "Proxies" }}
      />
      <Tab.Screen
        name="Tab-Source"
        component={SourceNavigator}
        options={{ title: "Sources" }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
