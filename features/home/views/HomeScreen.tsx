import { Text } from "react-native";
import React, { useMemo } from "react";
import CustomScreen from "../../../components/CustomScreen";
import usePaymentRequests from "../hooks/usePaymentRequests";
import RequestBox from "../components/RequestBox";
import { useAppSelector } from "../../../store/hooks";
import { handleRequest } from "../../connections/proxy/proxySlice";
import CustomButton from "../../../components/CustomButton";
import { getBalance } from "../../../utils/nwc";
import { selectSources } from "../../sources/sourceSlice";

const HomeScreen = () => {
  const requests = usePaymentRequests();
  const handledRequests = useAppSelector(
    (state) => state.proxy.handledRequestIds
  );
  const sources = useAppSelector(selectSources);
  const filteredRequests = useMemo(() => {
    return requests.filter((req) => !handledRequests.includes(req.id));
  }, [requests, handledRequests]);

  return (
    <CustomScreen>
      {filteredRequests.map((req) => (
        <RequestBox request={req} />
      ))}
      <CustomButton
        onPress={async () => {
          const source = sources[Object.keys(sources)[0]];
          const res = await getBalance(
            source.walletPubkey,
            source.secret,
            source.relay
          );
          console.log(res);
        }}
      />
    </CustomScreen>
  );
};

export default HomeScreen;
