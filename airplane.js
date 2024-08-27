const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const unitSize = 25;
const backgroundColor = "black";
const planeColor = "lightblue";
const objectColor = "white";
let gameOver = false;
let objects = [];

let plane = {
    x : gameHeight / 2 - unitSize,
    y : gameWidth - unitSize * 2,
    width : unitSize,
    height : unitSize
}

window.onload = function() {
    drawPlane();
    document.addEventListener("keydown", movePlane);
    generateObjects();
    moveObjects();
}

function drawPlane() {
    ctx.fillStyle = planeColor;
    ctx.fillRect(plane.x, plane.y, plane.height, plane.width);
}

function movePlane(e) {
    if (e.code == "ArrowLeft" && plane.x > 0) {
        plane.x -= unitSize;
    } else if (e.code == "ArrowRight" && plane.x < gameHeight - unitSize) {
        plane.x += unitSize;
    }
    ctx.clearRect(0, 0, gameHeight, gameWidth);
    drawPlane();
    drawObjects();
}

function generateObjects() {
    for (let i = 0; i < 5; ++i) {
        let obj = {
            x : Math.floor(Math.random() * gameWidth) - unitSize,
            y : 0,
            width : unitSize,
            height : unitSize
        };
        objects.push(obj);
    }
}

function moveObjects() {
    for(let obj of objects) {
        while (obj.y <= 300) {
            obj.y += 1;
            ctx.clearRect(0, 0, gameHeight, gameWidth);
            drawPlane();
            drawObjects();
        }
    }
}
function drawObjects() {
    for(let obj of objects) {
        ctx.fillStyle = objectColor;
        ctx.fillRect(obj.x, obj.y, obj.height, obj.width);
    }
}
