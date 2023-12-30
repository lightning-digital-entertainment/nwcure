import { Text, View } from "react-native";
import React, { useState } from "react";
import QRCode from "react-native-qrcode-svg";
import { useAppSelector } from "../../../../store/hooks";
import CustomScreen from "../../../../components/CustomScreen";

const ProxyDetailScreen = ({ route }) => {
  const proxyPk = route.params.proxyPk;

  const [qrWidth, setQrWidth] = useState<number>();

  const proxy = useAppSelector((state) => state.proxy.proxies)[proxyPk];

  console.log(proxyPk);
  console.log(proxy);
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
