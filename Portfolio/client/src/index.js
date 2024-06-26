import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

// routing client-side.
import { RouterProvider } from "react-router-dom";
import router from "./router/index.js";

// React-Redux and React Toolkit bind with eachOther.
import { store } from "./app/store.js";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

reportWebVitals();
