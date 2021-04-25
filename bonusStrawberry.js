function placeStrawberry() {
	var emptyCell = findRandomEmptyCell(board);
	bonusStrawberryShape.i = emptyCell[0];
	bonusStrawberryShape.j = emptyCell[1];
	board[emptyCell[0]][emptyCell[1]] = 10;
    bonusStrawberryShape.priorValue = 0;
    intervalBonusStrawberry = setInterval(UpdateBonusStrawberry, 400);
}

function UpdateBonusStrawberry() {
    let randomDirection = Math.floor(Math.random() * 4)+1;
	board[bonusStrawberryShape.i][bonusStrawberryShape.j] = bonusStrawberryShape.priorValue;
	if (randomDirection == 1) {   //up
		if (bonusStrawberryShape.j > 0 && board[bonusStrawberryShape.i][bonusStrawberryShape.j - 1] != 4) {
            bonusStrawberryShape.priorValue = board[bonusStrawberryShape.i][bonusStrawberryShape.j - 1];
			bonusStrawberryShape.j = bonusStrawberryShape.j - 1;
		}
	}
	else if (randomDirection == 2) {   //down
		if (bonusStrawberryShape.j < size-1 && board[bonusStrawberryShape.i][bonusStrawberryShape.j + 1] != 4) {
            bonusStrawberryShape.priorValue = board[bonusStrawberryShape.i][bonusStrawberryShape.j + 1];
			bonusStrawberryShape.j = bonusStrawberryShape.j + 1;
		}
	}
	else if (randomDirection == 3) {    //left
		if (bonusStrawberryShape.i > 0 && board[bonusStrawberryShape.i - 1][bonusStrawberryShape.j] != 4) {
            bonusStrawberryShape.priorValue = board[bonusStrawberryShape.i- 1][bonusStrawberryShape.j];
			bonusStrawberryShape.i = bonusStrawberryShape.i - 1;
		}
	}
	else if (randomDirection == 4) {    //right
		if (bonusStrawberryShape.i < size-1 && board[bonusStrawberryShape.i + 1][bonusStrawberryShape.j] != 4) {
            bonusStrawberryShape.priorValue = board[bonusStrawberryShape.i + 1][bonusStrawberryShape.j];
			bonusStrawberryShape.i = bonusStrawberryShape.i + 1;
            
		}
	}
	board[bonusStrawberryShape.i][bonusStrawberryShape.j] = 10;
	// var currentTime = new Date();
	// time_elapsed = (currentTime - start_time) / 1000;
	// if (score >= 2000 && time_elapsed <= 1000) {  //TODO: what?
	// 	pac_color = "green";
	// }
	// if (score == 500) { //TODO: where?
	// 	lblScore.value = score;
	// 	lblTime.value = time_elapsed
	// 	window.clearInterval(interval);
	// 	window.alert("Game completed");
	// }
	// else if (gameTime <= time_elapsed) {
	// 	lblTime.value = time_elapsed
	// 	lblScore.value = score;
	// 	window.clearInterval(interval);
	// 	if (score < 100) {
	// 		alert("You are better than " + score + " points!")
	// 	} else {
	// 		alert("Winner")
	// 	}
	// } else if (gameTime <= time_elapsed && score < 100) {
	// 	lblTime.value = time_elapsed
	// 	lblScore.value = score;
	// 	window.clearInterval(interval);
	// 	alert("You are better than " + score + " points!")
	// } else {
    Draw();
	// }
}