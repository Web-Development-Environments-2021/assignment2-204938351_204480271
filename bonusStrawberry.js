function placeStrawberry() {
    bonusStrawberryShape.i = Math.floor(size/2);
	bonusStrawberryShape.j = Math.floor(size/2);
    board[Math.floor(size/2)][Math.floor(size/2)] = 10;
    bonusStrawberryShape.priorValue = 0;
    intervalBonusStrawberry = setInterval(UpdateBonusStrawberry, 400);
    console.log("floooooor:"+ Math.floor(size/2))
}

function UpdateBonusStrawberry() {
    let randomDirection = Math.floor(Math.random() * 4)+1;
	board[bonusStrawberryShape.i][bonusStrawberryShape.j] = bonusStrawberryShape.priorValue;
	if (randomDirection == 1) {   //up
		if (bonusStrawberryShape.j > 0 && board[bonusStrawberryShape.i][bonusStrawberryShape.j - 1] != 4
		&& board[bonusStrawberryShape.i][bonusStrawberryShape.j - 1] != 12
		&& board[bonusStrawberryShape.i][bonusStrawberryShape.j - 1] != 9
		&& board[bonusStrawberryShape.i][bonusStrawberryShape.j - 1] != lastPressed) {
            bonusStrawberryShape.priorValue = board[bonusStrawberryShape.i][bonusStrawberryShape.j - 1];
			bonusStrawberryShape.j = bonusStrawberryShape.j - 1;
		}
	}
	if (randomDirection == 2) {   //down
		if (bonusStrawberryShape.j < size-1 && board[bonusStrawberryShape.i][bonusStrawberryShape.j + 1] != 4
		&& board[bonusStrawberryShape.i][bonusStrawberryShape.j + 1] != 12
		&& board[bonusStrawberryShape.i][bonusStrawberryShape.j + 1] != 9
		&& board[bonusStrawberryShape.i][bonusStrawberryShape.j + 1] != lastPressed) {
            bonusStrawberryShape.priorValue = board[bonusStrawberryShape.i][bonusStrawberryShape.j + 1];
			bonusStrawberryShape.j = bonusStrawberryShape.j + 1;
		}
	}
	if (randomDirection == 3) {    //left
		if (bonusStrawberryShape.i > 0 && board[bonusStrawberryShape.i - 1][bonusStrawberryShape.j] != 4
		&& board[bonusStrawberryShape.i - 1][bonusStrawberryShape.j] != 12
		&& board[bonusStrawberryShape.i - 1][bonusStrawberryShape.j] != 9
		&& board[bonusStrawberryShape.i - 1][bonusStrawberryShape.j] != lastPressed) {
            bonusStrawberryShape.priorValue = board[bonusStrawberryShape.i- 1][bonusStrawberryShape.j];
			bonusStrawberryShape.i = bonusStrawberryShape.i - 1;
		}
	}
	if (randomDirection == 4) {    //right
		if (bonusStrawberryShape.i < size-1 && board[bonusStrawberryShape.i + 1][bonusStrawberryShape.j] != 4
		&& board[bonusStrawberryShape.i + 1][bonusStrawberryShape.j] != 12
		&& board[bonusStrawberryShape.i + 1][bonusStrawberryShape.j] != 9
		&& board[bonusStrawberryShape.i + 1][bonusStrawberryShape.j] != lastPressed) {
            bonusStrawberryShape.priorValue = board[bonusStrawberryShape.i + 1][bonusStrawberryShape.j];
			bonusStrawberryShape.i = bonusStrawberryShape.i + 1;
            
		}
	}
	board[bonusStrawberryShape.i][bonusStrawberryShape.j] = 10;
    Draw();
}