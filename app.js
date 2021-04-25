var context;
var shape = new Object();
var board;
var life;
var score;
var pac_color;
var start_time;
var time_elapsed;
var gameTime = 60;
var interval;
var food_remain=50;
var numOf5PointsBall=30;
var numOf15PointsBall=15;
var numOf25PointsBall=5;
var ballPoints = [numOf5PointsBall, numOf15PointsBall, numOf25PointsBall]
var color5PointsBall = "#e66465";
var color15PointsBall = "#e63468";
var color25PointsBall = "#f6b73c";
var lastPressed=8; //pacman always looks to the right 
var size = 15;
var pacman_remain = 1;
var medicine_remain = 1;
var cnt = 100;


// $(document).ready(function() {
// 	context = canvas.getContext("2d");
// 	Start();
// });

function Start() {
	board = new Array();
	score = 0;
	life = 5;
	pac_color = "yellow";
	// food_remain = setBallsNum($("#setBallsNum").val());
	console.log(ballPoints); //TODO: delete
	start_time = new Date();
	console.log("app food remain: " + food_remain)
	for (var i = 0; i < size; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < size; j++) {
			if (i == 0 && j == 0) {
				board[i][j] = 9
			}
			else if (
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
					var randomBall = Math.floor(Math.random()*3)+1
					if (ballPoints[randomBall-1] > 0) {
						console.log("random randomball " + randomBall)
						board[i][j] = randomBall;
						ballPoints[randomBall-1] = ballPoints[randomBall-1] - 1;
					}
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					// console.log('second: rand=' + randomNum + '<' + (1.0 * (pacman_remain + food_remain)) / cnt);
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					console.log(shape.i, shape.j)
					board[i][j] = 5;
				} else {
					// console.log('third:' + randomNum);
					board[i][j] = 0;
				}
				cnt--;
			}
		}
		console.log(board);
	}
	console.log("after init ball points: " + ballPoints)
	console.log(board);
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
		console.log("first while ball points: " + ballPoints)

	}
	while (ballPoints[1] > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 2;
		ballPoints[1] = ballPoints[1]-1;
		console.log("second while ball points: " + ballPoints)
	}
	while (ballPoints[2] > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 3;
		ballPoints[2] = ballPoints[2]-1;
		console.log("third while ball points: " + ballPoints)
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
	interval = setInterval(UpdatePosition, 200);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * (size-1) + 1);
	var j = Math.floor(Math.random() * (size-1) + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * (size-1) + 1);
		j = Math.floor(Math.random() * (size-1) + 1);
		console.log("help")
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
	lblTime.value = time_elapsed;
	console.log(gameTime)
	for (var i = 0; i < size; i++) {
		for (var j = 0; j < size; j++) {
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
			 else if (board[i][j] == 1) {     //blue ball
				// let img1 = new Image(3,3);
				// img1.src = "pics/";
				// context.drawImage(img1, i*60, j*60);
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = color5PointsBall; //color
				context.fill();
			} 
			else if (board[i][j] == 2) {    //green ball
				context.beginPath(); 
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = color15PointsBall; //color
				context.fill();
			} 
			else if (board[i][j] == 3) {    //red ball
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = color25PointsBall; //color
				context.fill();
			} 
			else if (board[i][j] == 4) {    //wall
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}
			else if (board[i][j] == 9) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "green"; //color
				context.fill();
			}
			else if (board[i][j] == 10) {    //strawberry
				let img1 = new Image(3,3);
				img1.src = "pics/strawberry.png";
				context.drawImage(img1, i*60, j*60);
			}
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
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
	if (board[shape.i][shape.j] == 1) {   //TODO: Make sure the score addition matches the color of the ball
		score+= 5;
	}
	else if (board[shape.i][shape.j] == 2) {
		score+= 15;
	}
	else if (board[shape.i][shape.j] == 3) {
		score+= 25;
	}
	else if (board[shape.i][shape.j] == 9) {
		life += 1;
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 9;
	}
	board[shape.i][shape.j] = lastPressed;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 2000 && time_elapsed <= 1000) {  //TODO: what?
		pac_color = "green";
	}
	if (score == 500) { //TODO: where?
		lblScore.value = score;
		lblTime.value = time_elapsed
		window.clearInterval(interval);
		window.alert("Game completed");
	}
	else if (gameTime <= time_elapsed) {
		lblTime.value = time_elapsed
		lblScore.value = score;
		window.clearInterval(interval);
		if (score < 100) {
			alert("You are better than " + score + " points!")
		} else {
			alert("Winner")
		}
	// } else if (gameTime <= time_elapsed && score < 100) {
	// 	lblTime.value = time_elapsed
	// 	lblScore.value = score;
	// 	window.clearInterval(interval);
	// 	alert("You are better than " + score + " points!")
	} else {
		Draw();
	}
}
