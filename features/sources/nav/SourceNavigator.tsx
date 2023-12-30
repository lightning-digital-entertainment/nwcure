import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddSourceScreen from "../views/AddSourceScreen";
import SourcesOverview from "../views/SourcesOverview";
import SourceDetailScreen from "../views/SourceDetailScreen";
import SourceInvoiceScreen from "../views/SourceInvoiceScreen";
import { Source } from "../sourceSlice";

export type SourceStackParams = {
  "Source-Overview": undefined;
  "Source-Add": { connectionString?: string };
  "Source-Details": { source: Source };
  "Source-Invoice": { source?: Source; invoice?: string };
};

const Stack = createNativeStackNavigator<SourceStackParams>();

const SourceNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Source-Overview"
        component={SourcesOverview}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Source-Add" component={AddSourceScreen} />
      <Stack.Screen name="Source-Details" component={SourceDetailScreen} />
      <Stack.Screen name="Source-Invoice" component={SourceInvoiceScreen} />
    </Stack.Navigator>
  );
};

export default SourceNavigator;
