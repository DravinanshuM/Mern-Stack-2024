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

// ant designing css link.
// import "antd/dist/antd.min.css";
import "antd/dist/antd.js";

// import tostified.
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <ToastContainer />
  </Provider>
);

reportWebVitals();
