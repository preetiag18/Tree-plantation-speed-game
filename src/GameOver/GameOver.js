import React from "react";
import "./GameOver.css";

const GameOver = (props) => {
  return (
    <div className="overlay">
      <div className="gameover-box">
        <h2>Game Over</h2>
        <span>{props.message}</span>
        <p>You planted {props.score} trees</p>
        {props.score > 5 ? (
          <p>You planted good number of trees.</p>
        ) : (
          <p>Opps.. Let's plant more trees next time.</p>
        )}
        <button onClick={props.close}>X</button>
      </div>
    </div>
  );
};

export default GameOver;
