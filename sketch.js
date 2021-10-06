class GameObject {
  constructor() {

    this.tilemap = [
      'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
      'w                                      w',
      'wde d            de                 e dw',
      'wwwwwwww   www   wwwww ww      ww  wwwww',
      'w       wwwe               ww          w',
      'w          wwwww   ww          ww      w',
      'w                         d       ww   w',
      'wd        d      ww       w           dw',
      'www e     w   w    d                  ww',
      'w   wwwwww         ww     e d     w    w',
      'w         w   w       d   wwwwww      dw',
      'w      ww             ww             www',
      'w        d       w              d ww   w',
      'w        ww d         ww     d  ww     w',
      'w     www   ww               ww        w',
      'wwwww            w e  d w              w',
      'w  e       d      wwwwww   wwd         w',
      'wd wwwwww  w  w             ww         w',
      'ww    w                         ww   p w',
      'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
    ]
    this.game_over = false; // Checking if the game is over
    this.game_won = false; // Checking if the game is won
    this.game_state = false; // Checking if the game has loaded
    this.instructions_state = false; // Checking if the instructions has loaded
    
    this.walls = [];
    this.diamonds = [];
    this.enemies = [];
    this.player;
  }

  initTilemap() {
    for (var i = 0; i< this.tilemap.length; i++) {
        for (var j =0; j < this.tilemap[i].length; j++) {
            switch (this.tilemap[i][j]) {
                case 'w': 
                  this.walls.push(new Wall(j*20, i*20));
                  break; 
                    
                case 'p':
                  this.player = new Player(j*20, i*20);
                  break;
                  
                case 'e': 
                  this.enemies.push(new Enemy(j*20, i*20, 'chase'));
                  break;
                
                case 'd': 
                  this.diamonds.push(new Diamond(j*20, i*20));
                  break;
            }
        }
      }
  }
}

var custom_elements = [];
var player_difference = 0;
var enemy_difference = 0;
var total_score = 20;

// Creates a custom wall element
function customBrick() {
  
  push();
  background(220, 220, 220, 0);
  // strokeWeight(40);
  stroke(205, 84, 75);
  fill(160, 95, 53);
  rect(0, 0, width, height);
  custom_elements.push(get(0, 0, width, height));
  pop();
}

function customPlayer() {
  push();
    background(220, 220, 220, 0);
    push();
      fill(212, 175, 142);
      rect(50, 0, 300, 400); // face
    pop();
  
    push();
      noStroke();
      fill('#5B4343')
      rect(50, 0, 300, 50); // top part of the hat
      rect(0, 50, 400, 50); // bottom part of the hat
    pop();

    push();
      rect(80, 150, 90, 40); // left eye
      rect(230, 150, 90, 40); // right eye
    pop();

    push();
      fill(0);
      if(keyIsDown(RIGHT_ARROW) == true){
        rect(130, 150, 40, 40); // turning right  
      }
      else if(keyIsDown(LEFT_ARROW)){
       rect(80, 150, 40, 40); // turning left 
      }
      else {
        rect(105, 150, 40, 40);
      }
    pop();

    push();
      fill(0);  
      if(keyIsDown(RIGHT_ARROW)  == true){
        rect(280, 150, 40, 40); // turning right
      }
      else if(keyIsDown(LEFT_ARROW)){
        rect(230, 150, 40, 40); // turning left
      }
      else{
        rect(255, 150, 40, 40); // turning left
      }
    pop();

    push();
      fill('#B67A45');
      rect(175, 215, 50, 50); // nose
    pop();

    push();
      fill('#24180E')
      rect(50, 280, 300, 120); // beard
    pop();

    push();
      fill(204, 146, 144);
      noStroke();
      rect(140, 330, 125, 30);
      if(keyIsDown(RIGHT_ARROW)  == true){
        rect(140, 310, 20, 20); // turning right
      }
      else if(keyIsDown(LEFT_ARROW)){
        rect(245, 310, 20, 20); // turning left
      }
    pop();
    custom_elements.push(get(0, 0, width, height));
  pop();
}

function customDiamond() {
  push();
  background(220, 220, 220, 0);
  
  stroke(6, 140, 105);
  strokeWeight(30);
  fill(6, 140, 105);
  
  line(200, 0, 100, 200); // L1
  line(100, 200, 200, 400); // L2
  line(200, 400, 200, 0); // M1
  line(100, 200, 300, 200); // M2
  line(200, 0, 300, 200); // R1
  line(300, 200, 200, 400); // R2
  custom_elements.push(get(0, 0, width, height));
  pop();
}

function customEnemy() {
  push();
    background(220, 220, 220, 0);
    noStroke();
    // fill('#8D5524');
    push();
      fill(212, 175, 142);
      rect(50, 0, 300, 400); // face
    pop();

    push();
      fill(0);
      rect(170, 0, 60, 80);
    pop();

    push();
      fill(0);
      rect(60, 130, 130, 80); // left eye shadow
      rect(210, 130, 130, 80); // right eye shadow
    pop();

    push();
      fill(255, 0, 0);
      rect(50, 190, 40, 20); // left blood stroke 1
      rect(50, 230, 40, 20); // left blood stroke 2
      rect(50, 270, 40, 20); // left blood stroke 3

      rect(310, 190, 40, 20); // right blood stroke 1
      rect(310, 230, 40, 20); // right blood stroke 2
      rect(310, 270, 40, 20); // right blood stroke 3
    pop();

    push();
      rect(80, 150, 90, 40); // left eye
      rect(230, 150, 90, 40); // right eye
    pop();

    push();
      fill(0);
      rect(115, 160, 20, 20); // left pupil
    pop();

    push();
      fill(0);
      rect(265, 160, 20, 20); // right pupil
    pop();

    push();
      fill('#815731');
      rect(175, 215, 50, 50); // nose
    pop();

    push();
      fill('#3E0F0F');
      noStroke();
      rect(140, 330, 125, 30); 
      rect(140, 360, 20, 20);
      rect(245, 360, 20, 20);
    pop();

    push();
      stroke(255);
      strokeWeight(10);
      line(170, 345, 235, 345);
      stroke(0);
      strokeWeight(2);
      line(170, 345, 235, 345);
    pop();
    custom_elements.push(get(0, 0, width, height));
  pop();
}

function customElements() {
  customDiamond();
  customEnemy();
  customPlayer();
  customBrick();
}

// Creates a wall object
class Wall{
  constructor(x, y){
      this.x = x;
      this.y = y;
      this.centerX = x + 10;
      this.centerY = y + 10;
  }

  draw() {
    image(custom_elements[3], this.x, this.y, 20, 20);
  }

}

// Creates a diamond object
class Diamond {
  constructor(x, y) {
      this.x = x;
      this.y = y;
      this.centerX = x + 10;
      this.centerY = y + 10;
      this.stolen = false;
  }

  draw() {
      image(custom_elements[0], this.x, this.y, 20, 20);
  }

  check_theft_by_player() {

      var horizontal_distance = abs((gameObj.player.position.x + 10) - this.centerX);
      var vertical_distance = abs((gameObj.player.position.y + 10) - this.centerY);


      if(horizontal_distance <= 19.99 && vertical_distance <= 19.99) {
          console.log('Diamonds: Collision with player');
          this.stolen = true;

          return true;
      }

      return false;
  }
}

class Player{
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.centerX = x + 10;
    this.centerY = y + 10;
    this.position = new p5.Vector(x, y);
    this.velocity = new p5.Vector(0, 0);
    this.acceleration = new p5.Vector(0, 0);
    this.force = new p5.Vector(0, 0);
    this.currFrame = frameCount;
    this.jump = 0;
    this.score = 0;
  }

  draw() {
    image(custom_elements[2], this.position.x, this.position.y, 20,20); 
    
    if (keyIsDown(UP_ARROW) && (this.jump === 0)) {
      this.jump = 2;
    }
    
     this.acceleration.set(0, 0);
    }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.acceleration.set(0, 0);
    
    // Going to jump
    if (this.jump === 2) {
      print('Player: Jumped');
      this.applyForce(jumpForce);
      this.jump = 1;
    }
    
    // In air
    if (this.jump > 0){
      print('Player: In air');
      this.applyForce(gravity);
    }
  
    this.velocity.add(this.acceleration);
    
    if (this.position.y < 25) {
        print('Player: Hit the ceiling!');
        this.position.y = 25;
      }
    
    // Landing condition
    if (this.velocity.y > 0 && this.check_collision_with_walls_Y(1)) {
      print('Player: Landed on wall');
      this.position.y -= player_difference;
      player_difference = 0;
      this.velocity.y = 0;
      this.jump = 0;
    }
    
    // Falling condition
    if (this.velocity.y == 0 && !this.check_collision_with_walls_Y(5)){
      print('Player: Falling');
      this.jump = 1;
    }
    
    this.position.add(this.velocity);
    this.acceleration.set(0, 0);
  }
  
  move() {
    var deltaX = 0;

    if (keyIsDown(RIGHT_ARROW) && this.x < 800 - 10){
        deltaX = 5;
    }
    if (keyIsDown(LEFT_ARROW) && this.x > 10){
        deltaX = -5;
    }

    // Checking if player collides in X direction
    if(deltaX != 0 && this.check_collision_with_walls_X(deltaX) == true){
      deltaX = 0;
    }
  
  this.position.x += deltaX;
  }

  check_collision_with_walls_X(deltaX) {
      
    for (var i=0; i < gameObj.walls.length; i++) {

        var horizontal_distance = abs(gameObj.walls[i].centerX - ((this.position.x + 10) + deltaX));
      var vertical_distance = abs(gameObj.walls[i].centerY - ((this.position.y + 10)));


        if(horizontal_distance <= 19.99 && vertical_distance <= 19.99) {
          console.log('Collision with wall, xdist: ' + horizontal_distance);
          return true;
        }
      }

      return false;
  }
    
  check_collision_with_walls_Y(deltaY) {
      
    for (var i=0; i < gameObj.walls.length; i++) {

      var horizontal_distance = abs(gameObj.walls[i].centerX - ((this.position.x + 10)));
      var vertical_distance = abs(gameObj.walls[i].centerY - ((this.position.y + 10) + deltaY));
        
        if(vertical_distance <= 19.99 && horizontal_distance <= 19.99 && gameObj.walls[i].centerY > (this.position.y + 10) + deltaY) {
          console.log('Collision with wall, ydist: ' + vertical_distance);
          player_difference = 19 - vertical_distance;
          return true;
        }      
      }
      return false;
  }
  
}

class wanderState {
  constructor() {
    // this.wanderDist = 0;
    // this.step = new p5.Vector(0,0);
    this.deltaX = 2;
  }
  
  execute(me) {
    
    if (me.jump == 1){
      print('Enemy(wandering): In air');
      me.applyForce(gravity);
      me.velocity.add(me.acceleration);
      me.position.add(me.velocity);
      
      if(me.check_collision_with_walls_Y(5)) {
        me.jump = 0;
        me.acceleration.set(0,0);
        me.velocity.set(0,0);
        me.position.y -= enemy_difference;
        enemy_difference = 0;
      }
    } 
    else {
      // Checking if enemy collides in X direction or falls off the edge
      if(me.check_collision_with_walls_X(this.deltaX) || !me.check_collision_with_walls_Y(5)){
      this.deltaX *= -1;
      me.jump = 0;
    }
  
    me.position.x += this.deltaX;
    }
    
    

    // Checking if it is ready to chase
    if (dist(me.position.x, me.position.y, gameObj.player.position.x, gameObj.player.position.y) < 120) {
        me.changeState(1);
    }
  }
}  // wanderState

class chaseState {
  constructor() {
    this.step = new p5.Vector(0,0);
  }
  
  execute(me) {
    var playerX = gameObj.player.position.x;
    var playerY = gameObj.player.position.y;
    
    // Calculating the distance between the player and the enemy
    this.step.set(playerX - me.position.x, playerY - me.position.y);
    // Normalizing the vector
    this.step.setMag(0.7); // acceleration of the chase
    
    // If the player is above the enemy
    if(me.position.y - playerY > 40 && me.jump == 0) {
      me.jump = 2;
    }
    
    // Checking if the enemy jumped
    if (me.jump == 2) {
      print('Enemy: Jumped');
      me.applyForce(jumpForce);
      me.jump = 1;
    }
    
    // Enemy in air
    if (me.jump > 0){
      print('Enemy: In air');
      me.applyForce(gravity);
    }
    
    // Adding gravity to velocity
    me.velocity.add(me.acceleration);

    // Landing condition
    if (me.velocity.y > 0 && me.check_collision_with_walls_Y(1)) {
      print('Enemy: Landed on wall');
      me.position.y -= enemy_difference;
      enemy_difference = 0;
      me.velocity.y = 0;
      me.jump = 0;
    }
    
    // Falling condition
    if (me.velocity.y == 0 && !me.check_collision_with_walls_Y(5)){
      me.jump = 1;
    }
    
    // Applying velocity
    me.position.add(me.velocity);
    // Increasing the horizontal distance to chase the player
    if (!me.check_collision_with_walls_X(this.step.x)){
     me.position.x += this.step.x; 
    }
    me.acceleration.set(0, 0);


    if (dist(me.position.x, me.position.y, playerX, playerY) > 150) {
      
      // Checking if the player has landed before wandering  
      if( !me.check_collision_with_walls_Y(5)){
        
        // If enemy has not landed, the enemy is in mid-air
        me.jump = 1;
      }
      me.changeState(0);
    }
  }
}

class Enemy{
  constructor(x, y){
        this.x = x;
        this.y = y;
        this.position = new p5.Vector(x, y);
        this.velocity = new p5.Vector(0, 0);
        this.acceleration = new p5.Vector(0, 0);
        this.force = new p5.Vector(0, 0);
        this.dead = false;
        this.state = [new wanderState(), new chaseState()];
        this.currState = 0;
  }

  changeState(x) {
    this.currState = x;
  }
  
  draw() {
    image(custom_elements[1], this.position.x, this.position.y, 20, 20);
    
    this.acceleration.set(0, 0);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }
  
  check_collision_with_walls_X(deltaX) {
      
    for (var i=0; i < gameObj.walls.length; i++) {

        var horizontal_distance = abs(gameObj.walls[i].centerX - ((this.position.x + 10) + deltaX));
      var vertical_distance = abs(gameObj.walls[i].centerY - ((this.position.y + 10)));


        if(horizontal_distance <= 19.99 && vertical_distance <= 19.99) {
          console.log('Collision with wall, xdist: ' + horizontal_distance);
          return true;
        }
      }

      return false;
  }
    
  check_collision_with_walls_Y(deltaY) {
      
    for (var i=0; i < gameObj.walls.length; i++) {

      var horizontal_distance = abs(gameObj.walls[i].centerX - ((this.position.x + 10)));
      var vertical_distance = abs(gameObj.walls[i].centerY - ((this.position.y + 10) + deltaY));
        
        if(vertical_distance <= 19.99 && horizontal_distance <= 19.99 && gameObj.walls[i].centerY > (this.position.y + 10) + deltaY) {
          console.log('Enemy: Collision with wall, ydist: ' + vertical_distance);
          enemy_difference = (19 - vertical_distance);
          return true;
        }      
      }
      return false;
  }
  
  check_collision_with_player() {

        var vertical_distance = abs(gameObj.player.position.y + 10 - (this.position.y));
        var horizontal_distance = abs(gameObj.player.position.x + 10 - (this.position.x));

        if(vertical_distance <= 19.99 && horizontal_distance <= 19.99) {
            
          print('Enemies: Collision with player');
          
          // Checking if the player killed the enemy from above
          if (gameObj.player.position.y < this.position.y && horizontal_distance <= 10){
             this.dead = true;
          }
          else {
          // The player got killed by the enemy
             gameObj.game_over = true;
             gameObj.game_state = false; 
          }
            
            return true;
        }

        return false;
    }
}



var gravity, walkForce, backForce, jumpForce, jumpForce2;
// function keyPressed() {
//   if ((keyCode === 32) && (gameObj.player.jump === 0)) {
//     gameObj.player.jump = 2;
//   }
// }

// function keyReleased() {
//   if (keyCode === RIGHT_ARROW) {
//     gameObj.player.walkForward = 0;
//   }
//   else if (keyCode === LEFT_ARROW) {
//     gameObj.player.walkBackward = 0;
//   }
// }

class StartScreen{
  constructor(x, y){
      this.x = x;
      this.y = y;
  }

  draw() {
      push();
        background('#542946');
        
        push();
          fill('#E89C5B');
          stroke(0);
          textSize(30);
          text('Treasure Hunter :', this.x + 80 - 40, this.y + 35 + 25);
          fill('#D96055');
          text('Jumping Frenzy', this.x + 85 + 40, this.y + 80 + 25)
        pop();
        push();
          fill(255);
          rect(this.x + button1_start_x, this.y + button1_start_y, 150, 75);
          fill(0);
          textSize(40);
          text("Start", this.x + button1_start_x + 30, this.y + button1_start_y + 55);
        pop();
        push();
        fill(255);
          rect(this.x + button2_start_x, this.y + button2_start_y, 250, 75);
          fill(0);
          textSize(40);
          text("Instructions", this.x + button2_start_x + 25, this.y + button2_start_y + 55);
        pop();
      pop();
    
    this.checkStartButton();
    this.checkInstructionsButton();
      
  }

  drawInstructions() {
    rectMode(CORNER);
    push();
      fill(0);
      stroke(0);
      textSize(40);
      text('Instructions', 100, 70);
      textSize(14);
      text("1. Player moves with (left or right) arrow keys", 20, 120);
      text("2. Player jumps with (up) arrow key", 20, 165);
      text("3. Obtain all the prizes to win", 20, 210);
      text("4. You lose if the enemy catches you", 20, 255);
      text("5. You can't pass through the walls", 20, 300);

      fill(255);
      rect(115, 285, 150, 75);
      fill(0);
      textSize(40);
      text('Return', 127.5, 337.5);
    pop();

    this.checkReturnButton();
  }

  checkStartButton() {
    if (mouseX > button1_start_x &&
      mouseY > button1_start_y &&
      mouseX < button1_end_x &&
      mouseY < button1_end_y) {
        
      // Focusing on the start button.
      overBox_start = true;
    }
    else {
        overBox_start = false;
    }
  }

  checkInstructionsButton() {
    if (mouseX > button2_start_x &&
      mouseY > button2_start_y &&
      mouseX < button2_end_x &&
      mouseY < button2_end_y) {
        
      // Focusing on the instructions button.
      overBox_instructions = true;
    }
    else {
        overBox_instructions = false;
    }
  }

  checkReturnButton() {

    if (mouseX > button3_start_x &&
      mouseY > button3_start_y &&
      mouseX < button3_end_x &&
      mouseY < button3_end_y) {
        
      // Focusing on the instructions button.
      overBox_instructions = false;
    }
    else {
      overBox_instructions = true;
    }
    //exits to start_screen
  }

}

// Start button dimensions
var button1_start_x = 115;
var button1_start_y = 150;
var button1_end_x = 265;
var button1_end_y = 225;

// Instructions button dimensions
var button2_start_x = 65;
var button2_start_y = 250;
var button2_end_x = 315;
var button2_end_y = 325;

// Return button dimensions
var button3_start_x = 115;
var button3_start_y = 285;
var button3_end_x = 250;
var button3_end_y = 360;

// Flags for buttons
var overBox_start = false; // Checking focus on button start
var overBox_instructions = false; // Checking focus on button instructions
var overBox_gameover = false; // Checking focus on return button on game over page

// Instances of classes
var start_screen; // Instance of start screen
var gameObj; // Instance of game object

// Checking if the mouse is pressed while the cursor is over the logo i.e. overBox is true.
// If yes, the game is loaded.
function mousePressed() {
  
  if (overBox_start) {
    gameObj.game_state = true;
  } else {
    gameObj.game_state = false;
  }

  if (overBox_instructions) {
    gameObj.instructions_state = true;
  } else {
    gameObj.instructions_state = false;
  }

  if(overBox_gameover) {
    gameObj.game_over = true;
  } else {
    gameObj.game_over = false;
  }
}

function setup() {
  createCanvas(400, 400);

  start_screen = new StartScreen(0,0);
  gameObj = new GameObject();
  
  customElements();
  gameObj.initTilemap();

  gravity = new p5.Vector(0, 0.15);
  walkForce = new p5.Vector(0.1, 0);
  backForce = new p5.Vector(-0.1, 0);
  jumpForce = new p5.Vector(0, -4);
  // jumpForce2 = new p5.Vector(0, -0.4);
}

function draw_walls() {
  for (var i=0; i < gameObj.walls.length; i++) {
    gameObj.walls[i].draw();
  }
}

function draw_diamonds() {
  var intact_diamonds = 0;
    for (var i=0; i < gameObj.diamonds.length; i++) {
        if(!gameObj.diamonds[i].stolen) {
          gameObj.diamonds[i].draw();
            intact_diamonds++;
        }
    }
    gameObj.player.score = total_score - intact_diamonds;
}

function draw_enemies() {
    for (var i=0; i < gameObj.enemies.length; i++) {
        if(!gameObj.enemies[i].dead) {
          gameObj.enemies[i].draw();
          gameObj.enemies[i].state[gameObj.enemies[i].currState].execute(gameObj.enemies[i]);
          // gameObj.enemies[i].move();
          // gameObj.enemies[i].chase();
        }
    }
}

function draw() {
  background(220);

  if (!(gameObj.game_state || gameObj.instructions_state || gameObj.game_over))
  {
    start_screen.draw();
  }
  else if(gameObj.instructions_state)
  {   
    start_screen.drawInstructions();
  }
  else if(gameObj.game_over)
    {
        // Reinitializing the game
        gameObj.walls = [];
        // gameObj.vertical_enemies = [];
        // gameObj.horizontal_enemies = [];
        gameObj.enemies = [];
        gameObj.diamonds = [];
        gameObj.initTilemap();
        overBox_start = false;
        gameObj.player.score = 0;
      
        rectMode(CORNER);
        push();
          background(100, 135, 152);
        if (!gameObj.game_won){
          push();
            fill(21, 53, 68);
            textSize(40);
            text('Game Over!', width/2 - 100, height/2 - 45);
          pop(); 
        }
        else{
          push();
            fill(21, 53, 68);
            textSize(40);
            text('Game Won!', width/2 - 100, height/2 - 45);
          pop(); 
        }
        push();
          fill(255);
          rect(115, 285, 150, 75);
          fill(0);
          textSize(40);
          text('Return', 127.5, 337.5);
        pop();  
      pop();

        if (mouseX > 115 &&
            mouseY > 285 &&
            mouseX < 250 &&
            mouseY < 360) {
              
            // Focusing on the instructions button.
            overBox_gameover = false;
        }
        else {
            overBox_gameover = true;
        }
        //exits to start_screen
    }
  else if(gameObj.game_state) {
    
    push();
    // Player's position is initialized in the map to be at the right side
    if(gameObj.player.position.x > width/2) {
      // If player's position is in the right side, then shift immediately
      if (gameObj.player.position.x > 600) {
        translate(-400,0);
      } else {
        // Shifts the left side of the map (origin) to the left by the change in distance from mid-section of the screen
        translate(width/2 - gameObj.player.position.x, 0);
      }
    }
    
    draw_walls();
    draw_diamonds();
    draw_enemies();
    gameObj.player.draw();
    gameObj.player.update();
    gameObj.player.move();
    
    for (var i=0; i < gameObj.enemies.length; i++) {
          if(!gameObj.enemies[i].dead) {
            gameObj.enemies[i].check_collision_with_player();
          }
    }

    for (var i=0; i < gameObj.diamonds.length; i++) {
            
      gameObj.diamonds[i].check_theft_by_player();
    }
    pop();

    push();
        textSize(20);
        fill('#542946');
        text('Score:  ' + gameObj.player.score, 300, 18);
    pop();
    if (gameObj.player.score == 20) {
      gameObj.game_won = true;
      gameObj.game_over = true;
    }
  }
}
