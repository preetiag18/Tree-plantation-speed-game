import React, { Component } from "react";
import "./App.css";
import Circle from "./Circle/Circle";
import GameOver from "./GameOver/GameOver";

import click from "./assets/sounds/click.wav";
import startSound from "./assets/sounds/gameStart.mp3";
import endSound from "./assets/sounds/gameOver.wav";
import { Heart } from "./Heart/Heart";
import { MuteOrUnMute } from "./MuteOrUnMute/MuteOrUnMute";

let clickSound = new Audio(click);
let gameStartSound = new Audio(startSound);
let gameEndSound = new Audio(endSound);

const RndNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

class App extends Component {
  state = {
    circles: [1, 2, 3, 4],
    score: 0,
    current: undefined,
    pace: 1000,
    gameOver: {
      isGameOver: false,
      message: "",
    },
    gameOn: false,
    soundMuted: false,
    totalLives: 3,
  };

  lives = 3;

  timer;

  clickCircleHandler = (i) => {
    clickSound.play();
    if (this.state.current !== i) {
      this.stopHandler("You planted tree on wrong place.");
      return;
    }
    this.setState({
      score: this.state.score + 1,
    });
    this.lives = this.lives + 1;
  };

  nextCircle = () => {
    if (this.state.totalLives !== this.lives) {
      this.setState({
        totalLives: this.lives,
      });
    }
    if (this.lives === 0) {
      this.stopHandler("You ran out of lives.");
      return;
    }

    let nextActive;

    do {
      nextActive = RndNumber(0, this.state.circles.length - 1);
    } while (nextActive === this.state.current);

    this.setState({
      current: nextActive,
      pace: this.state.pace * 0.95,
    });
    this.lives = this.lives - 1;
    this.timer = setTimeout(this.nextCircle, this.state.pace);
  };

  startHandler = () => {
    this.nextCircle();
    this.setState({
      gameOn: !this.state.gameOn,
    });
    gameStartSound.play();
  };

  stopHandler = (message) => {
    clearTimeout(this.timer);
    this.setState({
      gameOver: {
        isGameOver: true,
        message: message,
      },
    });
    console.log("game stoped");
    gameStartSound.pause();
    gameEndSound.play();
  };

  closeHandler = () => {
    window.location.reload();
    gameEndSound.pause();
  };

  onMuteOrUnMuteClick = () => {
    if (this.state.soundMuted) {
      clickSound.muted = false;
      gameStartSound.muted = false;
      gameEndSound.muted = false;
      this.setState({
        soundMuted: false,
      });
    } else {
      clickSound.muted = true;
      gameStartSound.muted = true;
      gameEndSound.muted = true;
      this.setState({
        soundMuted: true,
      });
    }
  };

  render() {
    return (
      <div className="container">
        <h1>Let's plant trees</h1>
        <div className="gameInfo">
          <Heart text={this.state.totalLives}></Heart>
          <MuteOrUnMute
            mute={this.state.soundMuted}
            onClick={this.onMuteOrUnMuteClick}
          ></MuteOrUnMute>
        </div>
        <span>Trees Planted: {this.state.score}</span>
        <div className="circle">
          {this.state.circles.map((circle, i) => (
            <Circle
              key={i}
              id={i + 1}
              gameStatus={this.state.gameOn}
              click={() => this.clickCircleHandler(i)}
              active={this.state.current === i}
            />
          ))}
        </div>
        {this.state.gameOver.isGameOver && (
          <GameOver
            close={this.closeHandler}
            score={this.state.score}
            message={this.state.gameOver.message}
          />
        )}

        <div className="buttons">
          {this.state.gameOn ? (
            <button
              className="btn"
              onClick={(e) => {
                this.stopHandler("");
              }}
            >
              End
            </button>
          ) : (
            <button className="btn" onClick={this.startHandler}>
              Start
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default App;
