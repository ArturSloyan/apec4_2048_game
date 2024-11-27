import { React, useEffect } from "react";
import Phaser from "phaser";

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
