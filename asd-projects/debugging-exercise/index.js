$(document).ready(function () {
  
/////////////////
// initialization
/////////////////

// this section initializes some variables that will be used throughout the program
var doubleMaxSpeed = 5;
var maxGhosts = 10;
var $board = $("#board");
var boardWidth = $($board).width();
var boardHeight = $($board).height();
var ghosts = [];
var ghostRadius = 10;
// modify these values if you want faster moving ghosts or a shorter countdown timer
const FPS = 25;
const initialDelay = 5_000;

//////////
// startup
//////////

// this gets the whole thing going;
// it creates a number of ghosts both in JavaScript and in the HTML of the website
for (var i = 0; i < maxGhosts; i++) {
  var newId = getId(i);
  var newGhost = makeGhost(newId);
  ghosts.push(newGhost);

  addNewGhostElement(newGhost, newId);
}

// calling this function first starts a 5 second countdown
// after the countdown, the update function will be called repeatedly 25 times per second
startProgram();

///////////////////////////
// startup helper functions
///////////////////////////

// this creates a ghost object and returns it
// note: it only creates an object; it does not create a ghost in the HTML
function makeGhost(id) {
  // this creates an empty object
  var ghost = {};

  // this creates some useful variables that are not directly placed in the object
  var maxX = boardWidth - ghostRadius * 2;
  var maxY = boardHeight - ghostRadius * 2;

  // this gives the ghost object all of the data that it needs to store
  ghost.id = "#" + id;
  ghost.x = Math.random() * maxX + ghostRadius;   // FIXED: was maXX
  ghost.y = Math.random() * maxY + ghostRadius;
  ghost.speedX = decideSpeed();
  ghost.speedY = decideSpeed();                   // FIXED: was desideSpeed()

  // assign a random color for the ghost's glow
  const colors = [
    "#00f",
    "#f00",
    "#0f0",
    "#ff0",
    "#0ff",
    "#f0f",
    "#fff",
    "#fa0",
    "#0a0",
    "#a0f",
  ];
  ghost.color = colors[Math.floor(Math.random() * colors.length)];

  return ghost;
}

// this generates a random speed value
function decideSpeed() {
  return (Math.random() * doubleMaxSpeed) - (doubleMaxSpeed / 2); // better range between -2.5 and +2.5
}

// this generates an id for a ghost given the ghost's number
function getId(number) {
  return "ghost" + number;   // FIXED: removed stray ()
}

// this adds a ghost into the HTML
function addNewGhostElement(ghost, id) {          // FIXED: funtion → function
  // this creates the HTML for a new ghost element
  var $ghost = $("<img>")
    .attr("id", id)
    .attr("src", "img/ghost.png")
    .css("left", ghost.x)
    .css("top", ghost.y)
    .addClass("ghost");

  // this inserts the ghost's HTML into your website
  $ghost.appendTo($board);
}

//////////////////
// update function
//////////////////

// this should move all of the ghosts
function update() {                               // FIXED: function update)
  // loop over the ghosts array. We use the maxGhosts variable instead of ghosts.length
  for (var i = 0; i < maxGhosts; i++) {
    var ghost = ghosts[i];                       // FIXED: was ghosts[j]

    // move the ghost
    moveGhost(ghost);

    // bounce the ghost, if it hits a wall
    bounceGhost(ghost);

    // redraw the ghost on the screen after it moves
    updateGhostOnScreen(ghost);

    // make sure the ghost is oriented correctly
    updateOrientation(ghost);
  }
}

//////////////////////////
// update helper functions
//////////////////////////

// this moves ghosts in memory but doesn't update them on the screen
function moveGhost(ghost) {
  ghost.x += ghost.speedX;                       // FIXED: was assignment = instead of +=
  ghost.y += ghost.speedY;
}

// this bounces ghosts if they hit a wall
function bounceGhost(ghost) {
  // this bounces off the left wall
  if (ghost.x < 0) {                             // FIXED: missing )
    ghost.x -= ghost.speedX;
    ghost.speedX *= -1;
  }
  // this bounces off the right wall
  else if (ghost.x > boardWidth - ghostRadius * 2) {
    ghost.x -= ghost.speedX;
    ghost.speedX *= -1;
  }
  // this bounces off the top wall
  if (ghost.y < 0) {
    ghost.y -= ghost.speedY;
    ghost.speedY *= -1;
  }
  // this bounces off the bottom wall
  else if (ghost.y > boardHeight - ghostRadius * 2) {
    ghost.y -= ghost.speedY;
    ghost.speedY *= -1;                          // FIXED: was flipping X instead of Y
  }
}

// this redraws the ghost's position on the screen
function updateGhostOnScreen(ghost) {
  // FIXED: removed accidental reset of maxGhosts = 0;

  // these lines redraw the ghost's position
  $(ghost.id).css("left", ghost.x);
  $(ghost.id).css("top", ghost.y);

  // these lines add a glow around the ghost
  $(ghost.id).css("transition", "left 0.2s linear, top 0.2s linear, filter 0.2s");
  $(ghost.id).css(
    "filter",
    `drop-shadow(0 0 4px #fff) drop-shadow(0 0 8px ${ghost.color}) drop-shadow(0 0 12px ${ghost.color})`
  );
  
}

////////////////////////////////////////////
// DO NOT CHANGE ANY CODE BELOW THIS LINE //
////////////////////////////////////////////

// This function works just fine - do not modify!!
function updateOrientation(ghost) {
  // Default orientation
  var scaleX = 1;
  var scaleY = 1;

  // Flip horizontally if moving right
  if (ghost.speedX > 0) {
    scaleX = -1;
  } else if (ghost.speedX < 0) {
    scaleX = 1;
  }

  // Flip vertically if moving down
  if (ghost.speedY > 0) {
    scaleY = -1;
  } else if (ghost.speedY < 0) {
    scaleY = 1;
  }

  $(ghost.id).css("transform", `scaleX(${scaleX}) scaleY(${scaleY})`);
}

////////////////////////////
// setup helper functions //
////////////////////////////

// This function works just fine - do not modify!!
function startProgram() {
  var $countdown = $("<div>").attr("id", "countdown-timer").css({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "red",
    "font-weight": "bold",
    "font-size": "5em",
    "text-align": "center",
    "z-index": 9999,
    "pointer-events": "none",
    width: "100%",
  });

  // Make sure #board is position: relative so absolute children are positioned inside it
  $board.css("position", "relative");
  $countdown.appendTo($board);

  var countdownSeconds = initialDelay / 1000;
  $countdown.text("Starting in: " + countdownSeconds);

  var countdownInterval = setInterval(function () {
    countdownSeconds--;
    if (countdownSeconds > 0) {
      $countdown.text("Starting in: " + countdownSeconds);
    } else {
      $countdown.text("Go!");
      clearInterval(countdownInterval);
    }
  }, 1000);

  setTimeout(startInterval, initialDelay);

  function startInterval() {
    setInterval(update, 1000 / FPS);
    $countdown.remove();
  }
}

});
