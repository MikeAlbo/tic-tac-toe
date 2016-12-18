# Tic Tac Toe
ReadMe file

## js 

// game logic

// initalize the game state
// minimax
// update html score
// take user input
//alert popup from bottom winner or looser // ai smack talking maybe too
// in code, user will be 1 computer will be 0 (true, false)

//game play
// user selects player
// user decides who goes first (if !score)
// user turn --
// user clicks on tile, onclick calls function to add user's marker to tile
// function checks that tile is MT, adds the players marker (1), calls win function
// win function, if totalCount > 5, checks to see if there is a winning row -- takes in the current player
/* 
        if(totalCount > 5){
            if(
                (board[0] == player && board[1] == player && board[2] == player)
                ...
            )
        }
*/
// if win, call endGame function
// function endGame, updates score, modifies tile css

// if noWin, totalCount++, if totalCount == 9, call draw, modify css, else ( if user turn, wait for input, else call AI )

// AI 
// basicly, captures the current gameboard and runs a recursive function to test the number of moves until completion 

// AI takes in the current state of the game board

/* 
        x,o, ,
        o,x,x,
        x, , 
*/

// ... and checks the availabe spaces for the optimal decision

/*
    recursion( currentState, player) {
        var currentState = currentState;
        var levelCount = 0;
        
        function checkLevel(state) {
            var thisLevelCount = 0;
            for(var i = 0; i < 9; i++ ){
                if (!state[i]) {
                    state[i] = player;
                    if(DidWin(state) && thisLevelCount < 9){
                        return state;
                    } else {
                        thisLevelCount++;
                        checkLevel(state);
                    }
                    
                }
            }
            
            if // count is less than 9 return winner
            if count  == 9, no winner return draw
            if this levelcount  > thisLevelCount return levelCount == thisLevelCount
            
        }
        
    }
*/

//user can clear the total scores