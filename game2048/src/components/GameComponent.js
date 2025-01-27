import { useEffect } from "react";
import Phaser from "phaser";
import { Grid } from "./scenes/Grid";
import "./GameComponent.css";
import BusEvent from "./BusEvent";

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
    scene: Grid,
  };

  useEffect(() => {
    const game = new Phaser.Game(config);

    // handle event
    const handlePhaserEvent = (data) => {
      console.log('Event received from Phaser:', data);
      // React to the event, e.g., update state or trigger an animation
      alert(`Phaser Event: Pointer at (${data.x}, ${data.y})`);
    };

    // catch the event
    BusEvent.on('gameEnd', handlePhaserEvent);

    return () => {
      game.destroy(true);
      BusEvent.off('gameEnd', handlePhaserEvent);
    };
  }, []);

  // TODO: not called or tested
  async function saveScore(score, username){ 
    try {
      console.log("save score started");

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
        console.log('did not work')
      }
    } catch (error) {
      console.log('help')
    }
  }

  function onStartClick(e){
    // TODO: do i need this??
  }

  return (
    // div for game is needed
    <div>
      <div id="game-container"></div>
      <button onClick={onStartClick}>New Game</button>
    </div>
  );
}
