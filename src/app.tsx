import "./App.css";
import { SeasonView } from "./seasonView";
import { useAppSelector } from "./redux/store";
import { useQuery } from "@tanstack/react-query";
import { fetchSeason } from "./sheet";
import { SEASON_NAMES } from "./constants";

function App() {
  const seasonIndex = useAppSelector((state) => state.app.seasonIndex);

  const seasonName = SEASON_NAMES[seasonIndex];

  const { isPending, error, data } = useQuery({
    queryKey: [seasonName],
    queryFn: () => fetchSeason(SEASON_NAMES[seasonIndex]),
  });

  if (isPending) {
    return "Loading...";
  }

  if (error) {
    return `❌ ${error}`;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <SeasonView season={data} />
    </div>
  );
}

export default App;
