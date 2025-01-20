import { useEffect } from "react";
import Phaser from "phaser";
import { Grid } from "./scenes/Grid";
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
        //    x: 0,
        //    y: 0,
        //    width: scene.sys.scale.width,
        //    height: scene.sys.scale.height,
        gravity: {
          x: 0,
          y: 0,
        },
        // checkCollision: {
        //   up: true,
        //   down: true,
        //   left: true,
        //   right: true,
        // },
        //    customUpdate: false,
        //    fixedStep: true,
        //    fps: 60,
        //    timeScale: 1,     // 2.0 = half speed, 0.5 = double speed
        //    customUpdate: false,
        //    overlapBias: 4,
        //    tileBias: 16,
        //    forceX: false,
        //    isPaused: false,
        // allowRotation: true,
        debug: false,
        // debugShowBody: true,
        // debugShowStaticBody: true,
        // debugShowVelocity: true,
        //    debugBodyColor: 0xff00ff,
        //    debugStaticBodyColor: 0x0000ff,
        //    debugVelocityColor: 0x00ff00,
        //    maxEntries: 16,
        //    useTree: true   // set false if amount of dynamic bodies > 5000
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
}
