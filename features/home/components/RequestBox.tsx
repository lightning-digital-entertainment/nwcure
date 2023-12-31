import { View, Text, StyleSheet } from "react-native";
import React, { useMemo } from "react";
import { background } from "../../../styles/colors";
import { Request } from "../hooks/usePaymentRequests";
import CustomButton from "../../../components/CustomButton";
import { requestPayment } from "../../../utils/nwc";
import { useAppSelector } from "../../../store/hooks";
import { selectSources } from "../../sources/sourceSlice";
import { useDispatch } from "react-redux";
import { handleRequest } from "../../connections/proxy/proxySlice";
import useColorTheme from "../../../styles/hooks/useColorTheme";
import CustomText from "../../../components/CustomText";
import { decodeInvoice } from "../../../utils/lightning";

const styles = StyleSheet.create({
  container: {
    padding: 6,
    borderRadius: 10,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
  },
});

type RequestProps = {
  request: Request;
};

const RequestBox = ({ request }: RequestProps) => {
  const colors = useColorTheme();
  const dispatch = useDispatch();
  const source = useAppSelector((state) => state.source.sources)[
    request.sourceId
  ];

  const invoiceData = useMemo(() => {
    if (request.params.invoice) {
      return decodeInvoice(request.params.invoice);
    }
  }, [request]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.backgroundSecondary },
      ]}
    >
      <CustomText>Request</CustomText>
      <CustomText>
        {request.method === "pay_invoice" ? "Pay Request" : request.method}
      </CustomText>
      {invoiceData ? (
        <CustomText>{invoiceData.amountInSats} SATS</CustomText>
      ) : undefined}
      <CustomText>{source ? source.name : ""}</CustomText>
      <View style={styles.buttonContainer}>
        <View style={{ flex: 1 }}>
          <CustomButton
            text="Pay"
            onPress={() => {
              try {
                requestPayment(
                  source.walletPubkey,
                  request.params.invoice,
                  source.secret,
                  source.relay
                );
                dispatch(handleRequest(request.id));
              } catch (e: unknown) {
                if (e instanceof Error) {
                  alert(e.message);
                }
              }
            }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <CustomButton
            text="Cancel"
            type="error"
            onPress={() => {
              dispatch(handleRequest(request.id));
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default RequestBox;
