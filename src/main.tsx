import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { TiltQueryClientProvider } from "./tiltQueryClientProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <TiltQueryClientProvider>
        <App />
      </TiltQueryClientProvider>
    </Provider>
  </React.StrictMode>
);
