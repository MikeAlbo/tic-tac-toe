//
//var State = function(player){
//    var _player, _opponent; 
//    this.setPlayer = function(){_player = player;};
//    this.setOpponent = function(){
//       _opponent = player === "x" ? "o" : "x";
//    };
//};
//
//
//
//State.prototype.gameBoard = [null,null,null,null,null,null,null,null,null];
//State.prototype.getGameBoard = function(){return this.gameBoard;};
//State.prototype.updateGameBoard = function(index, player){
//    this.gameBoard[index] = player;
//};
//
//
////function Ai(currentState, currentPlayer){
//// 
////    var nextMove = null, val = 0, moveVal;
////    var oppPlayer = currentPlayer === "x" ? "o" : "x";
////   
////    function min(state, currentPlayer){
////        console.log("min: ", state);
////        if(!checkWin(state)){
////            for(var i = 0; i < state.length; i++){
////            if(!state[i]){
////                state[i] = currentPlayer;
////                moveVal -= 10;
////                if(checkWin(state)){
////                    return [i, currentPlayer];
////                } else {
////                    max(state, oppPlayer);
////                }
////            } else if( i == state.length -1) {
////                return [i, currentPlayer];
////            }
////        } // for loop
////        } // check win
////    }// min
////    
////    function max(state, _oppPlayer){
////        console.log("max: ", state);
////        if(!checkWin(state)){
////            for(var j = 0; j < state.length; j++){
////            if(!state[j]){
////                state[j] = _oppPlayer;
////                moveVal += 10;
////                if(checkWin(state)){
////                    return [j, _oppPlayer];
////                } else {
////                    min(state, currentPlayer);
////                }
////            } else if (j == state.length -1) {
////                return [j, _oppPlayer];
////            }
////        } // for loop
////        } // checkwin
////    }
////    
////    function gameOverCheck(state){
////        if(checkWin(state, "x")) {
////           return "x";
////           } else if( checkWin(state, "o") ) {
////               return "o";
////           }
////        
////    }
////    
////    var isGameOver = gameOverCheck(currentState);
////    
////     if(isGameOver){
////        gameOver(isGameOver);
////    } else {
////        console.log("no win: ", currentState);
////        for(var x = 0; x < currentState.length; x++){
////            moveVal = 0;
////            var StateReturn = min(currentState, currentPlayer);
////            if(val > StateReturn[1]){
////                nextMove = StateReturn[0];
////                val = StateReturn[1];
////            }
////        } // for loop
////        
////       return [nextMove, currentPlayer];
////        
////    }
////    
////    
////    
////} // Ai
//
//
//function checkWin(state, player){
//            if(
//            (state[0] === player && state[1] === player && state[2] === player) ||
//            (state[3] === player && state[4] === player && state[5] === player) ||
//            (state[6] === player && state[7] === player && state[8] === player) ||
//            (state[0] === player && state[3] === player && state[6] === player) ||
//            (state[1] === player && state[4] === player && state[7] === player) ||
//            (state[2] === player && state[5] === player && state[8] === player) ||
//            (state[0] === player && state[4] === player && state[8] === player) ||
//            (state[2] === player && state[6] === player && state[4] === player)
//        ) {
//             return true;
//            } 
//        }
//
//function gameOver(player){
//    console.log("winner: ", player);
//}
//
//
//
//
//// test 
//var newState = new State("x");
//
////console.log(newState.getGameBoard());
//
//newState.updateGameBoard(2,"x");
////newState.updateGameBoard(0,"x");
////newState.updateGameBoard(1,"x");
////console.log(newState.getGameBoard());
//console.log( new Ai(newState.getGameBoard()));
//
//
//// function one takes the current State, and saves a copy of that state
//// a for loop, loops through the tempState and adds a "min" value in the next Avail place.
//// when there is a value added, depth is increased by 1, stateValue +=10; checkWin is called
//// if win, then return the  the index, depth, and stateValue;
//// if win, the stateVal is compared to the value, if less then depth is checked against currentDepth and if less that index is stored. 
//// else, a new state is made and max is called on that state
//// same as check win...
//// if depth == 9 return 0
//// end of first for loop, return the index of next move
//
//function Ai(currentState){
//    var tempState = currentState;
//    var indexOfNextMove, currentValue, stateValue, currentDepth, stateDepth ;
//    
//    function min(state){
//        for(var i = 0; i < state.length; i++){
//            if(!state[i]){
//               var _tempState =  state[i] = "o";
//                stateDepth++;
//                currentValue -= 10;
//                console.log(state);
//                if(checkForWinner(_tempState)){
//                    if(currentValue < stateValue && currentDepth < stateDepth){
//                        currentValue = stateValue;
//                        currentDepth = stateDepth;
//                        tempState = _tempState;
//                        indexOfNextMove = i;
//                        console.log("index: ", i);
//                        
//                    }
//                    return;
//                } else {
//                    max(_tempState);
//                } 
//            }
//        }
//    }
//    
//    function max(state){
//        for(var j = 0; j < state.length; j++){
//            if(!state[j]){
//               var _tempState =  state[j] = "x";
//                stateDepth++;
//                currentValue += 10;
//                console.log(state);
//                if(checkForWinner(_tempState)){
//                    if(currentValue < stateValue && currentDepth < stateDepth){
//                        currentValue = stateValue;
//                        currentDepth = stateDepth;
//                        tempState = _tempState;
//                        indexOfNextMove = j;
//                        console.log("index: ", j);
//                        
//                    }
//                    return;
//                } else {
//                    min(_tempState);
//                } 
//            }
//        }
//    }
//    
//    function checkForWinner(state){
//        if(checkWin(state, "x")) return "x";
//        else if (checkWin(state, "o")) return "o";
//    }// check for winner
//    var isWinner = checkForWinner(currentState);
//    if(isWinner){
//        return gameOver(isWinner);
//    }
//    else {
//            min(tempState);
//        }
//    
//    return indexOfNextMove;
//    }// ai

var player, ai;
var data = ["o",undefined,"o",undefined,"x",undefined,undefined,undefined,undefined];
player = "o";
ai = new AiPlayer(data);
ai.setSeed(player === "o" ? "x" : "o");
console.log(ai.move());
function AiPlayer(data){
    var data = data, seed, oppSeed;
    
    this.setSeed = function(_seed){
        oppSeed = _seed === "x" ? "o" : "x";
        seed = _seed;
    };
    
    this.getSeed = function(){
        return seed;
    };
    
    this.move = function(){
        return miniMax(2, seed) [1];
    };
    
    function miniMax(depth, player){
        var nextMoves = getValidMoves(depth, player);
        
        //console.log(nextMoves);
        
        var best = (player === seed) ? -100 : 100,
            current,
            bestIdx = -1;
        
        if(nextMoves.length === 0 || depth === 0){
            best = evaluate();
        } else {
            for(var i = nextMoves.length;  i--;){
                var m = nextMoves[i];
                data[m] = player;
                
                if(player == seed){
                    current = miniMax(depth -1, oppSeed)[0];
                    if(current > best){
                        best = current;
                        bestIdx = m;
                    }
                } else {
                    current = miniMax(depth -1, seed)[0];
                    if(current < best){
                        best = current;
                        bestIdx = m;
                    }
                }
                data[m] = undefined;
            }
        }
        
        
        return [best, bestIdx];
    }
    
    function getValidMoves(depth, seed){
        var nm = [];
        if(hasWon(depth, seed) || hasWon(depth, oppSeed)){
            return nm;
        }
        for(var i = data.length; i--;){
            if(data[i] === undefined){
                nm.push(i);
            }
        }
        return nm;
    }
    
    function evaluate(){
        var s = 0;
        s += evaluateLine(0,1,2);
        s += evaluateLine(3,4,5);
        s += evaluateLine(6,7,8);
        s += evaluateLine(0,3,6);
        s += evaluateLine(1,4,7);
        s += evaluateLine(2,5,8);
        s += evaluateLine(0,4,8);
        s += evaluateLine(2,4,6);
        return s;
    }
    
    function evaluateLine(a,b,c){
        var s = 0;
        if(data[a] == seed){
            s = 1;
        } else if(data[a] == oppSeed){
            s = -1;
        }
        
        if(data[b] == seed){
            if(s == 1){
                s = 10;
            } else if (s === -1){
                return 0;
            } else {
                s = 1;
            }
        } else if (data[b] == oppSeed){
            if(s == -1){
                s = -10;
            } else if (s === 1){
                return 0;
            } else {
                s = -1;
            }
        }
        
        if(data[c] == seed){
            if(s > 0){
                s *= 10;
            } else if (s < 0) {
                return 0;
            } else {
                s = 1;
            }
        } else if (data[c] == oppSeed){
            if(s < 0){
                s *= 10;
            } else if (s > 0) {
                return 0;
            } else {
                s = -1;
            }
        }
        
        return s;
    }
    
    // paused at 25:10;
    
//    var winningPatterns = (function(state, player){
//        
//    }) ();
    
    function hasWon(state, player){
        if(
            (state[0] === player && state[1] === player && state[2] === player) ||
            (state[3] === player && state[4] === player && state[5] === player) ||
            (state[6] === player && state[7] === player && state[8] === player) ||
            (state[0] === player && state[3] === player && state[6] === player) ||
            (state[1] === player && state[4] === player && state[7] === player) ||
            (state[2] === player && state[5] === player && state[8] === player) ||
            (state[0] === player && state[4] === player && state[8] === player) ||
            (state[2] === player && state[6] === player && state[4] === player)
        ) {
             return true;
            } 
    }
}