import React from "react";
import ReactDOM from "react-dom/client";
import {ApiProvider} from "@reduxjs/toolkit/query/react";
import {apiSlice} from "./features/api/apiSlice";
import App from "./App";
import "./index.css";

// ? 7.0 Here, using a simple to-do list as an example, we'll explore what an “RTK Query” is and how to use it. We will also use the “fontawesome” library here to integrate FontAwesome icon fonts and build the UI for our mini-app. And we'll start to integrating «RTK Query» into this mini-app by adding an "api" directory inside  the "features" directory. And will create an api slice there.
// (Go to [src/features/api/apiSlice.js])
ReactDOM.createRoot(document.getElementById("root"))
  .render(
    <React.StrictMode>
      {/* 7.2.1 Then in index.js (some might do that in App.js), just like with the «React Context Provider», we need to provide our new slice to the app. And we'll wrap the App with that provider. And we'll pass in the "api" attribute of it our apiSlice that we've created. */}
      {/* (Go to [src/features/todos/TodoList.js]) */}
      <ApiProvider api={apiSlice}>
        <App/>
      </ApiProvider>
    </React.StrictMode>,
  );