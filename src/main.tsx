import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { TiltErrorBoundary } from "./tiltErrorBoundary";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <TiltErrorBoundary>
        <App />
      </TiltErrorBoundary>
    </Provider>
  </React.StrictMode>
);
