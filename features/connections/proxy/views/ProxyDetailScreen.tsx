import { Text, View } from "react-native";
import React, { useState } from "react";
import QRCode from "react-native-qrcode-svg";
import { useAppSelector } from "../../../../store/hooks";
import CustomScreen from "../../../../components/CustomScreen";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProxyStackParams } from "../nav/ProxyNavigator";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { TabNavigatorParams } from "../../../../nav/MainTabNavigator";

type ProxyDetailScreenProps = CompositeScreenProps<
  NativeStackScreenProps<ProxyStackParams, "Proxy-Detail">,
  BottomTabScreenProps<TabNavigatorParams>
>;

const ProxyDetailScreen = ({ route }: ProxyDetailScreenProps) => {
  const { proxyPk } = route.params || {};

  const [qrWidth, setQrWidth] = useState<number>();

  const proxy = useAppSelector((state) => state.proxy.proxies)[proxyPk];

  return (
    <CustomScreen>
      <Text>{proxy.name}</Text>
      <Text selectable>{proxy.connectionString}</Text>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
        onLayout={(e) => {
          setQrWidth(e.nativeEvent.layout.width);
        }}
      >
        {qrWidth ? (
          <QRCode value={proxy.connectionString} size={qrWidth * 0.98} />
        ) : undefined}
      </View>
    </CustomScreen>
  );
};

export default ProxyDetailScreen;
