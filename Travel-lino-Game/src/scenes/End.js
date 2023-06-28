
// You can write more code here

/* START OF COMPILED CODE */

class End extends Phaser.Scene {

	constructor() {
		super("End");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// def_bg
		this.add.image(960, 540, "def_bg");

		// result
		const result = this.add.text(778, 486, "", {});
		result.text = "New text";
		result.setStyle({ "align": "center", "fontFamily": "RankedSports", "fontSize": "100px", "fontStyle": "bold" });

		this.result = result;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Text} */
	result;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();

		if(count == 2){
			this.result.setText("You Loose");
			if(flag){
				sound.stop();
			}
		}else{
			this.result.setText("You Win");
			if(flag){
				sound.stop();
			}
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
