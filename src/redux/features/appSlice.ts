import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Season } from "../../types";
import { fetchSeason } from "../../sheet";
import { SEASON_NAMES } from "../../constants";

interface AppState {
  seasonIndex: number;
  seasonPromise: Promise<Season>;
}

const initialState: AppState = {
  seasonIndex: 0,
  seasonPromise: fetchSeason(SEASON_NAMES[0]),
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSeasonIndex: (state, action: PayloadAction<number>) => {
      const newSeasonIndex = action.payload;
      state.seasonIndex = newSeasonIndex;
      state.seasonPromise = fetchSeason(SEASON_NAMES[newSeasonIndex]);
    },
  },
});

export const { setSeasonIndex } = appSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default appSlice.reducer;
