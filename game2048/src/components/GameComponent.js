import { useEffect } from "react";
import Phaser from "phaser";
// import { Example } from "./scenes/Example";
import { Grid } from "./scenes/Grid";

export default function GameComponent() {
  const config = {
    type: Phaser.AUTO,
    parent: "game-container",
    width: 800,
    height: 600,
    physics: {
      default: "matter",
      arcade: {
        gravity: { y: 0 , x:0},
        debug: true,
      },
    },
    scene: Grid,
  };

  useEffect(() => {
    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div id="game-container"></div>;
}
