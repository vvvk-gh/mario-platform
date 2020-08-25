//basic setup

let config = {
    type :Phaser.AUTO, //it chooses the best option automatically between canvas and webgl
    
    scale : {
        mode :Phaser.Scale.FIT, // refer scaler class in documentation
        width : 800,
        height : 600,
    },

    backgroundColor: 0xff0000,

    scene : {
        preload : preload,
        create : create,
        update : update
    },
    physics : {

    }

}


let game = new Phaser.Game(config)


function preload() {
    //load images 
    this.load.image("ground" , "assets/topground.png")
    this.load.image("sky" , "assets/background.png")
    //add sprite sheet : make sure the width and height of the image is multiples of 2
    //frameWidth and frameHeight is the width and height of each single image in the sprite
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
    background.depth = -1;

    //adding player : (x,y,image,defalut frame)
    this.add.sprite(100,100,"dude",4)
}
//game loop
function update() {
    console.log(`Update`)
}