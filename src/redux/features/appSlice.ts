import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  seasonIndex?: number;
  weekIndex?: number;
}

const initialState: AppState = {};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSeasonIndex: (state, action: PayloadAction<number>) => {
      state.seasonIndex = action.payload;
      delete state.weekIndex;
    },
    setWeekIndex: (state, action: PayloadAction<number>) => {
      state.weekIndex = action.payload;
    },
  },
});

export const { setSeasonIndex, setWeekIndex } = appSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default appSlice.reducer;
