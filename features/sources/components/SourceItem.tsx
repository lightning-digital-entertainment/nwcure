import { View, Text, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useState } from "react";
import { blue } from "../../../styles/colors";
import useColorTheme from "../../../styles/hooks/useColorTheme";
import { useNavigation } from "@react-navigation/native";
import { useSourceManagement } from "../hooks/useSourceManagement";
import { Source } from "../sourceSlice";
import CustomText from "../../../components/CustomText";
import { getBalance } from "../../../utils/nwc";

type SourceItemProps = {
  source: Source;
};

const SourceItem = ({ source }: SourceItemProps) => {
  const [balance, setBalance] = useState<number>();

  const colors = useColorTheme();
  const navigation = useNavigation();
  const { deleteSourceFn, addSourceFn } = useSourceManagement();

  useEffect(() => {
    async function checkForBalance() {
      const res = (await getBalance(
        source.walletPubkey,
        source.secret,
        source.relay
      )) as string;
      const data = JSON.parse(res);
      setBalance(data.result.balance / 1000);
    }
    checkForBalance();
  }, []);
  return (
    <Pressable
      style={{
        padding: 12,
        backgroundColor: colors.backgroundTertiary,
        borderRadius: 6,
        gap: 2,
      }}
      onPress={() => {
        navigation.navigate("Source-Details", { id: source.id });
      }}
      onLongPress={() => {
        deleteSourceFn(source.id);
      }}
      key={source.id}
    >
      <CustomText weight={"600"}>{source.name}</CustomText>
      <CustomText>{source.walletPubkey}</CustomText>
      <CustomText>{balance ? `${balance} SATS` : "---"}</CustomText>
      <View>
        <Pressable
          style={{
            flexDirection: "row",
            gap: 2,
            padding: 4,
            borderRadius: 4,
            alignItems: "center",
            backgroundColor: blue[500],
            alignSelf: "flex-start",
          }}
          onPress={() => {
            navigation.navigate("Source-Invoice", { source: source });
          }}
        >
          <Ionicons name="flash" color="white" />
          <Text style={{ color: "white" }}>Invoice</Text>
        </Pressable>
      </View>
    </Pressable>
  );
};

export default SourceItem;
