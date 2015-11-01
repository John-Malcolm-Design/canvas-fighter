// Socket.io chat event handlers    
var socket = io();
$('form').submit(function() {
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
});

socket.on('chat message', function(msg) {
  $('#messages').append($('<li>').text(msg));
});

// Socket.io game event handlers    
socket.on('new game', function(msg, x, y) {

  var bgGame = document.getElementById("bg-game");
  ctx.drawImage(bgGame, 0, 0);

  var image = document.getElementById(msg);
  ctx.drawImage(image, x, y)
});

// Gets canvas element in DOM
var canvas = document.getElementById("canvas");

  var xGlobal, yGlobal;
    var msgHere;



// Click event handler for buttons in the game
canvas.addEventListener("mousedown", getPosition, false);

// Specifies context for canvas element and names 2d context as "ctx"
var ctx = canvas.getContext("2d");

// Variables for controling game screen and player selection
var currentScreen = 0;
var currentPlayerSelected = 0;

// Welcome screen image elements
var bg = document.getElementById("bg-intro");
var cfTitle = document.getElementById("title-intro");
var playTitle = document.getElementById("play-intro");
ctx.drawImage(bg, 0, 0);
ctx.drawImage(cfTitle, 250, 400);
ctx.drawImage(playTitle, 160, 40);

// Function used for trakcing mouse co-ordinates for click events
function getPosition(event) {
  var x = event.x;
  var y = event.y;

  var canvas = document.getElementById("canvas");

  x -= canvas.offsetLeft;
  y -= canvas.offsetTop;

  switch (currentScreen) {
    case 0:
      currentScreen = 1;
      playerSelectLoadScreen(x, y);
      break;

    case 1:
      playerSelectClickHandlers(x, y);
      break;

  }
}

// Function handles loading the "SELECT A PLAYER" screen
function playerSelectLoadScreen(x, y) {
  if ((y < 505 && y > 415) && (x < 506 && x > 274)) {
    ctx.rect(0, 0, 800, 600);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();

    var selectPlayerImg = document.getElementById("select-player");
    var jumpingJimboTxt = document.getElementById("jumping-jimbo");
    var jumpingJimboImg = document.getElementById("jumping-jimbo-img");
    var leftArrow = document.getElementById("left-arrow");
    var rightArrow = document.getElementById("right-arrow");

    ctx.drawImage(selectPlayerImg, 100, 60);
    ctx.drawImage(jumpingJimboTxt, 250, 500);
    ctx.drawImage(leftArrow, 150, 270);
    ctx.drawImage(rightArrow, 580, 270);

    ctx.beginPath();
    ctx.rect(270, 150, 250, 300);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();

    ctx.drawImage(jumpingJimboImg, 290, 200);
    currentPlayerSelected = 0;
  }
}

// Function handles the selection of a plater on the player seletion screen
function playerSelectClickHandlers(x, y) {
  if ((x < 221 && x > 128) && (y < 312 && y > 277)) {
    arrowClickPlayerSelect();

  } else if ((x < 644 && x > 583) && (y < 363 && y > 276)) {
    arrowClickPlayerSelect();
  } else if ((x < 521 && x > 269) && (y < 450 && y > 150)) {
    currentScreen = 2;
    newGame(currentPlayerSelected);
  }
}

// Function handles arrow clicks on the player seletion screen
function arrowClickPlayerSelect() {
  ctx.beginPath();
  ctx.rect(270, 150, 250, 300);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
  if (currentPlayerSelected == 0) {
    currentPlayerSelected = 1;

    var fistycuffsMcGeeTxt = document.getElementById("fistyCuffsMcGeeTxt");

    ctx.beginPath();
    ctx.rect(250, 500, 362, 42);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();

    ctx.drawImage(fistycuffsMcGeeTxt, 250, 500);

    var fistyCuffsMcGeeImg = document.getElementById("fistyCuffsMcGeeImg");
    ctx.drawImage(fistyCuffsMcGeeImg, 290, 200);

  } else if (currentPlayerSelected == 1) {
    currentPlayerSelected = 0;

    ctx.beginPath();
    ctx.rect(150, 500, 462, 36);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
    var jumpingJimboTxt = document.getElementById("jumping-jimbo");

    ctx.drawImage(jumpingJimboTxt, 250, 500);

    var jumpingJimboImg = document.getElementById("jumping-jimbo-img");

    ctx.drawImage(jumpingJimboImg, 290, 200);
  }
}


// Main Game Function
function newGame(fighter) {

  if (fighter == 0) {
    var fighterImg = document.getElementById("jumping-jimbo-img");
      msgHere = "jumping-jimbo-img";
    xGlobal = 500;
    yGlobal = 300;
      repeatme();


  } else if (fighter == 1) {
    var fighterImg = document.getElementById("fistyCuffsMcGeeImg");
    msgHere = "fistyCuffsMcGeeImg";
    xGlobal = 500;
    yGlobal = 300;
      repeatme();

  }



}

    // Add an event listener to the keypress event.
  window.addEventListener("keydown", function(event) { 

    // Just log the event to the console.
    console.log(event);

    switch(event.keyCode) {
      case 39:
          xGlobal = xGlobal + 10;
          console.log('x+');
        break;
      case 37:
          xGlobal = xGlobal - 10;
          console.log('x-');
        break;
    }


  });

function repeatme(){
  socket.emit('new game', msgHere, xGlobal, yGlobal);
  window.requestAnimationFrame(repeatme);

}










