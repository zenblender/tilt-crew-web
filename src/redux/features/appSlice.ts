import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  seasonIndex: number;
}

const initialState: AppState = {
  seasonIndex: 0,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSeasonIndex: (state, action: PayloadAction<number>) => {
      const newSeasonIndex = action.payload;
      state.seasonIndex = newSeasonIndex;
    },
  },
});

export const { setSeasonIndex } = appSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default appSlice.reducer;
