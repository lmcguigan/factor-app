import React from "react";
import "./Row.css";

export const Row = ({ clName, children }) => (
  <div className={`row${clName ? " " + clName : ""}`}>
    {children}
  </div>
);
