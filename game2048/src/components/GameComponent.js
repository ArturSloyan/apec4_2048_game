import { useEffect } from "react";
import Phaser from "phaser";
import { Grid } from "./scenes/Grid";
import { GameOver } from "./scenes/GameOver";
import BusEvent from "./BusEvent";
import "./GameComponent.css";

export default function GameComponent() {
  const config = {
    type: Phaser.AUTO,
    parent: "game-container",
    width: 600,
    height: 600,
    physics: {
      default: "arcade",
      arcade: {
        gravity: {
          x: 0,
          y: 0,
        },
        debug: false,
      },
    },
    // backgroundColor: "#a8dadc",
    scene: [ Grid, GameOver ]
  };

  useEffect(() => {
    const game = new Phaser.Game(config);
  
    // handle event
    const handleGameEndEvent = async (data) => {
      const username = localStorage.getItem('username');
      const userScore = data.score;

      if (username || !isEmptyOrSpaces(username)){
        //user logged in
        await saveScore(userScore, username);
      }
    };

    // catch the event
    BusEvent.on('gameEnd', handleGameEndEvent);

    return () => {
      game.destroy(true);
      BusEvent.off('gameEnd', handleGameEndEvent);
    };
  }, []);

  async function saveScore(score, username){ 
    try {
      const response =  await fetch("http://localhost:3001/score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ score, username }),
      });
  
      if (response.ok) {
        console.log('successfull')   
      } else {
        console.log('something went wrong')
      }
    } catch (error) {
      console.log("Error: " + error.message)
    }
  }

  return (
    // div for game is needed
    <div>
      <div id="game-container"></div>
    </div>
  );
}

function isEmptyOrSpaces(str){
  return str === null || str.match(/^ *$/) !== null;
}