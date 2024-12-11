import Phaser from "phaser";

export class Grid extends Phaser.Scene {
  rect;
  cursors;

  preload() {}

  create() {
    this.rect = this.add.rectangle(250, 255, 50, 50, 0xffffff);
    this.physics.add.existing(this.rect, false);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    this.rect.body.setVelocity(0);

    if (this.cursors.left.isDown) {
      // rectangle move left
      this.rect.body.setVelocityX(-300);
    } else if (this.cursors.right.isDown) {
      // rectangle move right
      this.rect.body.setVelocityX(300);
    }

    if (this.cursors.up.isDown) {
      // rectangle move up
      this.rect.body.setVelocityY(-300);
    } else if (this.cursors.down.isDown)
      // rectangle move down {
      this.rect.body.setVelocityY(300);
  }
}
