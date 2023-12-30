import { View, Text, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { blue } from "../styles/colors";
import useColorTheme from "../styles/hooks/useColorTheme";

const TabBarHeaderRight = () => {
  const navigation = useNavigation();
  const colors = useColorTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
      }}
    >
      <Ionicons
        name="qr-code"
        size={24}
        style={{ marginHorizontal: 24 }}
        color={colors.accentPrimary}
        onPress={() => {
          navigation.navigate("Tab-Camera");
        }}
      />
    </View>
  );
};

export default TabBarHeaderRight;
