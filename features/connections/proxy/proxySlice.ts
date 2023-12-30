import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store/store";

export type Proxy = {
  proxyPk: string;
  name: string;
  proxySk: string;
  secret: string;
  connectionString: string;
  relay: string;
  sourceId: string;
};

interface SourceState {
  proxies: {
    [proxyPk: string]: Proxy;
  };
  proxyIds: string[];
  handledRequestIds: string[];
}

const initialState: SourceState = {
  proxies: {},
  proxyIds: [],
  handledRequestIds: [],
};

export const proxySlice = createSlice({
  name: "proxy",
  initialState,
  reducers: {
    addProxy: (state, action: PayloadAction<Proxy>) => {
      console.log(action.payload);
      const proxyPk = action.payload.proxyPk;
      if (!state.proxies[proxyPk] && !state.proxyIds.includes(proxyPk)) {
        state.proxies[proxyPk] = action.payload;
        state.proxyIds.push(proxyPk);
      }
    },
    handleRequest: (state, action: PayloadAction<string>) => {
      if (!state.handledRequestIds.includes(action.payload)) {
        state.handledRequestIds.push(action.payload);
      }
    },
  },
});

export const { addProxy, handleRequest } = proxySlice.actions;

export const selectProxies = (state: RootState) => state.proxy.proxies;
export const selectProxyIds = (state: RootState) => state.proxy.proxyIds;

export default proxySlice.reducer;
