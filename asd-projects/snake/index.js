/* global $, sessionStorage */

////////////////////////////////////////////////////////////////////////////////
///////////////////////// VARIABLE DECLARATIONS ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// HTML Objects
var board = $("#board");
var scoreElement = $("#score");
var highScoreElement = $("#highScore");

// Game Variables
var score = 0; 
var started = false; 

// TODO 4, Part 1: Create the apple variable
var apple = {};

// TODO 5, Part 1: Create the snake variable
var snake = {};

// Constant Variables
var ROWS = 20;
var COLUMNS = 20;
var SQUARE_SIZE = 20;
var KEY = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
};

// interval variable required for stopping the update function when the game ends
var updateInterval;

// variable to keep track of the key (keycode) last pressed by the user
var activeKey;

////////////////////////////////////////////////////////////////////////////////
////////////////////////////// GAME SETUP //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// TODO: turn on keyboard inputs
document.body.addEventListener("keydown", handleKeyDown);

// start the game
init();

function init() {
  // TODO 5, Part 2: initialize the snake
snake.body = [];
makeSnakeSquare(10, 10);
makeSnakeSquare(10, 9);
makeSnakeSquare(10, 8);
snake.head = snake.body[0];
  };
  makeSnakeSquare(10, 10); // head in the middle
  snake.head.direction = "right";

  // TODO 4, Part 3: initialize the apple
  makeApple();

  // TODO 6, Part 1: Initialize the interval
  clearInterval(updateInterval);
  updateInterval = setInterval(update, 150);


////////////////////////////////////////////////////////////////////////////////
///////////////////////// PROGRAM FUNCTIONS ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/*
 * On each update tick update the snake's position and check for
 * collisions with the walls.
 */
function update() {
  // TODO 6, Part 2: Fill in the update function's code block
  if (!started) return;

  moveSnake();

  if (hasHitWall() || hasCollidedWithSnake()) {
    endGame();
    return;
  }

  if (hasCollidedWithApple()) {
    handleAppleCollision();
  }
}

function checkForNewDirection() {
  /* 
  TODO 7: 
  */

  if (!activeKey) return;

  if (activeKey === KEY.LEFT && snake.head.direction !== "right") {
    snake.head.direction = "left";
  } else if (activeKey === KEY.RIGHT && snake.head.direction !== "left") {
    snake.head.direction = "right";
  } else if (activeKey === KEY.UP && snake.head.direction !== "down") {
    snake.head.direction = "up";
  } else if (activeKey === KEY.DOWN && snake.head.direction !== "up") {
    snake.head.direction = "down";
  }
}

function moveSnake() {
  /* 
    TODO 10: Move each part of the snake's body such that its body follows the head.
  */
  for (var i = snake.body.length - 1; i > 0; i--) {
    snake.body[i].row = snake.body[i - 1].row;
    snake.body[i].column = snake.body[i - 1].column;
    repositionSquare(snake.body[i]);
  }

  //Before moving the head, check for a new direction from the keyboard input
  checkForNewDirection();

  /* 
    TODO 8: determine the next row and column for the snake's head
  */
  if (snake.head.direction === "left") {
    snake.head.column--;
  } else if (snake.head.direction === "right") {
    snake.head.column++;
  } else if (snake.head.direction === "up") {
    snake.head.row--;
  } else if (snake.head.direction === "down") {
    snake.head.row++;
  }
  repositionSquare(snake.head);

  // Update tail
  snake.tail = snake.body[snake.body.length - 1];
}

// TODO 9: Create a new helper function
function squaresAreEqual(square1, square2) {
  return square1.row === square2.row && square1.column === square2.column;
}

function hasHitWall() {
  /* 
    TODO 11: Should return true if the snake's head has collided with the walls
  */
  if (
    snake.head.row < 0 ||
    snake.head.row >= ROWS ||
    snake.head.column < 0 ||
    snake.head.column >= COLUMNS
  ) {
    return true
  }
  return false
}

function hasCollidedWithApple() {
  /* 
    TODO 12: Should return true if the snake's head has collided with the apple
  */
  return squaresAreEqual(snake.head, apple);
}

function handleAppleCollision() {
  score++;
  scoreElement.textContent = "Score: " + score;

  // Remove existing Apple and create a new one
  board.removeChild(apple.element);
  makeApple();

  var row = snake.tail.row;
  var column = snake.tail.column;
  makeSnakeSquare(row, column);
}

function hasCollidedWithSnake() {
  /* 
    TODO 13: Should return true if the snake's head has collided with any part of the body
  */
  for (var i = 1; i < snake.body.length; i++) {
    if (squaresAreEqual(snake.head, snake.body[i])) {
      return true;
    }
  }
  return false;
}

function endGame() {
  clearInterval(updateInterval);
  started = false;

  board.innerHTML = "";

  highScoreElement.textContent = "High Score: " + calculateHighScore();
  scoreElement.textContent = "Score: 0";
  score = 0;

  setTimeout(init, 500);
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function makeApple() {
  // TODO 4, Part 2: Fill in this function's code block
  var position = getRandomAvailablePosition();
  var appleElement = document.createElement("div");
  appleElement.className = "apple";
  board.appendChild(appleElement);

  apple = { element: appleElement, row: position.row, column: position.column };
  repositionSquare(apple);
}

function makeSnakeSquare(row, column) {
  // TODO 5, Part 2: Fill in this function's code block
  var snakeElement = document.createElement("div");
  snakeElement.className = "snake";
  board.appendChild(snakeElement);

  var square = { element: snakeElement, row: row, column: column };
  snake.body.push(square);

  if (!snake.head) {
    snake.head = square;
  }
  snake.tail = square;

  repositionSquare(square);
}

function handleKeyDown(event) {
  // TODO 7: make the handleKeyDown function register which key is pressed
  activeKey = event.which;

  if (
    event.which === KEY.LEFT ||
    event.which === KEY.RIGHT ||
    event.which === KEY.UP ||
    event.which === KEY.DOWN
  ) {
    started = true;
  }
}

function repositionSquare(square) {
  var squareElement = square.element;
  var row = square.row;
  var column = square.column;

  var buffer = 0; // no offset, since board starts at 0,0

  squareElement.style.left = column * SQUARE_SIZE + buffer + "px";
  squareElement.style.top = row * SQUARE_SIZE + buffer + "px";
}

function getRandomAvailablePosition() {
  var spaceIsAvailable;
  var randomPosition = {};

  while (!spaceIsAvailable) {
    randomPosition.column = Math.floor(Math.random() * COLUMNS);
    randomPosition.row = Math.floor(Math.random() * ROWS);
    spaceIsAvailable = true;

    /*
      TODO 14: Check if random position overlaps snake's body
    */
    for (var i = 0; i < snake.body.length; i++) {
      if (
        snake.body[i].row === randomPosition.row &&
        snake.body[i].column === randomPosition.column
      ) {
        spaceIsAvailable = false;
        break;
      }
    }
  }

  return randomPosition;
}

function calculateHighScore() {
  var highScore = sessionStorage.getItem("highScore") || 0;

  if (score > highScore) {
    sessionStorage.setItem("highScore", score);
    highScore = score;
    alert("New High Score!");
  }

  return highScore;
}
