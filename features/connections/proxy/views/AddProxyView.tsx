import { View, Text } from "react-native";
import React from "react";
import CustomButton from "../../../../components/CustomButton";
import CustomScreen from "../../../../components/CustomScreen";
import CustomInput from "../../../../components/CustomInput";
import useProxyManagement from "../hooks/useProxyManagement";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProxyStackParams } from "../nav/ProxyNavigator";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { TabNavigatorParams } from "../../../../nav/MainTabNavigator";

type AddProxyViewProps = CompositeScreenProps<
  NativeStackScreenProps<ProxyStackParams, "Proxy-Add">,
  BottomTabScreenProps<TabNavigatorParams>
>;

const AddProxyView = ({ navigation, route }: AddProxyViewProps) => {
  const { selectedSource } = route.params || {};
  const { addProxyFn } = useProxyManagement();
  async function submitHandler() {
    if (!selectedSource) {
      throw new Error("No source selected!");
    }
    const proxy = await addProxyFn("test", selectedSource);
    console.log(proxy);
  }
  return (
    <CustomScreen>
      <View style={{ justifyContent: "space-between", flex: 1 }}>
        <View>
          <Text>Name</Text>
          <CustomInput onChangeText={() => {}} />
          <Text>Source</Text>
          <CustomButton
            text={selectedSource ? selectedSource.name : "Pick Source"}
            onPress={() => {
              navigation.navigate("Proxy-SelectSource");
            }}
          />
        </View>
        <CustomButton text="Create Proxy" onPress={submitHandler} />
      </View>
    </CustomScreen>
  );
};

export default AddProxyView;
