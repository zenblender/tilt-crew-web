import DataTable, { TableColumn } from "react-data-table-component";
import { RatedPlayer, Season } from "./types";
import { useState } from "react";
import { range } from "./utils";

interface Props {
  season: Season;
}

export const SeasonView = ({ season }: Props) => {
  const { seasonName, allWeekResults } = season;

  const [weekIndex, setWeekIndex] = useState(allWeekResults.length - 1);

  const currWeekResults = allWeekResults[weekIndex];

  const data = currWeekResults.ratedPlayers;

  // Colors from https://colorkit.co/palette/ff595e-ff924c-ffca3a-c5ca30-8ac926-52a675-1982c4-4267ac-6a4c93/
  const columns: TableColumn<RatedPlayer>[] = [
    {
      name: "#",
      selector: (player) =>
        data.findIndex((currPlayer) => player.name === currPlayer.name) + 1,
      sortable: true,
      width: "50px",
      right: true,
      style: {
        color: "#999",
        fontWeight: 700,
        fontSize: "80%",
      },
    },
    {
      name: "Player",
      selector: (player) => player.name,
      sortable: true,
      grow: 2,
      style: {
        fontWeight: 900,
      },
    },
    {
      name: "Rating",
      selector: (player) => player.rating,
      sortable: true,
      width: "80px",
      sortFunction: (left, right) => right.rating - left.rating,
      right: true,
      style: {
        fontWeight: 700,
        color: "#1982c4",
      },
    },
    {
      name: (
        <>
          Change
          <br />
          (Week)
        </>
      ),
      selector: (player) => player.ratingChangeThisWeek,
      sortable: true,
      width: "80px",
      sortFunction: (left, right) =>
        right.ratingChangeThisWeek - left.ratingChangeThisWeek,
      right: true,
      style: {
        color: "#999",
        fontWeight: 700,
        fontSize: "80%",
      },
      conditionalCellStyles: [
        {
          when: (player) => player.ratingChangeThisWeek > 0,
          style: {
            color: "#8ac926",
          },
        },
        {
          when: (player) => player.ratingChangeThisWeek < 0,
          style: {
            color: "#ff595e",
          },
        },
      ],
    },
    {
      name: (
        <>
          Change
          <br />
          (Season)
        </>
      ),
      selector: (player) => player.ratingChangeThisSeason,
      sortable: true,
      width: "80px",
      sortFunction: (left, right) =>
        right.ratingChangeThisSeason - left.ratingChangeThisSeason,
      right: true,
      style: {
        color: "#999",
        fontWeight: 700,
        fontSize: "80%",
      },
      conditionalCellStyles: [
        {
          when: (player) => player.ratingChangeThisSeason > 0,
          style: {
            color: "#8ac926",
          },
        },
        {
          when: (player) => player.ratingChangeThisSeason < 0,
          style: {
            color: "#ff595e",
          },
        },
      ],
    },
  ];

  return (
    <>
      <div style={{ marginTop: "20px" }}>
        <DataTable
          key={weekIndex}
          theme="dark"
          columns={columns}
          data={data}
          dense={true}
        />
      </div>
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
          }}
        >
          Tilt Pong Crew &mdash; {seasonName}
        </div>
        <select
          onChange={(e) => {
            const newWeekIndex = Number(e.target.value);
            console.log({ newWeekIndex });
            setWeekIndex(newWeekIndex);
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
    </>
  );
};
