import React, { useMemo } from "react";
import CustomScreen from "../../../components/CustomScreen";
import usePaymentRequests from "../hooks/usePaymentRequests";
import RequestBox from "../components/RequestBox";
import { useAppSelector } from "../../../store/hooks";
import { FlatList } from "react-native";

const HomeScreen = () => {
  const requests = usePaymentRequests();
  const handledRequests = useAppSelector(
    (state) => state.proxy.handledRequestIds
  );
  const filteredRequests = useMemo(() => {
    return requests.filter((req) => !handledRequests.includes(req.id));
  }, [requests, handledRequests]);

  return (
    <CustomScreen>
      <FlatList
        contentContainerStyle={{ gap: 8 }}
        data={filteredRequests}
        renderItem={({ item }) => <RequestBox request={item} />}
      />
    </CustomScreen>
  );
};

export default HomeScreen;
