function monsterEatsPacman() {
    life--;
    score -= 10;
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            if (i == 0 && j == 0) {
                board[i][j] = 12;
                monster1.i = i;
                monster1.j = j;
                monster1.priorValue = 0;
            } else if (numOfMonsters > 1 && i == size-1 && j == size-1) {
                board[i][j] = 12
                monster2.i = i;
                monster2.j = j;
                monster2.priorValue = 0;
            } else if (numOfMonsters > 2 && i == 0 && j == size-1) {
                board[i][j] = 12
                monster3.i = i;
                monster3.j = j;
                monster3.priorValue = 0;
            } else if (numOfMonsters > 3 && i == size-1 && j == 0) {
                board[i][j] = 12
                monster4.i = i;
                monster4.j = j;
                monster4.priorValue = 0;
            } else if (board[i][j] == 12 || board[j][j] == lastPressed) {
                board[i][j] = 0;
            }
        }
    }
    var emptyCell = findRandomEmptyCell(board);
    shape.i = emptyCell[0];
    shape.j = emptyCell[1];
    pacman_remain--;
    board[emptyCell[0]][emptyCell[1]] = 5;
    lastPressed = 8;
    window.clearInterval(intervalMonsters);
    intervalMonsters = setInterval(updateMonster, 400);
}


function isValidMove(i, j) {
    let inBoard = 0 <= i && i <= size-1 && 0 <= j && j <= size-1;
    if (inBoard) {
        let notWall = board[i][j] !== 4;
        let notMedicin = board[i][j] !== 9;
        let notStrawberry = board[i][j] !== 10;
        let notMonster = board[i][j] !== 12;
        return notWall && notMedicin && notStrawberry && notMonster;
    }
    return false;
}

function updateMonster() {
    for (var m = 0; m < monsters.length; m++) {
        let goLeftOrRight = monsters[m].i - shape.i;
        let goUpOrDown = monsters[m].j - shape.j;
        let randDirection = Math.random();
        board[monsters[m].i][monsters[m].j] = monsters[m].priorValue;
        if (randDirection < 0.5) { // go left or right
            if (goUpOrDown > 0 ) { // if needs to go up
                if (isValidMove(monsters[m].i ,monsters[m].j-1)) {  // up
                        monsters[m].priorValue = board[monsters[m].i][monsters[m].j-1];
                        monsters[m].j = monsters[m].j-1;
                }
                else if (randDirection < 0.5 && isValidMove(monsters[m].i-1 ,monsters[m].j)) { // if needs to go left
                    monsters[m].priorValue = board[monsters[m].i-1][monsters[m].j];
                    monsters[m].i = monsters[m].i-1;
                }
                else if (isValidMove(monsters[m].i+1 ,monsters[m].j)) {  // right
                    monsters[m].priorValue = board[monsters[m].i+1][monsters[m].j];
                    monsters[m].i = monsters[m].i+1;
                }
                else if (isValidMove(monsters[m].i ,monsters[m].j+1)) {  // down
                    monsters[m].priorValue = board[monsters[m].i][monsters[m].j+1];
                    monsters[m].j = monsters[m].j+1;
                }
                else if (isValidMove(monsters[m].i-1 ,monsters[m].j)) {  // left
                    monsters[m].priorValue = board[monsters[m].i-1][monsters[m].j];
                    monsters[m].i = monsters[m].i-1;
                }
            }
            else { // if needs to go down
                if (isValidMove(monsters[m].i ,monsters[m].j+1)) {  // down
                    monsters[m].priorValue = board[monsters[m].i][monsters[m].j+1];
                    monsters[m].j = monsters[m].j+1;
                }
                else if (randDirection < 0.5 && isValidMove(monsters[m].i-1 ,monsters[m].j)) { // if needs to go left
                    monsters[m].priorValue = board[monsters[m].i-1][monsters[m].j];
                    monsters[m].i = monsters[m].i-1;
                }
                else if (isValidMove(monsters[m].i+1 ,monsters[m].j)) {  // right
                    monsters[m].priorValue = board[monsters[m].i+1][monsters[m].j];
                    monsters[m].i = monsters[m].i+1;
                }
                else if (isValidMove(monsters[m].i ,monsters[m].j-1)) {  // up
                    monsters[m].priorValue = board[monsters[m].i][monsters[m].j-1];
                    monsters[m].j = monsters[m].j-1;
                }
                else if (isValidMove(monsters[m].i-1 ,monsters[m].j)) {  // left
                    monsters[m].priorValue = board[monsters[m].i-1][monsters[m].j];
                    monsters[m].i = monsters[m].i-1;
                }
            }
        }
        else {  // go up or down
            if(goLeftOrRight > 0) { // if needs to go left
                if (isValidMove(monsters[m].i-1 ,monsters[m].j)) {  // left
                    monsters[m].priorValue = board[monsters[m].i-1][monsters[m].j];
                    monsters[m].i = monsters[m].i-1;
                }
                else if (randDirection < 0.5 && isValidMove(monsters[m].i ,monsters[m].j-1)) { // if needs to go up
                    monsters[m].priorValue = board[monsters[m].i][monsters[m].j-1];
                    monsters[m].j = monsters[m].j-1;
                }
                else if (isValidMove(monsters[m].i ,monsters[m].j+1)) {  // down
                    monsters[m].priorValue = board[monsters[m].i][monsters[m].j+1];
                    monsters[m].j = monsters[m].j+1;
                }
                else if (isValidMove(monsters[m].i+1 ,monsters[m].j)) {  // right
                    monsters[m].priorValue = board[monsters[m].i+1][monsters[m].j];
                    monsters[m].i = monsters[m].i+1;
                }
                else if (isValidMove(monsters[m].i ,monsters[m].j-1)) {  // up
                    monsters[m].priorValue = board[monsters[m].i][monsters[m].j-1];
                    monsters[m].j = monsters[m].j-1;
                }
            }
            else { // needs to go right
                if (isValidMove(monsters[m].i+1 ,monsters[m].j)) {  // right
                    monsters[m].priorValue = board[monsters[m].i+1][monsters[m].j];
                    monsters[m].i = monsters[m].i+1;
                }
                else if (randDirection < 0.5 && isValidMove(monsters[m].i ,monsters[m].j-1)) {  // if needs to go up
                    monsters[m].priorValue = board[monsters[m].i][monsters[m].j-1];
                    monsters[m].j = monsters[m].j-1;
                
                }
                else if (isValidMove(monsters[m].i ,monsters[m].j+1)) {  // down
                    monsters[m].priorValue = board[monsters[m].i][monsters[m].j+1];
                    monsters[m].j = monsters[m].j+1;
                }
                else if (isValidMove(monsters[m].i-1 ,monsters[m].j)) {  // left
                    monsters[m].priorValue = board[monsters[m].i-1][monsters[m].j];
                    monsters[m].i = monsters[m].i-1;
                }
                else if (isValidMove(monsters[m].i ,monsters[m].j-1)) {  // up
                    monsters[m].priorValue = board[monsters[m].i][monsters[m].j-1];
                    monsters[m].j = monsters[m].j-1;
                }
            }  
        }
        if (board[monsters[m].i][monsters[m].j] == lastPressed) { // monster eats pacmen
            board[monsters[m].i][monsters[m].j] = 0;
            monsterEatsPacman();
        }
        else {
            board[monsters[m].i][monsters[m].j] = 12;
        }
    } 
}


