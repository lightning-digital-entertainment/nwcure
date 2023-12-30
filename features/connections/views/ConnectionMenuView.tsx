import { View, Text } from "react-native";
import React from "react";
import CustomScreen from "../../../components/CustomScreen";
import CustomButton from "../../../components/CustomButton";

const ConnectionMenuView = ({ navigation }) => {
  return (
    <CustomScreen>
      <CustomButton
        onPress={() => {
          navigation.navigate("Connection-Source");
        }}
        text="Sources"
      />
      <CustomButton
        text="Proxies"
        onPress={() => {
          navigation.navigate("Connection-Proxy");
        }}
      />
    </CustomScreen>
  );
};

export default ConnectionMenuView;
