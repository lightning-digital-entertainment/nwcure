import { Text, View } from "react-native";
import React, { useState } from "react";
import QRCode from "react-native-qrcode-svg";
import CustomScreen from "../../../components/CustomScreen";
import { useAppSelector } from "../../../store/hooks";

const SourceDetailScreen = ({ route }) => {
  const id = route.params.id;

  const [qrWidth, setQrWidth] = useState<number>();

  const source = useAppSelector((state) => state.source.sources)[id];

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
