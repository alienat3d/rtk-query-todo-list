import React from "react";
import ReactDOM from "react-dom/client";
import {ApiProvider} from "@reduxjs/toolkit/query/react";
import {apiSlice} from "./features/api/apiSlice";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root"))
  .render(
    <React.StrictMode>
      <ApiProvider api={apiSlice}>
        <App/>
      </ApiProvider>
    </React.StrictMode>,
  );