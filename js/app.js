"use strict";
// set canvas variables
const WIDTH = 505;
const HEIGHT = 606;
const PLAYER_WIDTH = 101;
const PLAYER_HEIGHT = 171;

//Character class
var Character = function(x, y, sprite){
    this.x = x;
    this.y = y;
    this.sprite = sprite;
}

//Draw character on the screen
//this uses a helper to easily load images
Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies class
var Enemy = function() {

    let randomY = Math.floor(Math.random() * Math.floor(3))+1;
    let x = 0;
    let y = 73*randomY;
    let sprite = 'images/enemy-bug.png';

    Character.call(this, x, y, sprite);
    this.speed = 50 + Math.floor(Math.random() * Math.floor(300));
};
Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    Character.prototype.render.call(this);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x=this.x+this.speed*dt;
    if(this.x>WIDTH){
        let randomY = Math.floor(Math.random() * Math.floor(3))+1;
        this.x=0;
        this.y= 73*randomY;
        this.speed = 50 + Math.floor(Math.random() * Math.floor(300));
    }
    //Check collisions
    if(player.x<this.x+60 && player.x+60>this.x && player.y<this.y+30 && player.y+30>this.y){
        player.resetPlayer();
    }

};

// Player class
var Player = function(){
    let x = WIDTH/2 - PLAYER_WIDTH/2;
    let y = HEIGHT - 227;
    let sprite = 'images/char-boy.png';
    Character.call(this, x, y, sprite);
}
Player.prototype = Object.call(Character.prototype);
Player.prototype.constructor = Player;

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    Character.prototype.render.call(this);
};

// Update the player's position, required method for game
Player.prototype.update = function() {
    if(this.y<-20){
        this.resetPlayer();
    }
};
//Reset player to the original location
Player.prototype.resetPlayer = function(){
        this.y = HEIGHT - 227;
        this.x = WIDTH/2 - PLAYER_WIDTH/2;
};

//Receive user input - pressed keys - and move the player according to that input
Player.prototype.handleInput = function(input) {

    switch(input){
        case 'left':
            if(this.x-101>-20){
                this.x=this.x-101;
            }
            break;

        case 'up':
            if(this.y-80>-100){
                this.y=this.y-80;
            }
            break;

        case 'right':
            if(this.x+101<WIDTH){
                this.x=this.x+101;
            }
            break;

        case 'down':
            if(this.y+80<HEIGHT-171){
               this.y=this.y+80;
            }
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var bug1 = new Enemy();
var bug2 = new Enemy();
var bug3 = new Enemy();
var allEnemies = [bug1, bug2, bug3];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
