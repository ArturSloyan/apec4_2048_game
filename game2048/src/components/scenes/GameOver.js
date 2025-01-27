import Phaser from "phaser";

export class GameOver extends Phaser.Scene
{
    endScore;

    constructor ()
    {
        super({ key: 'gameover' });
        window.OVER = this;
    }
    
    init (data)
    {
        this.endScore = data.score;
    }

    create ()
    {
        this.add.text(200, 250, 'Game Over', { font: '20px Courier', fill: '#ffffff' });
        this.add.text(200, 275, `Score: ${this.endScore}`, { font: '20px Courier', fill: '#ffffff' });
        this.add.text(200, 300, 'Click to restart', { font: '20px Courier', fill: '#ffffff' });

        this.input.once('pointerup', function (event)
        {
            this.scene.start('gamegrid');
        }, this);
    }
}