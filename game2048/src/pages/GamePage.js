import GameComponent from "../components/GameComponent";
import LeaderboardComponent from "../components/LeaderboardComponent";
import '../styles/GamePage.css';

const Home = () => {
  return (
    <div className="home-container">
      <GameComponent />
      <LeaderboardComponent />
    </div>
  );
};

export default Home;
