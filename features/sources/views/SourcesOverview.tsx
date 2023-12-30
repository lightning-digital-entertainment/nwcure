import { View } from "react-native";
import React from "react";
import CustomScreen from "../../../components/CustomScreen";
import { useAppSelector } from "../../../store/hooks";
import { selectSourceIds, selectSources } from "../sourceSlice";
import CustomButton from "../../../components/CustomButton";
import SourceItem from "../components/SourceItem";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SourceStackParams } from "../nav/SourceNavigator";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { TabNavigatorParams } from "../../../nav/MainTabNavigator";

type SourcesOverviewProps = CompositeScreenProps<
  NativeStackScreenProps<SourceStackParams, "Source-Overview">,
  BottomTabScreenProps<TabNavigatorParams>
>;

const SourcesOverview = ({ navigation }: SourcesOverviewProps) => {
  const sources = useAppSelector(selectSources);
  const sourceIds = useAppSelector(selectSourceIds);
  return (
    <CustomScreen>
      <View style={{ gap: 4 }}>
        {sourceIds.map((sourceId) => {
          const source = sources[sourceId];
          return <SourceItem source={source} />;
        })}
      </View>
      <CustomButton
        text="Add New Source"
        onPress={() => {
          navigation.navigate("Source-Add");
        }}
      />
    </CustomScreen>
  );
};

export default SourcesOverview;
