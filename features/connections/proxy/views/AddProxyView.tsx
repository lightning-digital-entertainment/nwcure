import { View, Text } from "react-native";
import React from "react";
import CustomButton from "../../../../components/CustomButton";
import CustomScreen from "../../../../components/CustomScreen";
import CustomInput from "../../../../components/CustomInput";
import { Source } from "../../../sources/sourceSlice";
import useProxyManagement from "../hooks/useProxyManagement";

const AddProxyView = ({ navigation, route }) => {
  const { selectedSource }: { selectedSource: Source } = route.params || {};
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
