import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

export type Source = {
  id: string;
  name: string;
  connectionString: string;
  walletPubkey: string;
  secret: string;
  relay: string;
  lud16?: string;
};

interface SourceState {
  sources: {
    [id: string]: Source;
  };
  sourceIds: string[];
}

const initialState: SourceState = {
  sources: {},
  sourceIds: [],
};

export const sourceSlice = createSlice({
  name: "source",
  initialState,
  reducers: {
    addSource: (state, action: PayloadAction<Source>) => {
      if (!state.sourceIds.includes(action.payload.id)) {
        state.sourceIds.push(action.payload.id);
        state.sources[action.payload.id] = action.payload;
      }
    },
    deleteSource: (state, action: PayloadAction<string>) => {
      delete state.sources[action.payload];
      state.sourceIds = state.sourceIds.filter((id) => id !== action.payload);
    },
  },
});

export const { addSource, deleteSource } = sourceSlice.actions;

export const selectSources = (state: RootState) => state.source.sources;
export const selectSourceIds = (state: RootState) => state.source.sourceIds;

export default sourceSlice.reducer;
