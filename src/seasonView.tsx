import DataTable, { TableColumn } from "react-data-table-component";
import { RatedPlayer, Season } from "./types";
import { Header } from "./header";
import { useAppSelector } from "./redux/store";
import { PLAYER_ROW_BACKGROUND_COLOR, RATING_TEXT_COLOR } from "./colors";

interface Props {
  season: Season;
}

export const SeasonView = ({ season }: Props) => {
  const { allWeekResults } = season;

  const weekIndex = useAppSelector((state) =>
    state.app.weekIndex === undefined
      ? allWeekResults.length - 1
      : state.app.weekIndex
  );

  const currWeekResults = allWeekResults[weekIndex];

  const data = currWeekResults.ratedPlayers;

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
        "-webkit-text-stroke-color": "black",
        "-webkit-text-stroke-width": "2px",
        paintOrder: "stroke fill",
        filter: "drop-shadow(2px 2px 0 rgb(0, 0, 0, 0.5))",
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
        color: RATING_TEXT_COLOR,
        "-webkit-text-stroke-color": "black",
        "-webkit-text-stroke-width": "2px",
        paintOrder: "stroke fill",
        filter: "drop-shadow(2px 2px 0 rgb(0, 0, 0, 0.5))",
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
      <div
        style={{
          marginTop: "20px",
        }}
      >
        <DataTable
          key={weekIndex}
          theme="dark"
          columns={columns}
          data={data}
          dense={true}
          conditionalRowStyles={[
            {
              when: () => true,
              style: () => {
                return {
                  animationDelay: `${Math.floor(Math.random() * 250)}ms`,
                  backgroundColor: PLAYER_ROW_BACKGROUND_COLOR,
                };
              },
            },
          ]}
        />
      </div>
      <Header season={season} weekIndex={weekIndex} />
    </>
  );
};
