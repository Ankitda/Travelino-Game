
// You can write more code here
var sound;
var flag = false;
/* START OF COMPILED CODE */

class GameEntry extends Phaser.Scene {

	constructor() {
		super("GameEntry");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// def_bg
		this.add.image(960, 540, "def_bg");

		// on
		const on = this.add.image(1814, 110, "on");

		// logo
		this.add.image(960, 540, "logo");

		// start_game
		const start_game = this.add.image(960, 863, "start-game");

		this.on = on;
		this.start_game = start_game;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	on;
	/** @type {Phaser.GameObjects.Image} */
	start_game;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
		this.on.setInteractive().on("pointerdown",()=>{
			flag = true;
			sound = this.sound.add("ingamesound");
			sound.loop = true;
			sound.play();
		})
		this.start_game.setInteractive().on("pointerdown",()=>{
			this.scene.start("Level");
			this.scene.stop("GameEntry");
		})
		// console.log(flag);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
