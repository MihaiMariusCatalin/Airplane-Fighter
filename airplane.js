const game = document.getElementById("gameBoard");
const ctx = game.getContext("2d");
const unitSize = 25;
const backgroundColor = "black";
const planeColor = "blue";
const objColor = "white";
const THOUSAND = 1000;
const FRAME_TIME = THOUSAND / 60;
const MAX_OBJECTS = 10;

let plane = {
    x : (game.width - unitSize) / 2,
    y : game.height - (unitSize * 2),
    speed : 20,
    height : unitSize,
    width : unitSize
}
let objects = [];
let seconds = 0;
let gameOver = false;

setInterval(increaseScore, THOUSAND);
setInterval(gameLoop, FRAME_TIME);
window.addEventListener("keydown", movePlane);
window.onload = function () {
    generateObjects();
}

function gameLoop() {
    if (gameOver) {
        document.getElementById("gameScore").innerText = seconds;
        return;
    }
    ctx.clearRect(0, 0, game.height, game.width);
    drawPlane();
    drawObj();
    updateObjects();
    checkCollision();
}

function increaseScore() {
    if (gameOver) {
        return;
    }
    ++seconds;
}

function drawPlane() {
    ctx.fillStyle = planeColor;
    ctx.fillRect(plane.x, plane.y, plane.height, plane.width);
}

function drawObj() {
    for (let obj of objects) {
        ctx.fillStyle = objColor;
        ctx.fillRect(obj.x, obj.y, obj.height, obj.width);
    }
}

function movePlane(e) {
    if(e.code == "ArrowRight" && plane.x < game.width - unitSize) {
        plane.x += plane.speed;
    }
    if (e.code == "ArrowLeft" && plane.x > 0) {
        plane.x -= plane.speed;
    }
}

function generateObjects() {
    if (gameOver) {
        return;
    } else {    
        for (let i = 0; i < MAX_OBJECTS; ++i) {
            let obj = {
                x : Math.floor(Math.random() * game.width + unitSize),
                y : 0,
                speed : Math.floor(Math.random() * 3 + 1),
                height : unitSize,
                width : unitSize
            }
            objects.push(obj);
        }
    }
}

function updateObjects() {
    for (let i = 0; i < MAX_OBJECTS; ++i) {
        if (objects[i].y < game.height) {
            objects[i].y += objects[i].speed;
        } else {
            objects[i].x = Math.floor(Math.random() * game.width + unitSize);
            objects[i].y = 0;
        }
    }
}

function checkCollision() {
    for (let obj of objects) {
        if (
            obj.x < plane.x + plane.width &&
            obj.x + obj.width > plane.x &&
            obj.y < plane.y + plane.height &&
            obj.y + obj.height > plane.y) {
            gameOver = true;
        }
    }
}

function resetGame() {
    gameOver = false;
    document.getElementById("gameScore").innerHTML = "";
    objects = [];
    generateObjects();
}
