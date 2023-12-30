import { View, Text } from "react-native";
import React from "react";
import useColorTheme from "../styles/hooks/useColorTheme";

const CustomText = ({ children, weight }) => {
  const colors = useColorTheme();
  return (
    <Text
      style={[
        { color: colors.textPrimary },
        weight ? { fontWeight: weight } : undefined,
      ]}
    >
      {children}
    </Text>
  );
};

export default CustomText;
