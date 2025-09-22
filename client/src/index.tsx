import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import LoanOfferComparison from "./LoanOfferComparison";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <LoanOfferComparison />
  </React.StrictMode>
);
