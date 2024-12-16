import Phaser from "phaser";

export class Grid extends Phaser.Scene {
  imageOne;
  cursors;

  preload() {
    this.load.setBaseURL("../../");
    this.load.image("two", "assets/2.svg");
  }

  create() {
    this.imageOne = this.matter.add.image(700, 200, "two");

    this.matter.world.setBounds(0, 0, 800, 600);
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursors.left.isDown) {
      // rectangle move left
      this.imageOne.setVelocityX(-50);
    } else if (this.cursors.right.isDown) {
      // rectangle move right
      this.imageOne.setVelocityX(50);
    } else {
      this.imageOne.setVelocityX(0);
    }

    if (this.cursors.up.isDown) {
      // rectangle move up
      this.imageOne.setVelocityY(-50);
    } else if (this.cursors.down.isDown) {
      // rectangle move down {
      this.imageOne.setVelocityY(50);
    }
    else {
      this.imageOne.setVelocityY(0);
    }
  }
}
