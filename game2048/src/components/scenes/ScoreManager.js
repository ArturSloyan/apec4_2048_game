export class ScoreManager {
  constructor(scene) {
    this.scene = scene;
    this.score = 0;

    // add text object to the scene to display the score
    this.scoreText = this.scene.add.text(10, 10, `Score: ${this.score}`, {
      fontSize: '24px',
      color: '#ffffff',
    });
    this.scoreText.setScrollFactor(0);
  }

  // add to the score
  addToScore(value) {
    this.score += value;
    this.updateScoreText();
  }

  // update the displayed score
  updateScoreText() {
    this.scoreText.setText(`Score: ${this.score}`);
  }

  // reset the score if needed
  resetScore() {
    this.score = 0;
    this.updateScoreText();
  }
}
