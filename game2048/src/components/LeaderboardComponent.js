import React, { useState, useEffect } from "react";
import "../styles/LeaderboardComponent.css";
import "../styles/GamePage.css"

export default function LeaderboardComponent() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  async function fetchLeaderboard() {
    try {
      const response = await fetch("http://localhost:3001/leaderboard");
      console.log("Response:", response);
      if (response.ok) {
        const data = await response.json();
        console.log("Leaderboard Data:", data);  // Add this for debugging
        setLeaderboard(data);
      } else {
        console.error("Failed to fetch leaderboard.");
      }
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  }  

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      {leaderboard.length === 0 ? (  
        <p>Loading Leaderboard...</p>   // Debugging UI message
      ) : (
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th>Score</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{entry.username}</td>
                <td>{entry.score}</td>
                <td>{new Date(entry.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );  
}