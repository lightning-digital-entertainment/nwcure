import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import CustomScreen from "../../../components/CustomScreen";
import CustomInput from "../../../components/CustomInput";
import { Source, selectSources } from "../sourceSlice";
import CustomButton from "../../../components/CustomButton";
import { useAppSelector } from "../../../store/hooks";
import { requestPayment } from "../../../utils/nwc";
import CustomText from "../../../components/CustomText";

const SourceInvoiceScreen = ({ route }) => {
  const { invoice, source } = route.params || {};

  const [invoiceInput, setInvoiceInput] = useState<string>(invoice);
  const [selectedSource, setSelectedSource] = useState<Source>(source);
  const [error, setError] = useState("");

  const sources = useAppSelector(selectSources);

  useEffect(() => {
    if (invoice) {
      setInvoiceInput(invoice);
    }
    if (source) {
      setSelectedSource(source);
    }
  }, [invoice, source]);

  async function submitHandler() {
    try {
      requestPayment(
        selectedSource.walletPubkey,
        invoiceInput,
        selectedSource.secret,
        selectedSource.relay
      );
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  }

  return (
    <CustomScreen>
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View>
          <CustomText>Invoice</CustomText>
          <CustomInput value={invoiceInput} onChangeText={setInvoiceInput} />
          <View>
            <CustomText>Select Source</CustomText>
            {Object.keys(sources).map((sourceId, i) => {
              const source = sources[sourceId];
              if (selectedSource && sourceId === selectedSource.id) {
                return (
                  <CustomButton
                    text={source.name}
                    type="primary"
                    onPress={() => {}}
                  />
                );
              }
              return (
                <CustomButton
                  text={source.name}
                  type="secondary"
                  onPress={() => {
                    setSelectedSource(source);
                  }}
                />
              );
            })}
          </View>
        </View>
        <CustomButton text="Request Payment" onPress={submitHandler} />
      </View>
    </CustomScreen>
  );
};

export default SourceInvoiceScreen;
