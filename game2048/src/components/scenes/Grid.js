import Phaser from "phaser";

export class Grid extends Phaser.Scene {
  cursors;
  grid; // 2D-Array for game field
  blockSprites; // saves block-objects

preload() {
    this.load.image("2", "./assets/2.svg");
    this.load.image("4", "./assets/4.svg");
    this.load.image("8", "./assets/8.svg");
    this.load.image("16", "./assets/16.svg");
    this.load.image("32", "./assets/32.svg");
    this.load.image("64", "./assets/64.svg");
    this.load.image("128", "./assets/128.svg");
    this.load.image("256", "./assets/256.svg");
    this.load.image("512", "./assets/512.svg");
    this.load.image("1024", "./assets/1024.svg");
    this.load.image("2048", "./assets/2048.svg");
    this.load.image("4096", "./assets/4096.svg");
    this.load.image("8192", "./assets/8192.svg");
}

  create() {
    // initialize 4x4-Grid (null = empty, object = block-data)
    this.grid = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];

    this.blockSprites = [];

    // TESTING add starting blocks to grid
    this.addBlock(0, 0, "2", 2);
    this.addBlock(0, 3, "4", 4);
    this.addBlock(1, 0, "2", 2);
    this.addBlock(1, 1, "8", 8);
    this.addBlock(1, 2, "32", 32);
    this.addBlock(2, 0, "32", 32);

    // key inputs
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
      this.moveBlocks("right");
    }
    if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
      this.moveBlocks("left");
    }
    if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
      this.moveBlocks("up");
    }
    if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
      this.moveBlocks("down");
    }
  }

  addBlock(row, col, texture, value) {
    // add new block to grid
    const block = this.physics.add.image(100 + col * 100, 100 + row * 100, texture);
    block.setCollideWorldBounds(true);
    block.value = value; // save value of block

    this.grid[row][col] = block; // save block in grid
    this.blockSprites.push(block);
  }

  moveBlocks(direction) {
    const size = 4;

    if (direction === "right") {
      for (let row = 0; row < size; row++) {
        for (let col = size - 2; col >= 0; col--) { // move from right to left
          this.moveBlock(row, col, direction);
        }
      }
    } else if (direction === "left") {
      for (let row = 0; row < size; row++) {
        for (let col = 1; col < size; col++) { // move from left to right
          this.moveBlock(row, col, direction);
        }
      }
    } else if (direction === "up") {
      for (let col = 0; col < size; col++) {
        for (let row = 1; row < size; row++) { // move from top to bottom
          this.moveBlock(row, col, direction);
        }
      }
    } else if (direction === "down") {
      for (let col = 0; col < size; col++) {
        for (let row = size - 2; row >= 0; row--) { // move from bottom to top 
          this.moveBlock(row, col, direction);
        }
      }
    }
  }

  moveBlock(row, col, direction) {
    const block = this.grid[row][col];
    if (!block) return;

    let targetRow = row;
    let targetCol = col;

    if (direction === "right") {
      for (let nextCol = col + 1; nextCol < 4; nextCol++) {
        if (this.grid[row][nextCol] === null) {
          targetCol = nextCol; // found empty spot
        } else if (this.grid[row][nextCol].value === block.value) {
          targetCol = nextCol; // merge is available
          break;
        } else {
          break; // block reached, stop movement
        }
      }
    } else if (direction === "left") {
      for (let nextCol = col - 1; nextCol >= 0; nextCol--) {
        if (this.grid[row][nextCol] === null) {
          targetCol = nextCol;
        } else if (this.grid[row][nextCol].value === block.value) {
          targetCol = nextCol;
          break;
        } else {
          break;
        }
      }
    } else if (direction === "up") {
      for (let nextRow = row - 1; nextRow >= 0; nextRow--) {
        if (this.grid[nextRow][col] === null) {
          targetRow = nextRow;
        } else if (this.grid[nextRow][col].value === block.value) {
          targetRow = nextRow;
          break;
        } else {
          break;
        }
      }
    } else if (direction === "down") {
      for (let nextRow = row + 1; nextRow < 4; nextRow++) {
        if (this.grid[nextRow][col] === null) {
          targetRow = nextRow;
        } else if (this.grid[nextRow][col].value === block.value) {
          targetRow = nextRow;
          break;
        } else {
          break;
        }
      }
    }

    // merge or move
    if (targetRow !== row || targetCol !== col) {
      const targetBlock = this.grid[targetRow][targetCol];

      if (targetBlock && targetBlock.value === block.value) {
        // merge: target block and current block have same value
        this.mergeBlocks(block, targetBlock, targetRow, targetCol);
        this.grid[row][col] = null; // set old position as free
      } else {
        // move: target position ist empty
        this.grid[row][col] = null; // set old position free
        this.grid[targetRow][targetCol] = block; // occupy new position

        // tween (animation) for move
        this.tweens.add({
          targets: block,
          x: 100 + targetCol * 100,
          y: 100 + targetRow * 100,
          duration: 200,
        });
      }
    }
  }
  
  mergeBlocks(block, targetBlock, row, col) {
  // destroy target block and increase value
  this.tweens.add({
    targets: block,
    x: 100 + col * 100,
    y: 100 + row * 100,
    duration: 200,
    onComplete: () => {
      // double value of target block
      targetBlock.value *= 2;

      // update texture (number on block) dynamically based on the value
      const textureName = targetBlock.value.toString();
      targetBlock.setTexture(textureName);

      // destroy merging block
      block.destroy();

      // animation for target block
      this.tweens.add({
        targets: targetBlock,
        scale: 1.2,
        duration: 100,
        yoyo: true,
      });
    },
  });
}
}
