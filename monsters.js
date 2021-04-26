function isValidMove(i, j) {
    console.log(i, j);
    let inBoard = 0 <= i && i < size-1 && 0 <= j && j < size-1;
    console.log(inBoard);

    if (inBoard) {
        let notWall = board[i][j] !== 4;
        let notMedicin = board[i][j] !== 9;
        let notStrawberry = board[i][j] !== 10;
        let notMonster = board[i][j] !== 12;
        console.log(notWall);
        console.log(notMedicin);
        console.log(notStrawberry);
        console.log(notMonster);
        return notWall && notMedicin && notStrawberry && notMonster;
    }
    return false;
}

function updateMonster() {
    for (var m = 0; m < monsters.length; m++) {
        let vertical = monsters[m].i - shape.i;
        let horizontal = monsters[m].j - shape.j;
        // let sideToSide = true;
        board[monsters[m].i][monsters[m].j] = monsters[m].priorValue;
        if (horizontal < vertical) { // go left or right
            if (horizontal > 0 ) { // if needs to go up
                if (isValidMove(monsters[m].i ,monsters[m].j-1)) {  // up
                        monsters[m].priorValue = board[monsters[m].i][monsters[m].j-1];
                        monsters[m].j = monsters[m].j-1;
                }
                else if (isValidMove(monsters[m].i-1 ,monsters[m].j)) { // if needs to go left
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
                else if (isValidMove(monsters[m].i-1 ,monsters[m].j)) { // if needs to go left
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
            if(vertical > 0) { // if needs to go left
                if (isValidMove(monsters[m].i-1 ,monsters[m].j)) {  // left
                    monsters[m].priorValue = board[monsters[m].i-1][monsters[m].j];
                    monsters[m].i = monsters[m].i-1;
                }
                else if (isValidMove(monsters[m].i ,monsters[m].j-1)) { // if needs to go up
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
                else if (isValidMove(monsters[m].i ,monsters[m].j-1)) {  // if needs to go up
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
        board[monsters[m].i][monsters[m].j] = 12;
    } 
}















// function updateMonster() {
//     for (var m = 0; m < monsters.length; m++) {
//         let randomDirection = Math.floor(Math.random() * 4)+1;
//         board[monsters[m].i][monsters[m].j] = monsters[m].priorValue;
//         if (randomDirection == 1) {   //up
//             let i = monsters[m].i;
//             let j = monsters[m].j-1;
//             if (isValidMove(i, j)) {
//                 monsters[m].priorValue = board[monsters[m].i][monsters[m].j - 1];
//                 monsters[m].j = monsters[m].j - 1;
//             }
//         }
//         if (randomDirection == 2) {   //down
//             let i = monsters[m].i;
//             let j = monsters[m].j+1;
//             if (isValidMove(i, j)) {
//                 monsters[m].priorValue = board[monsters[m].i][monsters[m].j + 1];
//                 monsters[m].j = monsters[m].j + 1;
//             }
//         }
//         if (randomDirection == 3) {    //left
//             let i = monsters[m].i-1;
//             let j = monsters[m].j;
//             if (isValidMove(i, j)) {
//                 monsters[m].priorValue = board[monsters[m].i- 1][monsters[m].j];
//                 monsters[m].i = monsters[m].i - 1;
//             }
//         }
//         if (randomDirection == 4) {    //right
//             let i = monsters[m].i+1;
//             let j = monsters[m].j;
//             if (isValidMove(i, j)) {
//                 monsters[m].priorValue = board[monsters[m].i + 1][monsters[m].j];
//                 monsters[m].i = monsters[m].i + 1;
                
//             }
//         }
//         board[monsters[m].i][monsters[m].j] = 12;
//     }
// }



