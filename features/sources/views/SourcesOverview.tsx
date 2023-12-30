import { Text, Button, View, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import CustomScreen from "../../../components/CustomScreen";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectSourceIds, selectSources } from "../sourceSlice";
import CustomButton from "../../../components/CustomButton";
import { useSourceManagement } from "../hooks/useSourceManagement";
import { background, blue } from "../../../styles/colors";
import useColorTheme from "../../../styles/hooks/useColorTheme";
import CustomText from "../../../components/CustomText";
import SourceItem from "../components/SourceItem";

const SourcesOverview = ({ navigation }) => {
  const colors = useColorTheme();
  const sources = useAppSelector(selectSources);
  const sourceIds = useAppSelector(selectSourceIds);
  const { deleteSourceFn } = useSourceManagement();
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
