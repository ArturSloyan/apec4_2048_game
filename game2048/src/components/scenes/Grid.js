import Phaser from "phaser";

export class Grid extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.image("grid", "assets/grid.svg");
    this.load.image("two", "assets/2.svg");
    // this.load.image("four", "assets/4.svg");
  }

  create() {

    // background
    this.image = this.add.image(250, 250, "grid");   

    // blocks???
    // for (var y = 1; y < 5; y++) {
    //   for (var x = 1; x < 5; x++) {
        
    //     this.image = this.add.image(x * 100, y * 100, "two");
    //   }
    // }

    this.image = this.add.image(60, 60, "two");
    this.image = this.add.image(190, 60, "two");
  }
}
