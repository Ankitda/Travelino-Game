
// You can write more code here

/* START OF COMPILED CODE */

class Preload extends Phaser.Scene {

	constructor() {
		super("Preload");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorPreload() {

		this.load.pack("asset-pack", "assets/asset-pack.json");
	}

	/** @returns {void} */
	editorCreate() {

		// progress
		const progress = this.add.text(960, 540, "", {});
		progress.setOrigin(0.5, 0.5);
		progress.text = "0%";
		progress.setStyle({ "align": "center", "fontFamily": "DS-DIGIB", "fontSize": "100px", "fontStyle": "bold" });

		// progress (components)
		new PreloadText(progress);

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	preload() {

		this.editorCreate();

		this.editorPreload();

		this.load.audio("ingamesound","assets/sound/backgroundMusic.mp3");
		this.load.audio("diesound","assets/sound/dieSound.mp3");
		this.load.audio("jumpsound","assets/sound/jumpSound.mp3");
		this.load.audio("yaysound","assets/sound/yaySound.mp3");
		this.load.on(Phaser.Loader.Events.COMPLETE, () => this.scene.start("GameEntry"));
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
