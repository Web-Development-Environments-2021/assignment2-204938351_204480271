function setKey(key, e) {
    //TODO: fix
    let code = e.keyCode;
    console.log(code)
    // if (47<code && code<106){
    if (code!=9 && code!=13){
        console.log(key, code)
        if (key == "left") {
            leftKey = code;
            document.getElementById("keyLeftShow").innerHTML = code;
        }
        if (key == "up") {
            upKey = code;
            document.getElementById("keyUpShow").innerHTML = code;
        }
        if (key == "right") {
            rightKey = code;
            document.getElementById("keyRightShow").innerHTML = code;
        }
        if (key == "down") {
            downKey = code;
            document.getElementById("keyDownShow").innerHTML = code;
        }
    }
}

function setBallsNum(num) {
    food_remain = num;
    console.log("settings food remain: " + food_remain)
    numOf5PointsBall = Math.floor(0.6*num);
    numOf15PointsBall = Math.floor(0.3*num);
    numOf25PointsBall = Math.floor(0.1*num);
    ballPoints = [numOf5PointsBall, numOf15PointsBall, numOf25PointsBall]
    document.getElementById("numOfBallsShow").innerHTML = food_remain;
    console.log("settings ball points: " + ballPoints)
}

function setballsColor(points, color) {
    console.log(points, color);
    switch (points) {
        case 5:
            color5PointsBall = color;
            document.getElementById("ball5PointsShow").value = color;
        case 15:
            color15PointsBall = color;
            document.getElementById("ball15PointsShow").value = color;
        case 25:
            color25PointsBall = color;
            document.getElementById("ball25PointsShow").value = color;
    }
}

function setgameTime(sec) {
    gameTime = sec;
    document.getElementById("timeShow").innerHTML = gameTime;
}

function setNumOfMonsters(num) {
    numOfMonsters = num;
    document.getElementById("numOfMonstersShow").innerHTML = numOfMonsters;
    // console.log("settings num: " + numOfMonsters);
}

function setRandomSettings() {
    const ballsNum = Math.floor(Math.random()*41)+50;
    const randColor5 = setRandomColor();
    const randColor15 = setRandomColor();
    const randColor25 = setRandomColor();
    const randGameTime = Math.floor(Math.random()*241)+60;
    const randMonstersNum = Math.floor(Math.random()*4)+1
    setBallsNum(ballsNum);
    setballsColor(5, randColor5);
    setballsColor(15, randColor15);
    setballsColor(25, randColor25);
    setgameTime(randGameTime);
    setNumOfMonsters(randMonstersNum);
    play();
}

function setRandomColor() {
    let letters = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
    let hashtag = '#';
    let randomColor = hashtag;
    for (let i = 0; i < 6; i++) {
        randomColor += letters[Math.floor(Math.random() * 16)];
    }
    return randomColor; 
}

function play() {
    // if (newGame == true) {
    //     context = canvas.getContext("2d");
    //     Start();
    //     show(settings, app);
    //     // newGame = false;
    // }
    // else {
        $(document).ready(function() {
            context = canvas.getContext("2d");
            Start();
        });
        show(settings, app);
    // }
}
