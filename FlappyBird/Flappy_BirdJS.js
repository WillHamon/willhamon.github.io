var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.font = "40px Arial";
ctx.textAlign = "center";
ctx.fillStyle = "black";
var framerate = 1/160;
var framedelay = framerate * 1000;
var birdW = 30;
var bird = {x: (ctx.canvas.width * 0.5) - (birdW * 0.5), y: (ctx.canvas.height * 0.5) - (birdW * 0.5) - 50, w: birdW, h: birdW, r: birdW * 1/2, Yvelo: 0, mass: 5};
var PipeOpeningSize = 130;
var C = 0.47;
var A;
var G = 9.81;
var p = 1.22;
var keys = [];
var keyCode = {space: 32};
var first_press = true;
var wall1 = {startY: 0, endY: (Math.random() * (ctx.canvas.height - 160 - PipeOpeningSize - 74)) + 80, x: 400, w: 69, h: 396.5};
var wall2 = {startY: 0, endY: (Math.random() * (ctx.canvas.height - 160 - PipeOpeningSize - 74)) + 80, x: 560, w: 69, h: 396.5};
var G1 = 0;
var G2 = ctx.canvas.width;
var start = true;
var score = 0;
var FlapStrength = -4;
var HighScore = 0;
var birdIMG = document.getElementById("bird");
var pipe = document.getElementById("pipe");
var UPpipe = document.getElementById("UPpipe");
var sky = document.getElementById("sky");
var ground = document.getElementById("ground");
var midpointX;
var midpointY;
var speed = -1;
var FLYspeed = -0.35;
var flyY = (ctx.canvas.height * 0.5) - (bird.w * 0.5) - 50;
var firstY = flyY;
var end = function(){
    score = 0;
    start = true;
    wall1.x = ctx.canvas.width + Math.floor(Math.random() * 150);
    wall1.endY = (Math.random() * (ctx.canvas.height - 160 - PipeOpeningSize - 74)) + 80;
    wall2.x = ctx.canvas.width + Math.floor(Math.random() * 150);
    wall2.endY = (Math.random() * (ctx.canvas.height - 160 - PipeOpeningSize - 74)) + 80;
    bird.y = flyY;
};

document.addEventListener("keydown", function(evt) {keys[evt.keyCode] = true;});
document.addEventListener("keyup", function(evt) {keys[evt.keyCode] = false;});
canvas.addEventListener("click", function() {bird.Yvelo = FlapStrength; start = false;});
var loop = function() {
    A = Math.PI * bird.r * bird.r / (10000);
    
    //Bird Img Midpoint
    midpointX = bird.x + (bird.w * 0.5);
    midpointY = bird.y + (bird.h * 0.5);
    
    //Check for Flap
    if(keys[keyCode.space] && first_press){
        bird.Yvelo = FlapStrength;
        start = false;
        first_press = false;
    }
    if(!(keys[keyCode.space])){
       first_press = true;
    }
    
    //Calculate Velocity
    var Fy = -0.5 * C * A * p * bird.Yvelo * bird.Yvelo * bird.Yvelo / Math.abs(bird.Yvelo);
    Fy = (isNaN(Fy) ? 0 : Fy);
    var ay = G + (Fy / bird.mass);
    bird.Yvelo += ay * framerate;
    
    //Add Velocity
    bird.y += bird.Yvelo * framerate * 100;
    
    //Move Wall
    if(!(start)){
        wall1.x += speed;
        wall2.x += speed;
    }
    
    //Move BackGround
    G1 += speed;
    G2 += speed;
    
    //Reset Ground
    if(G1 <= 0 - ctx.canvas.width){
       G1 = ctx.canvas.width;
    }
    if(G2 <= 0 - ctx.canvas.width){
       G2 = ctx.canvas.width;
    }
    
    //Reset Walls
    if(wall1.x <= 0 && wall2.x <= 160){
        wall1.x = ctx.canvas.width + Math.floor(Math.random() * 150) + 50;
        wall1.endY = (Math.random() * (ctx.canvas.height - 160 - PipeOpeningSize - 74) + 80);
    }
    if(wall2.x <= 0 && wall1.x <= 160){
        wall2.x = ctx.canvas.width + Math.floor(Math.random() * 150) + 50;
        wall2.endY = (Math.random() * (ctx.canvas.height - 160 - PipeOpeningSize - 74) + 80);
    }
    
    //Points
    if(wall1.x + Math.floor(wall1.w * 0.5) == midpointX || wall2.x + Math.floor(wall2.w * 0.5) == midpointX){
       score += 1;
    }
    
    //HighScore
    if(score > HighScore){
        HighScore = score;
    }
    
    document.getElementById('highscore').innerHTML = HighScore;
    
    //End Game
    if(bird.y >= ctx.canvas.height - bird.h - (111 / 1.5)){
       end();
    }
    if(midpointX + bird.r >= wall1.x && midpointX - bird.r <= wall1.x + wall1.w && midpointY - bird.r <= wall1.endY){
       end();
    };
    if(midpointX + bird.r >= wall1.x && midpointX - bird.r <= wall1.x + wall1.w && midpointY + bird.r >= wall1.endY + PipeOpeningSize){
        end();
    }
    if(midpointX + bird.r >= wall2.x && midpointX - bird.r <= wall2.x + wall2.w && midpointY - bird.r <= wall2.endY){
       end();
    };
    if(midpointX + bird.r >= wall2.x && midpointX - bird.r <= wall2.x + wall2.w && midpointY + bird.r >= wall2.endY + PipeOpeningSize){
        end();
    }
    
    //Start
    if(start){
        midpointY = ctx.canvas.height * 0.5;
        wall1.x = 400;
        wall2.x = 600;
        bird.x = (ctx.canvas.width * 0.5) - (birdW * 0.5);
        if(bird.y - (bird.h * 0.5) >= firstY + 20){
           FLYspeed = -0.35;
        }
        if(bird.y - (bird.h * 0.5) <= firstY - 20){
           FLYspeed = 0.35;
        }
        flyY += FLYspeed;
        bird.y = flyY;
    }
    
    //Clear Canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    //Draw BackGround
    ctx.beginPath();
    ctx.drawImage(sky, 0, 0, 499 / 1.5, 636 / 1.5);
    ctx.closePath();
    
    //Draw Wall 1
    ctx.beginPath();
    ctx.drawImage(UPpipe, wall1.x, wall1.endY - wall1.h, wall1.w, wall1.h);
    ctx.drawImage(pipe, wall1.x, wall1.endY + PipeOpeningSize, wall1.w, wall1.h);
    ctx.closePath();
    
    //Draw Wall 2
    ctx.beginPath();
    ctx.drawImage(UPpipe, wall2.x, wall2.endY - wall2.h, wall2.w, wall2.h);
    ctx.drawImage(pipe, wall2.x, wall2.endY + PipeOpeningSize, wall2.w, wall2.h);
    ctx.closePath();
    
    //Draw Bird
    ctx.beginPath();
    ctx.drawImage(birdIMG, bird.x, bird.y, bird.w, bird.w);
    ctx.closePath();
    
    //Draw Ground
    ctx.beginPath();
    ctx.drawImage(ground, G1, ctx.canvas.height - (111 / 1.5), 499 / 1.5, 111 / 1.5);
    ctx.drawImage(ground, G2, ctx.canvas.height - (111 / 1.5), 499 / 1.5, 111 / 1.5);
    ctx.closePath();
    
    //Draw Score
    ctx.beginPath();
    ctx.fillText(score, ctx.canvas.width * 0.5, 80);
    ctx.closePath();
};
setInterval(loop, framedelay);