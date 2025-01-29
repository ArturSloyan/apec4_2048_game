import GameComponent from "../components/GameComponent";
import LeaderboardComponent from "../components/LeaderboardComponent";
import '../styles/HelloComponent.css'; // Import the new CSS file for Home component

const Home = () => {
  return (
    <div className="home-container">
      <GameComponent />
      <LeaderboardComponent />
    </div>
  );
};

export default Home;
