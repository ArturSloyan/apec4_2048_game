import { useEffect } from "react";
import Phaser from "phaser";

// creates game
// config -> is currently created in Home.js in pages Folder
const Game = ({ config }) => {
  useEffect(() => {
    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, []);

  return(
     <div id="phaser-container"></div>
  )
};

export default Game;
