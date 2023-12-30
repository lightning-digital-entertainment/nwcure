import { View, Text, TextStyle } from "react-native";
import React from "react";
import useColorTheme from "../styles/hooks/useColorTheme";

type CustomTextProps = {
  children: React.ReactNode;
  weight?: TextStyle["fontWeight"];
};

const CustomText = ({ children, weight }: CustomTextProps) => {
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
