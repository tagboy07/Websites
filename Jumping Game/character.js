var context;
var images = {};
var totalResources = 6;
var numResourcesLoaded = 0;
var fps = 30;
var breathInc = 0.185;
var breathDir = 1;
var breathAmt = 0;
var breathMax = 4;
var breathInterval = setInterval(updateBreath, 1000 / fps);
var ballInc = 30;
var ballDir = 1;
var ballAmt = 0;
var ballInterval = setInterval(updateBall, 1000 / fps);
var jumping = false;
var level = 1;
var currentLevel = "Level:" + " " + level;
var currentLevelInterval = setInterval(updateLevel, 1000 / fps);
var lives = 3;
var currentLives = "Lives:" + " " + lives;
var currentLivesInterval = setInterval(updateLives, 1000 / fps);
var loseInterval = setInterval(lose, 1000 / fps);
var increaseAgain = true;
var getFasterInterval = setInterval(getFaster, 1000 / fps);
var HIGHSCORE = 1;
var currentHighscore = "Highscore:" + " " + HIGHSCORE;
var highscoreInterval = setInterval(displayHighscore, 1000 / fps);
var drawHit = false;


function prepareCanvas(canvasDiv, canvasWidth, canvasHeight)
{
	// Create the canvas (Neccessary for IE because it doesn't know what a canvas element is)
	canvas = document.createElement('canvas');
	canvas.setAttribute('width', canvasWidth);
	canvas.setAttribute('height', canvasHeight);
	canvas.setAttribute('id', 'canvas');
	canvasDiv.appendChild(canvas);
	
	if(typeof G_vmlCanvasManager != 'undefined') {
		canvas = G_vmlCanvasManager.initElement(canvas);
	}
	context = canvas.getContext("2d"); // Grab the 2d canvas context
	// Note: The above code is a workaround for IE 8and lower. Otherwise we could have used:
	//     context = document.getElementById('canvas').getContext("2d");
	
loadImage("rightArmSmall");
loadImage("rightArmSmallBlue");
loadImage("rightFootSmall");
loadImage("rightFootSmallBlue");
loadImage("leftFootSmall");
loadImage("leftFootSmallBlue");
loadImage("bodySmall");
loadImage("bodySmallBlue");
loadImage("leftArmSmall");
loadImage("eyesSmall");
loadImage("ball");
loadImage("hit");
}

function loadImage(name){

    images[name] = new Image();
    images[name].onload = function(){
        resourceLoaded();
    }
    images[name].src = "images/" + name + ".png";
}

function resourceLoaded() {

  numResourcesLoaded += 1;
  if(numResourcesLoaded === totalResources) {
    setInterval(redraw, 5);
  }
}



function redraw() {
    
    
    var jumpHeight = 150;
              
    canvas.width = canvas.width; // clears the canvas 
      
    if(jumping){
        context.drawImage(images["rightArmSmall"], 230, 326 - breathAmt - jumpHeight);
    }else{
        context.drawImage(images["rightArmSmall"], 230, 326 - breathAmt);
    }
        
    if(jumping){
        context.drawImage(images["rightFootSmall"], 138.75, 407.5 - jumpHeight);
    }else{
        context.drawImage(images["rightFootSmall"], 138.75, 407.5);   
    }
            
    if(jumping){
        context.drawImage(images["leftFootSmall"], 72.5, 420 - jumpHeight);  
    }else{
        context.drawImage(images["leftFootSmall"], 72.5, 420);
    }
        
    if(jumping){    
        context.drawImage(images["bodySmall"], 0, 200 - jumpHeight);
    }else{
        context.drawImage(images["bodySmall"], 0, 200);
    }
        
    if(jumping){
        context.drawImage(images["leftArmSmall"], 100, 335 - breathAmt - jumpHeight);
    }else{
        context.drawImage(images["leftArmSmall"], 100, 335 - breathAmt);
    }
        
    if(jumping){
        context.drawImage(images["eyesSmall"], 136.25, 205 - breathAmt - jumpHeight);
    }else{
        context.drawImage(images["eyesSmall"], 136.25, 205 - breathAmt);
    }
    
    if(drawHit == true && jumping){
        context.drawImage(images["hit"], -28, 178 - jumpHeight);
        setTimeout(undrawHit, 50);
    }else if(drawHit == true){
        context.drawImage(images["hit"], -28, 178);
        setTimeout(undrawHit, 50);
    }else if(drawHit == false){
        context.drawImage(images["hit"], 20000, 20000);    
    }
    
    context.drawImage(images["ball"], 800 - ballAmt, 360);
    
}

function updateBreath() { 
				
    if (breathDir === 1) {  // breath in
        breathAmt -= breathInc;
        if (breathAmt < -breathMax) {
            breathDir = -1;
        }
    }else{  // breath out
	   breathAmt += breathInc;
	   if(breathAmt > breathMax) {
           breathDir = 1;
	   }
    }
}


alert("Would you like to start the game?");

var color = prompt("What color would you like to be? Purple or Blue?").toLowerCase();

if(color == "blue"){
    var body = "bodySmallBlue";
    var rightArm = "rightArmSmallBlue";
    var leftFoot = "leftFootSmallBlue";
    var rightFoot = "rightFootSmallBlue";
}else{
    var body = "bodySmall";
    var rightArm = "rightArmSmall";
    var leftFoot = "leftFootSmall";
    var rightFoot = "rightFootSmall";
}

function updateBall() { 
				
    if (ballDir === 1) {  // ball in
        ballAmt += ballInc;
        if (ballAmt > 900) {
            ballAmt = 0;
            level += 1;
            
            if(level != 11){
                currentLevel = "Level:" + " " + level;
            }
            
            if(level > HIGHSCORE){
                HIGHSCORE = level;    
            }
            currentHighscore = "Highscore:" + " " + HIGHSCORE;
            
        }
        else if(ballAmt > 570 && ballAmt < 900 && jumping == false){
            ballAmt = 0;
            lives -= 1;
            currentLives = "Lives:" + " " + lives;
            drawHit = true;
        }
    }
}

function getFaster(){
    if(level % 10 == 0 && increaseAgain == true){
        increaseAgain = false;
        ballInc += 5;
    }
    if(level % 10 == 1){
        increaseAgain = true;    
    }
}
function lose(){
    if(lives == 0){
        land();
        var playAgain = confirm("You Jumped The Ball" + " " + level + " " + "Times \n \n Would you like to play again?");
        
        if(playAgain == true){
            ballInc = 30;

            if(level > HIGHSCORE){
                HIGHSCORE = level;
            }
            currentHighscore = "Highscore:" + " " + HIGHSCORE;
            level = 1;
            currentLevel = "Level:" + " " + 1;
            lives = 3;
            currentLives = "Lives:" + " " + lives;
            jumpAgain = true;
            undrawHit();
        }else if(playAgain == false){
            lives = 2;
            clearInterval(ballInterval);   
        }
        
    }
}

function displayHighscore(){
    var pageHighscore = document.getElementById("highscore").value;
    if(HIGHSCORE > pageHighscore){
        document.getElementById("highscore").innerHTML = HIGHSCORE;
    }
    document.getElementById("score").value = HIGHSCORE;
}
function updateLevel(){
    document.getElementById("level").innerHTML = currentLevel;
}

function updateLives(){
    document.getElementById("lives").innerHTML = currentLives;
}


function jump() {
	
    if(!jumping){
        setTimeout(land, 500);
        jumping = true;
  }
}

function land() {	
    jumping = false;
}

function restart(){
    
}

function undrawHit(){
    drawHit = false;
}








