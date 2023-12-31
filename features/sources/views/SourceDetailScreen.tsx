import { ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import QRCode from "react-native-qrcode-svg";
import CustomScreen from "../../../components/CustomScreen";
import { CompositeScreenProps } from "@react-navigation/native";
import { TabNavigatorParams } from "../../../nav/MainTabNavigator";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SourceStackParams } from "../nav/SourceNavigator";
import CustomText from "../../../components/CustomText";
import CustomButton from "../../../components/CustomButton";

type SourceDetailScreenProps = CompositeScreenProps<
  NativeStackScreenProps<SourceStackParams, "Source-Details">,
  BottomTabScreenProps<TabNavigatorParams>
>;

const SourceDetailScreen = ({ route }: SourceDetailScreenProps) => {
  const { source } = route.params;

  const [qrWidth, setQrWidth] = useState<number>();

  return (
    <CustomScreen>
      <ScrollView contentContainerStyle={{ gap: 8 }}>
        <CustomText>{source.name}</CustomText>
        <CustomText>{source.walletPubkey}</CustomText>
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
            <View
              style={{ padding: 8, backgroundColor: "white", borderRadius: 10 }}
            >
              <QRCode value={source.connectionString} size={qrWidth * 0.9} />
            </View>
          ) : undefined}
        </View>
        <CustomButton text="Copy URI" />
      </ScrollView>
    </CustomScreen>
  );
};

export default SourceDetailScreen;
