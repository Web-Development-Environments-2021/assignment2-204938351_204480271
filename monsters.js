var lastMode = 0;

function walkingMonster(monster) {
    let vertical = monster.i - shape.i;
    let horizontal = monster.j - shape.j;
    board[monster.i][monster.j] = lastMode;
    if (vertical < horizontal || vertical == 0) {   // up or down
        if (vertical > 0 && monster.j > 0 && board[monster.i][monster.j - 1] != 4) {   // walk up
            lastMode = board[monster.i][monster.j-1];
            monster.j = monster.j - 1;
            return;
        }
        if (vertical < 0 && monster.j < size-1 && board[monster.i][monster.j + 1] != 4) {   // walk down
            lastMode = board[monster.i][monster.j+1];
            monster.j = monster.j + 1;
            return;
        }
    }
    if (vertical > horizontal || horizontal == 0) {   // up or down
        if (horizontal > 0 && monster.i > 0 && board[monster.i - 1][monster.j] != 4) {    //left
            lastMode = board[monster.i-1][monster.j]
            monster.i = monster.i - 1;
            return;
        }
        if (horizontal < 0 && monster.i < size-1 && board[monster.i+1][monster.j] != 4) {  //right
            lastMode = board[monster.i+1][monster.j]
			monster.i = monster.i + 1;
            return;
        }
    }
}



