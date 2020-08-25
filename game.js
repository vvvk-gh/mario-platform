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
    }

}


let game = new Phaser.Game(config)


function preload() {
    //load images 
    this.load.image("ground" , "assets/topground.png")
}


function create() {
    
    W = game.config.width;
    H = game.config.height;

    let ground = this.add.sprite(0,H-128, "ground")
    //intailly phasersprites takes the point from the center of the image by default
    //now lets set them to starting points
    ground.setOrigin(0,0);
    
}

//game loop
function update() {
    console.log(`Update`)
}