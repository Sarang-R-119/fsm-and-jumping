class GameObject {
  constructor() {

    this.tilemap = [
      'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
      'w                                      w',
      'wwwwww     wwwwww                      w',
      'w                                      w',
      'w                                      w',
      'w                                      w',
      'w                                      w',
      'w                                      w',
      'w                                      w',
      'w                                      w',
      'w                                      w',
      'w                                      w',
      'w     wwwwww                           w',
      'w              wwwwwww                 w',
      'w     wwww                             w',
      'w           wwwww                      w',
      'w  wwww                wwwww          w',
      'w     www         wwwww                w',
      'w           wwwww                      w',
      'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
    ]

    this.game_over = false; // Checking if the game is over
    this.game_won = false; // Checking if the game is won
    this.game_state = false; // Checking if the game has loaded
    this.instructions_state = false; // Checking if the instructions has loaded
    
    this.walls = [];
  }

  initTilemap() {
    for (var i = 0; i< this.tilemap.length; i++) {
        for (var j =0; j < this.tilemap[i].length; j++) {
            switch (this.tilemap[i][j]) {
                case 'w': 
                    this.walls.push(new Wall(j*20, i*20));
                    break; 
            }
        }
      }
  }
}

var custom_elements = [];

// Creates a custom wall element
function customBrick() {
  
  push();
  background(220, 220, 220, 0);
  strokeWeight(40);
  stroke(205, 84, 75);
  fill(160, 95, 53);
  rect(0, 0, width, height);
  custom_elements.push(get(0, 0, width, height));
  pop();
}

function customElements() {
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
    image(custom_elements[0], this.x, this.y, 20, 20);
  }

}

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
}

function draw_walls() {
  for (var i=0; i < gameObj.walls.length; i++) {
    gameObj.walls[i].draw();
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
  else if(gameObj.game_state) {
    draw_walls();
  }
}
