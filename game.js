//basic setup

let config = {
    type :Phaser.CANVAS,
    width : 700,
    height : 300,
}


let game = new Phaser.Game(config)


function load() {
    console.log(`load`)
}


function create() {
    console.log(`Create`)
}

//game loop
function update() {
    console.log(`Update`)
}