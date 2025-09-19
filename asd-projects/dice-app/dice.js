 $(document).ready(function () {
// Your code goes here \\



$("#die").on("click", rollDie)

function makeDot(top, left, elementID){
  $("<div>")
  .css("height", 15)
  .css("width", 15)
  .css("top", top)
  .css("left", left)
  .css("background-color", "black")
  .css("position", "absolute")
  .appendTo(elementID);
}

function rollDie() {
  $('#die').empty()
  var randomNum = Math.ceil(Math.random() * 6);
console.log("You rolled an " + randomNum + "!!")
alert("You've rolled a " + randomNum + " Brosynthesis :3")

  if (randomNum === 1) {
     makeDot(50, 50, "#die"); // middle middle
   } else if (randomNum === 2) {
     makeDot(25, 25, "#die"); // top left
     makeDot(75, 75, "#die"); // bottom right
   } else if (randomNum === 3) {
     makeDot(25, 25, "#die"); // top left
     makeDot(75, 75, "#die"); // bottom right
     makeDot(50, 50, "#die"); // middle middle
   } else if (randomNum === 4) {
     makeDot(75, 75, "#die"); // bottom right
     makeDot(25, 25, "#die"); // top left
     makeDot(25, 75, "#die"); // bottom left
     makeDot(75, 25, "#die"); // top right
   } else if (randomNum === 5) {
     makeDot(50, 50, "#die"); // middle middle
     makeDot(75, 75, "#die"); // bottom right
     makeDot(25, 25, "#die"); // top left
     makeDot(25, 75, "#die"); // bottom left
     makeDot(75, 25, "#die"); // top right
   }
else {
  makeDot(10, 10, "#die") 
  makeDot(75, 75, "#die") 
  makeDot(42, 10, "#die")
  makeDot(75, 10, "#die")
  makeDot(10, 75, "#die")
  makeDot(42, 75, "#die")
}
}
});