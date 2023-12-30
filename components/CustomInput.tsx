import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import useColorTheme from "../styles/hooks/useColorTheme";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 12,
    borderRadius: 6,
    fontSize: 18,
  },
});

type CustomInputProps = {
  onChangeText: (text: string) => void;
  onSubmit?: () => void;
  value?: string;
  disabled?: boolean;
};

const CustomInput = ({
  onChangeText,
  onSubmit,
  value,
  disabled,
}: CustomInputProps) => {
  const colors = useColorTheme();
  return (
    <TextInput
      style={[styles.container, { backgroundColor: colors.inputBackground }]}
      onSubmitEditing={onSubmit}
      onChangeText={onChangeText}
      value={value}
      editable={!disabled}
    />
  );
};

export default CustomInput;
