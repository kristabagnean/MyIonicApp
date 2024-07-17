import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { getInitialContext } from "@ionic/portals";

const initialContext = getInitialContext<{ startingRoute: string }>()?.value;
const appCxt = initialContext ? initialContext : null;
console.log(appCxt);
const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App context={appCxt} />
  </React.StrictMode>
);
