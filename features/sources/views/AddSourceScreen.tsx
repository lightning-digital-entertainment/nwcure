import { View, Text } from "react-native";
import React, { useState } from "react";
import CustomScreen from "../../../components/CustomScreen";
import CustomInput from "../../../components/CustomInput";
import CustomKeyboardView from "../../../components/CustomKeyboardView";
import CustomButton from "../../../components/CustomButton";
import { useSourceManagement } from "../hooks/useSourceManagement";

const AddSourceScreen = ({ route }) => {
  const { connectionString: initialCS } = route.params || {};

  const [name, setName] = useState("");
  const [connectionString, setConnectionString] = useState(initialCS);
  const [error, setError] = useState("");
  const { addSourceFn } = useSourceManagement();

  const submitHandler = async () => {
    setError("");
    if (!name || !connectionString) {
      setError("Name & Connection String can not be empty");
      return;
    }
    try {
      addSourceFn(connectionString, name);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <CustomKeyboardView>
      <CustomScreen>
        <View
          style={{
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <View>
            <View>
              <Text>Name</Text>
              <CustomInput
                onChangeText={setName}
                onSubmit={() => {
                  console.log("Submitted");
                }}
              />
            </View>
            <View>
              <Text>Connection String</Text>
              <CustomInput
                onChangeText={setConnectionString}
                value={connectionString}
                onSubmit={() => {}}
              />
            </View>
            {error ? <Text>{error}</Text> : undefined}
          </View>
          <CustomButton text="Add source" onPress={submitHandler} />
        </View>
      </CustomScreen>
    </CustomKeyboardView>
  );
};

export default AddSourceScreen;
