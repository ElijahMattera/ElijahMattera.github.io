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
  makeDot(42, 42, "#die") 
}
else if (randomNum === 2) {
  makeDot(10, 10, "#die") 
  makeDot(75, 75, "#die") 
}
else if (randomNum === 3) {
  makeDot(10, 10, "#die") 
  makeDot(75, 75, "#die") 
  makeDot(42, 42, "#die") 
}
else if (randomNum === 4) {
  makeDot(10, 10, "#die") 
  makeDot(75, 75, "#die") 
  makeDot(42, 42, "#die")
  makeDot(75, 10, "#die")
}
else if (randomNum === 5) {
  makeDot(10, 10, "#die") 
  makeDot(75, 75, "#die") 
  makeDot(42, 42, "#die")
  makeDot(75, 10, "#die")
  makeDot(10, 75, "#die")
}
else {
  makeDot(10, 10, "#die") 
  makeDot(75, 75, "#die") 
  makeDot(42, 42, "#die")
  makeDot(75, 10, "#die")
  makeDot(10, 75, "#die")
  makeDot(42, 75, "#die")
}
}
});