import { use } from "react";
import "./App.css";
import { SeasonView } from "./seasonView";
import { useAppSelector } from "./redux/store";

function App() {
  const seasonPromise = useAppSelector((state) => state.app.seasonPromise);

  const season = use(seasonPromise);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <SeasonView season={season} />
    </div>
  );
}

export default App;
