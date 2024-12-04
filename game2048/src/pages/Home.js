import Phaser from "phaser";
import Game from "../components/GameComponent"
import { Grid } from "../components/scenes/Grid";

const Home = () => {
  const config = {
    type: Phaser.AUTO,
    parent: "phaser-container",
    width: 500,
    height: 500,
    scene: Grid,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 200 },
      },
    },
  };

  return (
    <div style={{margin: 20}}>
      <Game config={config}/>
    </div>
  );
};

export default Home;
