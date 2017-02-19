$(document).ready(function(){
    
// global vars    
var gameView = $("#gameView"),player, ai, newSession = true, viewEdit = false, turn = "player", count = 0;
    
var gameSetupModal = $("#gameSetup");    
    
    player = "x";

    $("#play").on('click', function(){
    gameSetupModal.modal('hide');
    //alert("works");
    userScore = computerScore = drawScore = "0";
    generateBoard();   // build Out the game Board
    if(turn == "ai"){
        aiInitPlay();
    }
        // displaying the payers peice on the tile
    
        // onclick function
        $(".tiles").on('click', function(){
           // alert("clicked");
           var id = parseInt(this.id.match(/[1-9]/));
            //console.log(".tiles clicked ID: " + id);
            playerMove(id);
            id = null;
        });
        
        
        // test the reset gameboard feature ### remove!!
    $("#resetGameBoardButton").on('click', function(){
        resetGameBoard();
    });
        
    });
    
function aiInitPlay(x){
    var randomNumber = Math.floor(Math.random()  * 10);
    data[randomNumber] = x;
    turn = "player";
    alert(randomNumber);
}


//score output
var userScore = $("#yourScore");
var computerScore = $("#computerScore");
var drawScore = $("#drawScore");
    


//gamesetup
    
    if(newSession){
        gameSetupModal.modal("show");
    }
    
    var gameSetup2 = $("#gameSetuph2");
    var gameSetupTurn = $("#gameSetupTurn");
    var gameSetupPiece = $("#gameSetupPiece");
    
    function updateView(){
        gameSetup2.html("It's " + turn + " turn, and you are &quot;" + player + "&quot;") ;
        gameSetupTurn.html(turn == "player" ? "ai" : "player");
        gameSetupPiece.html(player == "x" ? "o" : "x");
    }
    
    updateView();
    
    function changeTurn(){
        turn = turn == "player" ? "ai" : "player";
        //alert(turn);
    }
    
    function changePiece(){
        player = player == "x" ? "o" : "x";
    }
    
    var gameSetupEdit = $(".gameSetupEdit");
    gameSetupEdit.hide();
    
    
    function showEdit(){
        if(!viewEdit){
            gameSetupEdit.show();
            viewEdit = true;
        } else {
            gameSetupEdit.hide();
            viewEdit = false;
        }
    }
    
    $("#editButton").on('click', function(){
        showEdit();
    });
    
    gameSetupPiece.on('click', function(){
        changePiece();
        updateView();
    });
    
    gameSetupTurn.on('click', function(){
       changeTurn(); 
        updateView();
    });
    
    

var SetupSession = function(){
  
  
    
};


//gameboard creater
    
    // build a single square, and to DOM
    // function uses the for loop iter. to designate the square id
    
    //square 
    
    function tile(id){
        
        var t = '<div class="col-xs-4 tiles" ';
        t += 'id="tile-'+ id +'"';
        //t += 'onclick="clickedTile("'+id+'")"';
        t += '></div>';
        
        return t;
        
    }
    
    
    // generate board
    
    function generateBoard(){
        
    
        
        var board = '';
        for(var i = 1; i < 10; i++){
           // board += '<div class="col-xs-4 tiles" id= "' + i + '"></div> ';
            board += tile(i);
        }   
        
        board += "</div>";
        
        gameView.html(board);
        tileSize();
    }
    
    
    // tile size function, make the tile height equal to the tile width
    function tileSize(){
        // get the average width of a tile
        var width = $("#tile-1").width();
        $(".tiles").css("height", width);
    }
    
    
    // on window resize, adjust height of tiles
    
    $(window).resize(function(){
        tileSize();
    });
    
    
    
    
    
     // handle player making a move
    
    function playerMove(tile){
        if(turn == "player"){
            if(data[tile - 1 ]){
            // alert the user that the tile is taken
                //alert("space taken"); // remove
            } else{
                data[tile - 1 ] = player;
                console.log(data);
                addPieceToTile(tile, player);
                updateCount();
                console.log(count);
                changeTurn();
                aiMove();
                //play the added tile success animation
//                if(hasWon(user)){
//                    return gameOver("player");
//                } else {
//                    turn = "ai";
//                    // call the ai function
//                }
            }
        } else {
            // alert the user that it's not their turn
            console.log("not turn");
        }
    } // playerMove
    
    // add players peice to tile
    
    function addPieceToTile(tile, peice){
        $("#tile-" + tile).html('<p class="tileText">' + peice + '</p>');
    }
    
    //update the count
    
    function updateCount(reset){
        if(reset){
            count = 0;
        }
        count++;
        
        if(count == 9){
            // checkWin("player");
            // checkWin("ai");
            // gameOver("tie");     
        }
    }
    
    
    // resetting the gameboard both ui and data
    function resetGameBoard(){
        alert("resetting");
        for(var i = 1; i < 10; i++ ){
            $("#tile-" + i).html("");
        }
    }
    
    
    // handle the ai movement 
    
    function aiMove(){
        var move = ai.move();
        addPieceToTile(move + 1, player == "x" ? "o" : "x");
        // ai move animation
        data[move] = player == "x" ? "o" : "x";
        // game won ? 
        console.log(data);
        updateCount();
        changeTurn();
    }
    
    
    
    
    
    

// === GamePlay and AI === //    
    
var data = [undefined,undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined];
ai = new AiPlayer(data);
ai.setSeed(player === "o" ? "x" : "o");
//console.log(ai.move());
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
    
    
    
    
}); // document ready




