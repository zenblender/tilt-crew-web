import { FC } from "react";
import { Season } from "./types";
import { range } from "./utils";
import { useAppDispatch } from "./redux/store";
import { setSeasonIndex, setWeekIndex } from "./redux/features/appSlice";
import { SEASON_NAMES } from "./constants";

interface Props {
  season: Season;
  weekIndex: number;
}

export const Header: FC<Props> = ({ season, weekIndex }) => {
  const dispatch = useAppDispatch();

  const { allWeekResults } = season;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        position: "fixed",
        top: 0,
        left: 0,
        alignItems: "center",
        justifyContent: "space-between",
        gap: "0 10px",
        backgroundColor: "rgba(0,0,0,0.7)",
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
        padding: "2px 5px",
      }}
    >
      <div
        style={{
          lineHeight: "100%",
          flexGrow: 1,
        }}
      >
        Tilt Crew
      </div>
      <select
        onChange={(e) => {
          const newSeasonIndex = Number(e.target.value);
          dispatch(setSeasonIndex(newSeasonIndex));
        }}
        value={season.seasonIndex}
      >
        {SEASON_NAMES.map((seasonName, i) => (
          <option key={i} value={i}>
            {seasonName}
          </option>
        ))}
      </select>
      <select
        onChange={(e) => {
          const newWeekIndex = Number(e.target.value);
          dispatch(setWeekIndex(newWeekIndex));
        }}
        value={weekIndex}
      >
        {range(allWeekResults.length).map((i) => (
          <option key={i} value={i}>
            Week {i + 1}
          </option>
        ))}
      </select>
    </div>
  );
};
