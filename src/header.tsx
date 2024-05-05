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
        backgroundColor: "#58508d",
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
        padding: "2px 5px",
      }}
    >
      <div
        style={{
          fontWeight: 900,
          lineHeight: "100%",
          flexGrow: 1,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "8px",
          filter: "drop-shadow(3px 3px 0 rgb(0, 0, 0, 0.3))",
        }}
      >
        <img src="/pong.svg" width={20} height={20} />
        <span>TILT CREW</span>
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
