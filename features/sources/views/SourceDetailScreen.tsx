import { Text, View } from "react-native";
import React, { useState } from "react";
import QRCode from "react-native-qrcode-svg";
import CustomScreen from "../../../components/CustomScreen";
import { CompositeScreenProps } from "@react-navigation/native";
import { TabNavigatorParams } from "../../../nav/MainTabNavigator";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SourceStackParams } from "../nav/SourceNavigator";

type SourceDetailScreenProps = CompositeScreenProps<
  NativeStackScreenProps<SourceStackParams, "Source-Details">,
  BottomTabScreenProps<TabNavigatorParams>
>;

const SourceDetailScreen = ({ route }: SourceDetailScreenProps) => {
  const { source } = route.params;

  const [qrWidth, setQrWidth] = useState<number>();

  return (
    <CustomScreen>
      <Text>{source.name}</Text>
      <Text>{source.relay}</Text>
      <Text>{source.secret}</Text>
      <Text>{source.walletPubkey}</Text>
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
          <QRCode value={source.connectionString} size={qrWidth * 0.98} />
        ) : undefined}
      </View>
    </CustomScreen>
  );
};

export default SourceDetailScreen;
