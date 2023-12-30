import { View } from "react-native";
import React from "react";
import { useAppSelector } from "../../../../store/hooks";
import { selectSourceIds, selectSources } from "../../../sources/sourceSlice";
import CustomButton from "../../../../components/CustomButton";
import CustomScreen from "../../../../components/CustomScreen";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProxyStackParams } from "../nav/ProxyNavigator";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { TabNavigatorParams } from "../../../../nav/MainTabNavigator";

type SelectSourceScreenProps = CompositeScreenProps<
  NativeStackScreenProps<ProxyStackParams, "Proxy-SelectSource">,
  BottomTabScreenProps<TabNavigatorParams>
>;

const SelectSourceScreen = ({ navigation }: SelectSourceScreenProps) => {
  const sources = useAppSelector(selectSources);
  const sourceIds = useAppSelector(selectSourceIds);
  return (
    <CustomScreen>
      <View>
        {sourceIds.map((id) => {
          const source = sources[id];
          return (
            <CustomButton
              text={source.name}
              onPress={() => {
                navigation.navigate("Proxy-Add", {
                  selectedSource: source,
                });
              }}
            />
          );
        })}
      </View>
    </CustomScreen>
  );
};

export default SelectSourceScreen;
