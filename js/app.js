// set canvas variables
const WIDTH = 505;
const HEIGHT = 606;
const PLAYER_WIDTH = 101;
const PLAYER_HEIGHT = 171;

// Enemies class
var Enemy = function() {

  let randomY = Math.floor(Math.random() * Math.floor(3))+1;
  this.speed = 50 + Math.floor(Math.random() * Math.floor(300));
  this.x = 0;
  this.y = 73*randomY;
  // The image/sprite for enemies, this uses
  // a helper to easily load images
  this.sprite = 'images/enemy-bug.png';
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

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Player class
var Player = function(){
    this.x = WIDTH/2 - PLAYER_WIDTH/2;
    this.y = HEIGHT - 227;
    this.sprite = 'images/char-boy.png';
}

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
