//basic setup
let config = {
    type :Phaser.AUTO, //it chooses the best option automatically between canvas and webgl
    
    scale : {
        mode :Phaser.Scale.FIT, // refer scaler class in documentation
        width : 800,
        height : 600,
    },

    backgroundColor: 0xffffc0,

    scene : {
        preload : preload,
        create : create,
        update : update
    },
    //adding physics to canvas/scene
    physics : {
        default :'arcade',
        arcade:{
            gravity :{
                y:1000,
            },
            debug :false,
        },
    },

}


let game = new Phaser.Game(config)

let player_config = {
    "speed" : 100,
    "jumpSpeed" : 650,
}


function preload() {
    //load images 
    this.load.image("ground" , "assets/topground.png")
    this.load.image("sky" , "assets/background.png")
    this.load.image("apple" , "assets/apple.png")
    //add sprite sheet : make sure the width and height of the image is multiples of 2
    //frameWidth and frameHeight is the width and height of each single image in the spritesheet
    this.load.spritesheet("dude","assets/dude.png", {frameWidth:32, frameHeight:48}) //open game art library for more sprite sheets
}


function create() {
    

    W = game.config.width;
    H = game.config.height;

    //tileSprite(x,y,w,h,image) : add sprites to the particular page
    let ground = this.add.tileSprite(0,H-128,W,128 ,"ground")
    //intailly phasersprites takes the point from the center of the image by default
    //now lets set them to starting points
    ground.setOrigin(0,0);

    let background = this.add.sprite(0,0,"sky")
    background.setOrigin(0,0)
    background.displayWidth = W;
    background.displayHeight = H; 
    background.depth = -1;

    //adding player : (x,y,image,defalut frame)
    //adding physics to the player
    this.player = this.physics.add.sprite(100,100,"dude",4)
    //helps to bounce 
    this.player.setBounce(0.5);
    
    //player animations 
    this.anims.create({
        key : 'left',
        frames : this.anims.generateFrameNumbers('dude', {start:0, end:3}),
        frameRate:10,
        repeat:-1,
    });

    this.anims.create({
        key : 'center',
        frames : this.anims.generateFrameNumbers('dude', {start:4, end:4}),
        frameRate:10,
    });


    this.anims.create({
        key : 'right',
        frames : this.anims.generateFrameNumbers('dude', {start:5, end:8}),
        frameRate:10,
        repeat:-1,
    });



    //keyboard and player movements
    this.cursors = this.input.keyboard.createCursorKeys();
    
    //adding physics to the existing one can be done using below
    //case 1: default physics objects are dynamic to make it static set valuue to true
    this.physics.add.existing(ground , true); 
    //case 2 :makes the ground static 
    //ground.body.allowGravity=false;
    //ground.body.immovable = true;
 
    //add group of apples = physical bodies 
    let fruits = this.physics.add.group({
        //image reference
        key : "apple",
        //how many apples 
        repeat:8,
        //max is 1 and min is 0  < 1 will decrease size , > 1 will increase size
        setScale :{x:0.2,y:0.2},
        //set x and y and stepX will increase x axis value by 100 for every next apple
        setXY : {x:10 , y :0 , stepX :100}
    })

    // bounce effecting to all the apples
    fruits.children.iterate(function(f){
        f.setBounce(Phaser.Math.FloatBetween(0.4 , 0.6));
    })


    //static Groups
    let platforms = this.physics.add.staticGroup();
    //groups can be made like above fruits and also like below using create method
    platforms.create(100, 170,"ground").setScale(2 ,0.4).refreshBody();
    platforms.create(630 ,200 , "ground").setScale(2,0.4).refreshBody();
    platforms.create(410 ,350 , "ground").setScale(2,0.4).refreshBody();
     //adding existing ground to the platforms
    platforms.add(ground);
    //2d collision for the player and ground
    this.physics.add.collider(fruits , platforms)
    this.physics.add.collider(this.player , platforms)
    //this.physics.add.collider(fruits , ground)
   
    
}  
//game loop
function update() {

    //right and left
    if(this.cursors.right.isDown){
        console.log(`>`);
        this.player.setVelocity(player_config.speed)
        this.player.anims.play('right',true)
    }
    else if(this.cursors.left.isDown){
        console.log(`<`)
        this.player.setVelocityX(-player_config.speed)
        this.player.anims.play('left',true)
    }
    else{
        this.player.setVelocityX(0)
        this.player.anims.play('center',true)
    }

    //Jump
    if(this.cursors.up.isDown && this.player.body.touching.down){
        console.log(`^`)
        this.player.setVelocityY(-player_config.jumpSpeed)
    }
}