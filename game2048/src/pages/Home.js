import Phaser from "phaser";
import Game from "../components/GameComponent"
import { Example } from "../components/scenes/Example";

const Home = () => {
  const config = {
    type: Phaser.AUTO,
    parent: "phaser-container",
    width: 800,
    height: 600,
    scene: Example,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 200 },
      },
    },
  };

  return (
    <div>
      <Game config={config}/>
    </div>
  );
};

export default Home;
