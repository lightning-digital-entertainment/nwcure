import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddSourceScreen from "../views/AddSourceScreen";
import SourcesOverview from "../views/SourcesOverview";
import SourceDetailScreen from "../views/SourceDetailScreen";
import SourceInvoiceScreen from "../views/SourceInvoiceScreen";
import { Source } from "../sourceSlice";
import useColorTheme from "../../../styles/hooks/useColorTheme";

export type SourceStackParams = {
  "Source-Overview": undefined;
  "Source-Add": { connectionString?: string };
  "Source-Details": { source: Source };
  "Source-Invoice": { source?: Source; invoice?: string };
};

const Stack = createNativeStackNavigator<SourceStackParams>();

const SourceNavigator = () => {
  const colors = useColorTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.backgroundSecondary },
        headerTitleStyle: { color: colors.textPrimary },
        headerTintColor: colors.textSecondary,
      }}
    >
      <Stack.Screen
        name="Source-Overview"
        component={SourcesOverview}
        options={{ title: "Sources" }}
      />
      <Stack.Screen name="Source-Add" component={AddSourceScreen} />
      <Stack.Screen name="Source-Details" component={SourceDetailScreen} />
      <Stack.Screen name="Source-Invoice" component={SourceInvoiceScreen} />
    </Stack.Navigator>
  );
};

export default SourceNavigator;
