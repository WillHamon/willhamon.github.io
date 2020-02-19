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


//mobile check and setting inputs
window.mobilecheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};
if(window.mobilecheck())
{
    document.addEventListener("touchstart", function(evt) {keys[evt.keyCode] = true;});
    document.addEventListener("touchend", function(evt) {keys[evt.keyCode] = false;});
}
else
{
    document.addEventListener("keydown", function(evt) {keys[evt.keyCode] = true;});
    document.addEventListener("keyup", function(evt) {keys[evt.keyCode] = false;});
}

//add fullscreen event
document.getElementById("fullscreen").addEventListener("click", function() {canvas.requestFullscreen();});

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