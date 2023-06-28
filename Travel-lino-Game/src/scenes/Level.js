
// You can write more code here
var x;
var y;
var count = 0;
var currentTime;
var shape;
var increase = 8.28;
/* START OF COMPILED CODE */

class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// background
		const background = this.add.tileSprite(11300, 540, 11300, 1080, "background");
		background.setOrigin(1, 0.5);

		// off
		const off = this.add.image(1814, 110, "off");

		// platforms
		const platforms = this.add.container(0, 0);

		// plane_2
		const plane_2 = this.add.image(4140, 702, "plane3");
		platforms.add(plane_2);

		// plane_1
		const plane_1 = this.add.image(3446, 702, "plane2");
		platforms.add(plane_1);

		// plane
		const plane = this.add.image(2820, 702, "plane1");
		platforms.add(plane);

		// plane3
		const plane3 = this.add.image(2076, 702, "plane3");
		platforms.add(plane3);

		// plane2
		const plane2 = this.add.image(1519, 702, "plane2");
		platforms.add(plane2);

		// plane1
		const plane1 = this.add.image(877, 702, "plane1");
		platforms.add(plane1);

		// rectanglejj
		const rectanglejj = this.add.rectangle(0, 702, 800, 128);
		rectanglejj.scaleX = 0.5;
		rectanglejj.scaleY = 0.5;
		rectanglejj.setOrigin(0, 0.5);
		rectanglejj.isFilled = true;
		platforms.add(rectanglejj);

		// heart1
		const heart1 = this.add.image(120, 116, "1");

		// heart2
		const heart2 = this.add.image(264, 116, "1");

		// indicator
		const indicator = this.add.image(659.2412050135631, 54.91693318140718, "back");
		indicator.setOrigin(0.1082538661630915, -0.024221707192939756);

		// fill
		const fill = this.add.image(695.6677205512482, 71.66772663843842, "fill");
		fill.setOrigin(-0.016765125300545542, -0.23145186873253543);

		// text
		const text = this.add.text(1263, 58, "", {});
		text.setStyle({ "align": "center", "fontFamily": "DS-DIGIB", "fontSize": "70px", "fontStyle": "bold" });

		this.background = background;
		this.off = off;
		this.platforms = platforms;
		this.heart1 = heart1;
		this.heart2 = heart2;
		this.indicator = indicator;
		this.fill = fill;
		this.text = text;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.TileSprite} */
	background;
	/** @type {Phaser.GameObjects.Image} */
	off;
	/** @type {Phaser.GameObjects.Container} */
	platforms;
	/** @type {Phaser.GameObjects.Image} */
	heart1;
	/** @type {Phaser.GameObjects.Image} */
	heart2;
	/** @type {Phaser.GameObjects.Image} */
	indicator;
	/** @type {Phaser.GameObjects.Image} */
	fill;
	/** @type {Phaser.GameObjects.Text} */
	text;

	/* START-USER-CODE */

	// Write more your code here

	create() {

		this.editorCreate();
		this.playSound();
		this.timer = 1;
		this.player = this.physics.add.sprite(100,300,"Character").setScale(0.2,0.2);
		this.player.body.setSize(350,60);
		this.player.body.setOffset(250,688);
		this.player.setGravityY(600);

		this.platformGroup = this.add.group();
		this.platforms.getAll().forEach((ground)=>{
			if(ground.type == "Image"){
				if(ground.texture.key == "plane1"){
					ground = this.physics.add.existing(ground,true);
					ground.body.setSize(526, 80);
					ground.body.setOffset(0, 90);
				}else if(ground.texture.key == "plane2"){
					ground = this.physics.add.existing(ground,true);
					ground.body.setSize(294, 80);
					ground.body.setOffset(0, 36);
				}else if(ground.texture.key == "plane3"){
					ground = this.physics.add.existing(ground,true);
					ground.body.setSize(450, 80);
					ground.body.setOffset(90, 85);
				}
			} else{
				ground = this.physics.add.existing(ground,true);
			}
			this.platformGroup.add(ground);
		})

		this.input.on("pointerdown",this.jump,this);

		this.physics.add.collider(this.player, this.platformGroup, ()=>{
			x = this.player.x;
			y = this.player.y;
			this.player.anims.play("Run", true);
			this.player.setVelocityY(0);
		});

		shape = this.make.graphics();
		shape.fillRect(695.6,71.6,0,36);
		shape.fillPath();
		const mask = shape.createGeometryMask();
		this.fill.setMask(mask);

		currentTime = setInterval(()=>{
			this.text.setText(this.timer);
			this.timer++;
			shape.fillRect(704,80,0+increase,36);
			increase += 8.28;
		},1000);

	}

	jump(){
		this.player.anims.stop("Run");
		if(this.player.body.touching.down){
			this.player.anims.play("Jump", false);
			this.player.setVelocityY(-600);
			let sound1 =  this.sound.add("jumpsound");
			sound1.play();
		}
	}


	update(){

		if(this.timer == 61){
			clearInterval(currentTime);
			let sound2 =  this.sound.add("yaysound");
			sound2.play();
			this.scene.start("End");
			this.scene.stop("Level");
		}

		if(this.player.y > this.game.scale.height){

			this.timer = this.text.text;

			let sound3 =  this.sound.add("diesound");
			sound3.play();

			this.player = this.physics.add.sprite(x,y-200,"Character").setScale(0.2,0.2);
			count++;
			this.heart1.setTexture("2");

			this.player.body.setSize(350,60);
			this.player.body.setOffset(250,688);
			this.player.setGravityY(600);
			this.physics.add.collider(this.player, this.platformGroup, ()=>{
				this.player.anims.play("Run", true);
				this.player.setVelocityY(0);
			})


		}


		if(count == 2){
			this.heart2.setTexture("2");
			clearInterval(currentTime);
			this.scene.start("End");
			this.scene.stop("Level");
		}

		this.background.tilePositionX += 3;

		this.platforms.getAll().forEach((ground)=>{
			if(ground.x <= -200 && ground.type!= "Rectangle"){
				ground.x += 4100;
				ground.body.x += 4100;
			}
			ground.x -= 3;
			ground.body.x -= 3;
		})
	}

	playSound(){
		this.soundCount = 0;
		this.off.setInteractive().on("pointerdown",()=>{
			this.soundCount++;
			if(this.soundCount == 1){
				if(flag){
					sound.pause();
				}
			}else if(this.soundCount == 2){
				if(flag){
					sound.resume();
				}
				this.soundCount = 0;
			}
		})
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
