var leftKey = 37;
var upKey = 38;
var rightKey = 39;
var downKey = 40;
var numOfBalls = 70;
var color5PointsBall = "#e66465";
var color15PointsBall = "FF7B33";
var color25PointsBall = "#f6b73c"; 
var gameTime = 150;
var numOfMonsters = 1

function setKey(key, code) {
    console.log(key, code)
    switch (key) {
        case left:
            leftKey = code;
        case up:
            upKey = code;
        case right:
            rightKey = code;
        case down:
            downKey = code;
    }
}

function setBallsNum(num) {
    numOfBalls = num;
}

function setballsColor(points, color) {
    console.log(points, color);
    switch (points) {
        case 5:
            color5PointsBall = color;
        case 15:
            color15PointsBall = color;
        case 25:
            color25PointsBall = color;
    }
}

function setgameTime(sec) {
    gameTime = sec;
}

function setNumOfMonsters(num) {
    numOfMonsters = num;
}

function setRandomSettings() {

}
