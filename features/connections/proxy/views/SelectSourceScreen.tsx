import { View, Text } from "react-native";
import React from "react";
import { useAppSelector } from "../../../../store/hooks";
import { selectSourceIds, selectSources } from "../../../sources/sourceSlice";
import CustomButton from "../../../../components/CustomButton";
import CustomScreen from "../../../../components/CustomScreen";

const SelectSourceScreen = ({ navigation }) => {
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
