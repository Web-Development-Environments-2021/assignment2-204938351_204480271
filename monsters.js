function updateMonster() {
    for (var m = 0; m < monsters.length; m++) {
        let randomDirection = Math.floor(Math.random() * 4)+1;
        board[monsters[m].i][monsters[m].j] = monsters[m].priorValue;
        if (randomDirection == 1) {   //up
            if (monsters[m].j > 0 && board[monsters[m].i][monsters[m].j - 1] != 4
            && board[monsters[m].i][monsters[m].j - 1] != 9
            && board[monsters[m].i][monsters[m].j - 1] != 10
            && board[monsters[m].i][monsters[m].j - 1] != 12) {
                monsters[m].priorValue = board[monsters[m].i][monsters[m].j - 1];
                monsters[m].j = monsters[m].j - 1;
            }
        }
        if (randomDirection == 2) {   //down
            if (monsters[m].j < size-1 && board[monsters[m].i][monsters[m].j + 1] != 4
            && board[monsters[m].i][monsters[m].j + 1] != 9
            && board[monsters[m].i][monsters[m].j + 1] != 10
            && board[monsters[m].i][monsters[m].j + 1] != 12) {
                monsters[m].priorValue = board[monsters[m].i][monsters[m].j + 1];
                monsters[m].j = monsters[m].j + 1;
            }
        }
        if (randomDirection == 3) {    //left
            if (monsters[m].i > 0 && board[monsters[m].i - 1][monsters[m].j] != 4
            && board[monsters[m].i - 1][monsters[m].j] != 9
            && board[monsters[m].i - 1][monsters[m].j] != 10
            && board[monsters[m].i - 1][monsters[m].j] != 12) {
                monsters[m].priorValue = board[monsters[m].i- 1][monsters[m].j];
                monsters[m].i = monsters[m].i - 1;
            }
        }
        if (randomDirection == 4) {    //right
            if (monsters[m].i < size-1 && board[monsters[m].i + 1][monsters[m].j] != 4
            && board[monsters[m].i + 1][monsters[m].j] != 9
            && board[monsters[m].i + 1][monsters[m].j] != 10
            && board[monsters[m].i + 1][monsters[m].j] != 12) {
                monsters[m].priorValue = board[monsters[m].i + 1][monsters[m].j];
                monsters[m].i = monsters[m].i + 1;
                
            }
        }
        board[monsters[m].i][monsters[m].j] = 12;
    }
}
//     let vertical = monster.i - shape.i;
//     let horizontal = monster.j - shape.j;
//     board[monster.i][monster.j] = monster.priorValue;
//     if (vertical < horizontal || vertical == 0) {   // up or down
//         if (vertical > 0 && monster.j > 0 && board[monster.i][monster.j - 1] != 4) {   // walk up
//             monster.priorValue = board[monster.i][monster.j-1];
//             monster.j = monster.j - 1;
//         }
//         if (vertical < 0 && monster.j < size-1 && board[monster.i][monster.j + 1] != 4) {   // walk down
//             monster.priorValue = board[monster.i][monster.j+1];
//             monster.j = monster.j + 1;
//         }
//     }
//     if (vertical > horizontal || horizontal == 0) {   // up or down
//         if (horizontal > 0 && monster.i > 0 && board[monster.i - 1][monster.j] != 4) {    //left
//             monster.priorValue = board[monster.i-1][monster.j]
//             monster.i = monster.i - 1;
//         }
//         if (horizontal < 0 && monster.i < size-1 && board[monster.i+1][monster.j] != 4) {  //right
//             monster.priorValue = board[monster.i+1][monster.j]
// 			monster.i = monster.i + 1;
//         }
//     }
//     board[monster.i][monster.j] = 12; 
// }



