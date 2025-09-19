/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
function runProgram() {
  $(document).on("keydown", handleKeyDown);
  $(document).on("keyup", handleKeyUp);
 const KEY = {
  "LEFT": 37,
  "UP": 38,
  "RIGHT": 39,
  "DOWN": 40,
  "W": 87,
  "A": 65,
  "S": 83,
  "D": 68
};

var walker = {
  "x": 0,
  "y": 0,
  "speedX": 0,
  "speedY": 0
};
var walker2 = {
  "x": 100,
  "y": 100,
  "speedX": 0,
  "speedY": 0
};


  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  // Game Item Objects


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)

  /* 
  This section is where you set up event listeners for user input.
  For example, if you wanted to handle a click event on the document, you would replace 'eventType' with 'click', and if you wanted to execute a function named 'handleClick', you would replace 'handleEvent' with 'handleClick'.

  Note: You can have multiple event listeners for different types of events.
  */
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
function newFrame() {
  repositionGameItem();
  wallCollision();
  redrawGameItem();
}

function repositionGameItem() {
  walker.x = walker.speedX + walker.x;
  walker.y = walker.speedY + walker.y;

  walker2.x + walker2.speedX + walker.x;
  walker2.y + walker2.speedY + walker.y;
}

function redrawGameItem() {
  $("#walker").css("left", walker.x).css("top", walker.y);
  $("#walker2").css("left", walker2.x).css("top", walker2.y);
}


  
  /* 
  This section is where you set up the event handlers for user input.
  For example, if you wanted to make an event handler for a click event, you should rename this function to 'handleClick', then write the code that should execute when the click event occurs.
  
  Note: You can have multiple event handlers for different types of events.
  */
function handleKeyDown(event) {
  if (event.which === KEY.LEFT) walker.speedX = -5;
  else if (event.which === KEY.RIGHT) walker.speedX = 5;
  else if (event.which === KEY.UP) walker.speedY = -5;
  else if (event.which === KEY.DOWN) walker.speedY = 5;

  if (event.which === KEY.A) walker2.speedX = -5;
  else if (event.which === KEY.D) walker2.speedX = 5;
  else if (event.which === KEY.W) walker2.speedY = -5;
  else if (event.which === KEY.S) walker2.speedY = 5;
}

function handleKeyUp(event) {
  if (event.which === KEY.LEFT || event.which === KEY.RIGHT) walker.speedX = 0;
  if (event.which === KEY.UP || event.which === KEY.DOWN) walker.speedY = 0;

  if (event.which === KEY.A || event.which === KEY.D) walker2.speedX = 0;
  if (event.which === KEY.W || event.which === KEY.S) walker2.speedY = 0;
}


function wallCollision() {
  var boardWidth = $("#board").width();
  var boardHeight = $("#board").height();

  if (walker.x < 0) walker.x = 0;
  if (walker.y < 0) walker.y = 0;
  if (walker.x + $("#walker").width() > boardWidth) walker.x = boardWidth - $("#walker").width();
  if (walker.y + $("#walker").height() > boardHeight) walker.y = boardHeight - $("#walker").height();

  if (walker2.x < 0) walker2.x = 0;
  if (walker2.y < 0) walker2.y = 0;
  if (walker2.x + $("#walker2").width() > boardWidth) walker2.x = boardWidth - $("#walker2").width();
  if (walker2.y + $("#walker2").height() > boardHeight) walker2.y = boardHeight - $("#walker2").height();
}
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
}