import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { forwardRef } from "react";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 12,
    borderRadius: 6,
    backgroundColor: "white",
    fontSize: 18,
  },
});

type CustomInputProps = {
  onChangeText: (text: string) => void;
  onSubmit: () => void;
};

const CustomInput = forwardRef<React.LegacyRef<TextInput>, CustomInputProps>(
  ({ onChangeText, onSubmit }, ref) => {
    return (
      <TextInput
        ref={ref}
        style={styles.container}
        onSubmitEditing={onSubmit}
        onChangeText={onChangeText}
      />
    );
  }
);

export default CustomInput;
