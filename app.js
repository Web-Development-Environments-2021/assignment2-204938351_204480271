var context;
var shape = new Object();
var monster1 = new Object();
var monster2 = new Object();
var monster3 = new Object();
var monster4 = new Object();
var monsters = new Array();
var bonusStrawberryShape = new Object();
var board;
var life;
var score;
var pac_color;
var start_time;
var time_elapsed;
var timer_time;
var gameTime = 150;
var interval;
var intervalBonusStrawberry;
var intervalMonsters;
var food_remain=70;
var numOf5PointsBall=30;
var numOf15PointsBall=15;
var numOf25PointsBall=5;
var ballPoints = [numOf5PointsBall, numOf15PointsBall, numOf25PointsBall]
var color5PointsBall = "#FF5C00";
var color15PointsBall = "#FE99D6";
var color25PointsBall = "#77C3EC";
var lastPressed=8; //pacman always looks to the right 
var size = 13;
var pacman_remain = 1;
var medicine_remain = 1;
var cnt = 100;
var leftKey = 37;
var upKey = 38;
var rightKey = 39;
var downKey = 40;
var gameTime = 150;
var numOfMonsters = 1;
var themeSong = new Audio("theme.mp3");
// var newGame = false;




// $(document).ready(function() {
// 	context = canvas.getContext("2d");
// 	Start();
// });

function Start() {
	console.log("here");
	window.clearInterval(interval);
	window.clearInterval(intervalBonusStrawberry);
	window.clearInterval(intervalMonsters);
	// themeSong.play();
	board = new Array();
	score = 0;
	life = 5;
	pac_color = "yellow";
	// food_remain = setBallsNum($("#setBallsNum").val());
	start_time = new Date();
	for (var i = 0; i < size; i++) {
		board[i] = new Array();
		for (var j = 0; j < size; j++) {
			// strawberry
			if (i == Math.floor(size/2)&& j == Math.floor(size/2)) {
				board[Math.floor(size/2)][Math.floor(size/2)] = 0;
			// monsters
			} if (numOfMonsters >= 1 && i == 0 && j == 0){
				monster1.i = i;
				monster1.j = j;
				board[i][j] = 12;
			} else if (numOfMonsters > 1 && i == size-1 && j == size-1) {
				monster2.i = i;
				monster2.j = j;
				board[i][j] = 12;
			} else if (numOfMonsters > 2 && i == 0 && j == size-1) {
				monster3.i = i;
				monster3.j = j;
				board[i][j] = 12;
			} else if (numOfMonsters > 3 && i == size-1 && j == 0) {
				monster4.i = i;
				monster4.j = j;
				board[i][j] = 12;
			//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
			} else if ( 
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2) ||
				(i == 5 && j == 10) ||
				(i == 5 && j == 11) ||
				(i == 10 && j == 7) ||
				(i == 10 && j == 8) ||
				(i == 10 && j == 9)
			) {
				board[i][j] = 4;
			//balls and walls
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					// console.log('first: rand=' + randomNum + '<= ' + (1.0 * food_remain) / cnt)
					food_remain--;
					// console.log(food_remain);
					// var randomBall = Math.floor(Math.random()*3)+1
					// if (ballPoints[randomBall-1] > 0) {
					// 	console.log("random randomball " + randomBall)
					// 	board[i][j] = randomBall;
					// 	ballPoints[randomBall-1] = ballPoints[randomBall-1] - 1;
					// }
					var randomObject = Math.floor(Math.random()*3)+1
					if (randomObject == 4) {  // wall
						board[i][j] = randomObject;
					}
					else if (ballPoints[randomObject-1] > 0) {  // ball
						board[i][j] = randomObject;
						ballPoints[randomObject-1] = ballPoints[randomObject-1] - 1;
					}
				// pacman
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					// console.log('second: rand=' + randomNum + '<' + (1.0 * (pacman_remain + food_remain)) / cnt);
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 5;
				// empty cell
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	// console.log("monsters: " + numOfMonsters);
	// console.log("begining: " + monsters.length);
	monsters[0] = monster1;
	monster1.priorValue = 0;
		if (numOfMonsters > 1) {
			monsters[1] = monster2;
			monster2.priorValue = 0;
		}
		if (numOfMonsters > 2) {
			monsters[2] = monster3;
			monster3.priorValue = 0;
		}
		if (numOfMonsters > 3) {
			monsters[3] = monster4;
			monster4.priorValue = 0;
		}

	// console.log("end: " + monsters.length);
	
	// paint monster
	intervalMonsters = setInterval(updateMonster, 400);
	// monster1.priorValue = 0;
	// intervalMonsters = setInterval(updateMonster(), 400);
	// paint strawberry
	placeStrawberry();

	if (pacman_remain == 1) {  // paint pacman if it wasnt painted
		var emptyCell = findRandomEmptyCell(board);
		shape.i = emptyCell[0];
		shape.j = emptyCell[1];
		pacman_remain--;
		board[emptyCell[0]][emptyCell[1]] = 5;
	} 
	
	while (ballPoints[0] > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		ballPoints[0] = ballPoints[0]-1;

	}
	while (ballPoints[1] > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 2;
		ballPoints[1] = ballPoints[1]-1;
	}
	while (ballPoints[2] > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 3;
		ballPoints[2] = ballPoints[2]-1;
	}

	setTimeout(function(){
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 9;  // paint medicin
		}, 4000);

	setTimeout(function(){
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 11;  // paint clock
		}, 10000);

	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 200);
	
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * (size-1) + 1);
	var j = Math.floor(Math.random() * (size-1) + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * (size-1) + 1);
		j = Math.floor(Math.random() * (size-1) + 1);
		// console.log("help")
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[upKey]) {
		return 5;
	}
	if (keysDown[downKey]) {
		return 6;
	}
	if (keysDown[leftKey]) {
		return 7;
	}
	if (keysDown[rightKey]) {
		return 8;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblLife.value = life;
	lblTime.value = timer_time;
	for (var i = 0; i < size; i++) {
		for (var j = 0; j < size; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 5) {    //up
				context.beginPath();
				context.arc(center.x, center.y, 28, 1.65 * Math.PI, 1.35 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x - 15, center.y - 5 , 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			}
			else if (board[i][j] == 6) {     //down
				context.beginPath();
				context.arc(center.x, center.y, 28, 0.35 * Math.PI, 0.65 * Math.PI,true); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 15, center.y + 5, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			}
			else if (board[i][j] == 7) {    //left
				context.beginPath();
				context.arc(center.x, center.y, 28, 0.85 * Math.PI, 1.15 * Math.PI,true); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x - 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			}
			else if (board[i][j] == 8) {    //right
				context.beginPath();
				context.arc(center.x, center.y, 28, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			}
			 else if (board[i][j] == 1) {    //red ball 5 pints
				context.beginPath();
				context.arc(center.x, center.y, 9, 0, 2 * Math.PI); // circle
				context.fillStyle = color5PointsBall; //color
				context.fill();
			} 
			else if (board[i][j] == 2) {    //pink ball 15 pints
				context.beginPath(); 
				context.arc(center.x, center.y, 11, 0, 2 * Math.PI); // circle
				context.fillStyle = color15PointsBall; //color
				context.fill();
			} 
			else if (board[i][j] == 3) {    //blue ball 25 pints
				context.beginPath();
				context.arc(center.x, center.y, 13, 0, 2 * Math.PI); // circle
				context.fillStyle = color25PointsBall; //color
				context.fill();
			} 
			else if (board[i][j] == 4) {    //wall
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "rgb(0, 26, 255)"; //color
				context.fill();
			}
			else if (board[i][j] == 9) {   //medicin
				let medicinImg = new Image(3,3);
				medicinImg.src = "pics/heart.png";
				context.drawImage(medicinImg, i*60, j*60, 46, 46);
			}
			else if (board[i][j] == 10) {    //strawberry
				let strawberryImg = new Image(3,3);
				strawberryImg.src = "pics/strawberry.png";
				context.drawImage(strawberryImg, i*60, j*60, 46, 46);
			}
			else if (board[i][j] == 11) {    //clock
				let clockImg = new Image(3,3);
				clockImg.src = "pics/clock.png";
				context.drawImage(clockImg, i*60, j*60, 46, 46);
			}
			else if (board[i][j] == 12) {    //monster
				let monsterImg = new Image(3,3);
				monsterImg.src = "pics/monster.png";
				context.drawImage(monsterImg, i*60, j*60, 50, 62);
			}
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	// if(newGame == true) {
		// Draw();
	// }
	var x = GetKeyPressed();
	if (x == 5) {   //up
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j = shape.j - 1;
		}
		lastPressed = 5;
	}
	else if (x == 6) {   //down
		if (shape.j < size-1 && board[shape.i][shape.j + 1] != 4) {
			shape.j = shape.j + 1;
		}
		lastPressed = 6;
	}
	else if (x == 7) {    //left
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i = shape.i - 1;
		}
		lastPressed = 7;
	}
	else if (x == 8) {    //right
		if (shape.i < size-1 && board[shape.i + 1][shape.j] != 4) {
			shape.i = shape.i + 1;
		}
		lastPressed = 8;
	}
	if (board[shape.i][shape.j] == 1) {   //eating balls
		score+= 5;
	}
	else if (board[shape.i][shape.j] == 2) {
		score+= 15;
	}
	else if (board[shape.i][shape.j] == 3) {
		score+= 25;
	}
	else if (board[shape.i][shape.j] == 9) {   //eating medicin
		life++;
		setTimeout(function(){
			var emptyCell = findRandomEmptyCell(board);
			board[emptyCell[0]][emptyCell[1]] = 9;
			}, 8000);
	}
	else if (board[shape.i][shape.j] == 10) {   //eating Strawberry
		score+= 50;
		window.clearInterval(intervalBonusStrawberry);
		setTimeout(placeStrawberry, 4000);
	}
	else if (board[shape.i][shape.j] == 11) {    //eating clock
		gameTime += 10;
		setTimeout(function(){
			var emptyCell = findRandomEmptyCell(board);
			board[emptyCell[0]][emptyCell[1]] = 11;
			}, 10000);
	}
	else if (board[shape.i][shape.j] == 12) { // monster eats pacmen
		monsterEatsPacman();
	}

	board[shape.i][shape.j] = lastPressed;   // continue
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	timer_time = Math.floor(gameTime-time_elapsed);
	

	// pacman turns green 10 sec before game ends
	if (score >= 20 && timer_time <= 10) {
		pac_color = "green";
	}
	if (timer_time <= 0) {
		lblTime.value = 0
		lblScore.value = score;
		lblLife.value = life;
		themeSong.pause();
		window.clearInterval(interval);
		window.clearInterval(intervalBonusStrawberry);
		window.clearInterval(intervalMonsters);
		if (score < 100) {
			setTimeout(function() {alert("You are better than " + score + " points!")}, 300);
		} else {
			setTimeout(function() {alert("Winner!!!")}, 300);
		}
	// pacman is dead
	} if (life <= 0){
		lblTime.value = timer_time;
		lblScore.value = score;
		lblLife.value = life;
		themeSong.pause();
		window.clearInterval(interval);
		window.clearInterval(intervalBonusStrawberry);
		window.clearInterval(intervalMonsters);
		setTimeout(function() {alert("Loser!")}, 300);
	} else {
		Draw();
	}
}


function StartNewGame(){
	themeSong.pause();
	window.clearInterval(interval);
	window.clearInterval(intervalBonusStrawberry);
	window.clearInterval(intervalMonsters);
	reset();
	show(app, settings);
}


function reset() {
	shape = new Object();
	monster1 = new Object();
	monster2 = new Object();
	monster3 = new Object();
	monster4 = new Object();
	monsters = new Array();
	bonusStrawberryShape = new Object();
	// life = 5;
	// score = 0;
	gameTime = 150;
	food_remain=70;
	numOf5PointsBall=30;
	numOf15PointsBall=15;
	numOf25PointsBall=5;
	ballPoints = [numOf5PointsBall, numOf15PointsBall, numOf25PointsBall]
	color5PointsBall = "#e66465";
	color15PointsBall = "#e63468";
	color25PointsBall = "#f6b73c";
	lastPressed=8; //pacman always looks to the right 
	size = 13;
	pacman_remain = 1;
	medicine_remain = 1;
	cnt = 100;
	leftKey = 37;
	upKey = 38;
	rightKey = 39;
	downKey = 40;
	gameTime = 150;
	numOfMonsters = 1;
	themeSong = new Audio("theme.mp3");
}
