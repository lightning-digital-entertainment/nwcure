import { View, Text, StyleSheet } from "react-native";
import React, { ReactNode } from "react";
import { background } from "../styles/colors";
import useColorTheme from "../styles/hooks/useColorTheme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
});

type CustomScreenProps = {
  children: ReactNode;
};

const CustomScreen = ({ children }: CustomScreenProps) => {
  const colors = useColorTheme();
  return (
    <View
      style={[styles.container, { backgroundColor: colors.backgroundPrimary }]}
    >
      {children}
    </View>
  );
};

export default CustomScreen;
