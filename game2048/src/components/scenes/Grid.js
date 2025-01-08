import Phaser from "phaser";

export class Grid extends Phaser.Scene {
  cursors;
  imageOne;
  imageTwo;

  preload() {
    this.load.image("two", "./assets/2.svg");
  }

  create() {
    this.imageOne = this.physics.add.image(0, 0, "two");
    this.imageOne.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {

    // get coordinates and use belov to move

    if (this.cursors.left.isDown) {
      // rectangle move left
      this.physics.moveTo(this.imageOne, 0, 0);
    } else if (this.cursors.right.isDown) {
      // rectangle move right
      this.physics.moveTo(this.imageOne, 400, 0);
    } else if (this.cursors.up.isDown) {
      // rectangle move up
      this.physics.moveTo(this.imageOne, 0, 100);
    } else if (this.cursors.down.isDown) {
      // rectangle move down {
      this.physics.moveTo(this.imageOne, 0, 100);
    }
  }
}
