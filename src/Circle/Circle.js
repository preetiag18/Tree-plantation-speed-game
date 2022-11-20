import React from "react";
import "./Circle.css";
const Circle = (props) => {
  return (
    <div
      className={`circles ${props.active ? "active" : ""}`}
      style={{ pointerEvents: props.gameStatus ? "all" : "none" }}
      onClick={props.gameStatus ? props.click : undefined}
    >
      <p>{props.id}</p>
    </div>
  );
};

export default Circle;
