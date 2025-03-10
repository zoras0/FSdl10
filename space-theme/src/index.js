import React from "react";
import ReactDOM from "react-dom";
import "./index.css"; // Importing global CSS file
import App from "./App"; // Importing the main App component

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root") // Rendering the app in the "root" div
);
