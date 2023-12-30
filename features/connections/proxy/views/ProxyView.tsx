import { View, Text } from "react-native";
import React from "react";
import CustomScreen from "../../../../components/CustomScreen";
import CustomButton from "../../../../components/CustomButton";
import { useAppSelector } from "../../../../store/hooks";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProxyStackParams } from "../nav/ProxyNavigator";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { TabNavigatorParams } from "../../../../nav/MainTabNavigator";

type ProxyViewProps = CompositeScreenProps<
  NativeStackScreenProps<ProxyStackParams, "Proxy-Overview">,
  BottomTabScreenProps<TabNavigatorParams>
>;

const ProxyView = ({ navigation }: ProxyViewProps) => {
  const proxyIds = useAppSelector((state) => state.proxy.proxyIds);
  const proxies = useAppSelector((state) => state.proxy.proxies);
  console.log(proxyIds);
  return (
    <CustomScreen>
      <Text>ProxyView</Text>
      {proxyIds.map((id) => {
        const proxy = proxies[id];
        return (
          <Text
            onPress={() => {
              navigation.navigate("Proxy-Detail", { proxyPk: proxy.proxyPk });
            }}
          >
            {proxy.name}
          </Text>
        );
      })}
      <CustomButton
        text="Add Proxy"
        onPress={() => {
          navigation.navigate("Proxy-Add");
        }}
      />
    </CustomScreen>
  );
};

export default ProxyView;
