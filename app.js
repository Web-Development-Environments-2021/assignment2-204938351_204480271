var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var food_remain=50;
var numOf5PointsBall=30;
var numOf15PointsBall=15;
var numOf25PointsBall=5;
var ballPoints = [numOf5PointsBall, numOf15PointsBall, numOf25PointsBall]
var lastPressed=8; //pacman always looks to the right 

// $(document).ready(function() {
// 	context = canvas.getContext("2d");
// 	Start();
// });

function Start() {
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	// food_remain = setBallsNum($("#setBallsNum").val());
	console.log(food_remain); //TODO: delete
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					// console.log('first: rand=' + randomNum + '<= ' + (1.0 * food_remain) / cnt)
					food_remain--;
					// console.log(food_remain);
					var randomBall = Math.floor(Math.random()*3)+2
					board[i][j] = randomBall;
					ballPoints[randomBall-1] --;
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					// console.log('second: rand=' + randomNum + '<' + (1.0 * (pacman_remain + food_remain)) / cnt);
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					// console.log(pacman_remain)
					board[i][j] = 5;
				} else {
					console.log('third:' + randomNum);
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	// while (food_remain > 0) {
	// 	var emptyCell = findRandomEmptyCell(board);
	// 	board[emptyCell[0]][emptyCell[1]] = 1212;
	// 	food_remain--;
	// }
	
	while (ballPoints[0] > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		ballPoints[0]--;
	}
	while (ballPoints[1] > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 2;
		ballPoints[1]--;
	}
	while (ballPoints[2] > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 3;
		ballPoints[2]--;
	}

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
	interval = setInterval(UpdatePosition, 100);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
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
	lblTime.value = time_elapsed;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 5) {    //up
				context.beginPath();
				context.arc(center.x, center.y, 30, 1.65 * Math.PI, 1.35 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x - 15, center.y - 5 , 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			// } else if (board[i][j] == 1212) {
			// 	context.beginPath();
			// 	context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
			// 	context.fillStyle = "black"; //color
			// 	context.fill();
			}
			else if (board[i][j] == 6) {     //down
				context.beginPath();
				context.arc(center.x, center.y, 30, 0.35 * Math.PI, 0.65 * Math.PI,true); // half circle
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
				context.arc(center.x, center.y, 30, 0.85 * Math.PI, 1.15 * Math.PI,true); // half circle
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
				context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			}
			 else if (board[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "blue"; //color
				context.fill();
			} 
			else if (board[i][j] == 2) {
				context.beginPath(); 
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "green"; //color
				context.fill();
			} 
			else if (board[i][j] == 3) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "red"; //color
				context.fill();


			} 
			else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 5) {   //up
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
		lastPressed = 5;
	}
	if (x == 6) {   //down
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
		lastPressed = 6;
	}
	if (x == 7) {    //left
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
		lastPressed = 7;
	}
	if (x == 8) {    //right
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
			
		}
		lastPressed = 8;
	}
	if (board[shape.i][shape.j] == 1) {   //TODO: Make sure the score addition matches the color of the ball
		score+= 5;
	}
	if (board[shape.i][shape.j] == 2) {
		score+= 15;
	}
	if (board[shape.i][shape.j] == 3) {
		score+= 25;
	}
	board[shape.i][shape.j] = lastPressed;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 2000 && time_elapsed <= 1000) {
		pac_color = "green";
	}
	if (score == 500) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw();
	}
}
