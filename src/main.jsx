import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Back4App / Parse SDK import
import Parse from "parse";

// Initialize Back4App (Parse) credentials
Parse.initialize(
  "SlimfTCbDWxGGFfP3GVBbZFQLYB2jFGK7zAsNam6", // Application ID
  "R2Wck7rxKoJ2MorzJHV9cFDa7jCgCaPsazVSis8K"  // JS Key
);
Parse.serverURL = "https://parseapi.back4app.com";

// Mount React App
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
