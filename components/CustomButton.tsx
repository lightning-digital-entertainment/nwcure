import {
  Text,
  StyleSheet,
  GestureResponderEvent,
  Pressable,
} from "react-native";
import React from "react";
import useColorTheme from "../styles/hooks/useColorTheme";
import { background } from "../styles/colors";
import CustomText from "./CustomText";

const stylesPrimary = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 6,
    fontSize: 18,
    alignItems: "center",
  },
  text: {
    color: "white",
    fontWeight: "600",
  },
  pressed: {
    backgroundColor: "#60a5fa",
  },
});
const stylesSecondary = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    fontSize: 18,
    alignItems: "center",
  },
  text: {
    color: "black",
    fontWeight: "600",
  },
  pressed: {
    backgroundColor: "#f1f5f9",
  },
});
const stylesError = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 6,
    backgroundColor: "#ef4444",
    fontSize: 18,
    alignItems: "center",
  },
  text: {
    color: "white",
    fontWeight: "600",
  },
  pressed: {
    backgroundColor: "#f87171",
  },
});

type CustomButtonProps = {
  onPress: (e: GestureResponderEvent) => void;
  text: string;
  type?: "primary" | "secondary" | "error";
};

const CustomButton = ({ onPress, text, type }: CustomButtonProps) => {
  const colors = useColorTheme();
  if (type === "error") {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          stylesError.container,
          pressed ? stylesError.pressed : undefined,
        ]}
      >
        <Text style={stylesError.text}>{text}</Text>
      </Pressable>
    );
  }
  if (type === "secondary") {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          stylesSecondary.container,
          pressed ? stylesSecondary.pressed : undefined,
          {
            backgroundColor: colors.backgroundSecondary,
            borderColor: colors.accentPrimary,
          },
        ]}
      >
        <CustomText>{text}</CustomText>
      </Pressable>
    );
  }
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        stylesPrimary.container,
        pressed ? stylesPrimary.pressed : undefined,
        { backgroundColor: colors.accentPrimary },
      ]}
    >
      <Text style={{ color: colors.buttonTextPrimary, fontWeight: "600" }}>
        {text}
      </Text>
    </Pressable>
  );
};

export default CustomButton;
