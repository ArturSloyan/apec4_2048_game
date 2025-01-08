import Phaser from "phaser";

export class Grid extends Phaser.Scene {
  cursors;
  imageOne;

  preload() {
    this.load.image("two", "./assets/2.svg");
  }

  create() {
    this.imageOne = this.physics.add.image(50, 50, "two");
    this.imageOne.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {

    if (this.cursors.left.isDown) {
      // rectangle move left
      this.imageOne.setVelocityX(-100);
    } else if (this.cursors.right.isDown) {
      // rectangle move right
      this.imageOne.setVelocityX(100);
    } else if (this.cursors.up.isDown) {
      // rectangle move up
      this.imageOne.setVelocityY(-100);
    } else if (this.cursors.down.isDown) {
      // rectangle move down {
      this.imageOne.setVelocityY(100);
    } else {
      this.imageOne.setVelocityY(0);
      this.imageOne.setVelocityX(0);
    }
  }
}
