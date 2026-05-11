import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// ? 7.0 Here, using a simple to-do list as an example, we'll explore what an “RTK Query” is and how to use it. We will also use the “fontawesome” library here to integrate FontAwesome icon fonts and build the UI for our mini-app. And we'll start to integrating «RTK Query» into this mini-app by adding an "api" directory inside  the "features" directory. And will create an api slice there.
// (Go to [src/features/api/apiSlice.js])

ReactDOM.createRoot(document.getElementById("root"))
  .render(
    <React.StrictMode>
      <App/>
    </React.StrictMode>,
  );