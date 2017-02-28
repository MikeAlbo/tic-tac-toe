$(document).ready(function(){

// global vars
var globalPlayer,
    gloabalTurn,
    newSession = true,
    newGame,
    gameView = $("#gameView"),
    playerScoreView = $("#playerScore"),
    aiScoreView = $("#aiScore"),
    drawScoreView = $("#drawScore"),
    playerScore = 0,
    aiScore = 0,
    tieScore = 0;

var GameBuilder = function(){ 
    var data = [],
        turn, 
        seed,
        oppSeed,
        count = 0;
    
    // tile model
    function tile(id){
        
        var t = '<div class="col-xs-4 tiles" ';
        t += 'id="tile-'+ id +'"';
        t += '></div>';
        
        return t;
        
    } // tile model
    
    
    // generate the game board
    this.generateBoard = function(){
        var board = '';
        for(var i = 1; i < 10; i++){
           // board += '<div class="col-xs-4 tiles" id= "' + i + '"></div> ';
            board += tile(i);
        }   
        
        board += "</div>";
        
        return board;
    }; // generate game board

    // set player seed
    this.setSeed = function(a){
        if(a) {
            seed = a;
        } else {
            seed = globalPlayer ? globalPlayer : 'x';
        }
    };
    
    // get player seed
    this.getSeed = function(){
        return seed;
    };
    
    // set opponent seed
    this.setOppSeed = function(){
        oppSeed = seed == 'x' ? 'o' : 'x';
    };
    
    // get opponent seed
    this.getOppSeed = function(){
        return oppSeed;
    };
    
    // set turn
    this.setTurn = function(a){
        turn = a ? a : 'player';
    };
    
    // change turn
    this.changeTurn = function(){
        turn = turn == 'player' ? 'ai' : 'player'; 
    };
    
    // get turn
    this.getTurn = function(){
        return turn;
    };
    
    // data
    
// get data
    this.getData = function(){
        return data;
    };

// clear data
    this.clearData = function(){
    data = [];
};

// update data
    this.updateData = function(index, value){
        data[index] = value;
    };
    
// update count 
    function updateCount(reset){
            if(reset){
               return count = 0;
            }
            count++;

            if(count == 9){
                // checkWin("player");
                // checkWin("ai");
                 gameOver("tie");     
            }
        }    
    
//update gameboard
function addPieceToTile(tile, peice){
        $("#tile-" + tile).html('<p class="tileText">' + peice + '</p>');
    }
    
//clear gameboard
function resetGameBoard(){
        for(var i = 1; i < 10; i++ ){
            $("#tile-" + i).html("");
        }
    }
    
// player move handler
    
     function playerMove(tile){
        if(turn == "player"){
            if(data[tile - 1 ]){
            // alert the user that the tile is taken
            } else{
                data[tile - 1 ] = seed;
                //console.log(data);
                addPieceToTile(tile, seed);
                updateCount();
                //play the added tile success animation
                if(hasWon(data, seed)){
                    return gameOver("player");
                } else {
                    this.changeTurn();
                    aiMove();
                }
            }
        } else {
            // alert the user that it's not their turn
            console.log("not turn");
        }
    }; // playerMove
    
// ai move handler 
    function aiMove(){
        var move = ai.move();
        var aiPiece = this.getOppSeed(); 
        addPieceToTile(move + 1, aiPiece );
        // ai move animation
        data[move] = aiPiece;
        if(hasWon(data, aiPiece)){
            return gameOver("ai");
        }
        updateCount();
        this.changeTurn();
    }
    
// ai init play
    this.aiInitPlay = function(x){
        var randomNumber = Math.floor(Math.random()  * 10);
        data[randomNumber] = x;
        addPieceToTile(randomNumber + 1, x);
        turn = "player";
    };
    
        // init the .tiles listener
    this.initTiles = function(){
        $(".tiles").on('click', function(){
            var id = parseInt(this.id.match(/[1-9]/));
            playerMove(id);
            alert("click");
            id = null;
        });
    }
    

    
    
// game over functions
    
// gameOver
    
    function gameOver(winner){
        // if/ else for winner calls "tie", "player win", or ai win"
        
        switch(winner){
            case "tie" : tie(); break;
            case "ai" : aiWin(); break;
            case "player" : playerWin(); break;
            default : tie();     
                
        }
        
    } // game over
    
// tie 
    function tie(){
        updateScore("tie")
        return new GameModalBuilder("gameOver", "tie");
    } // tie
    
// player win
    function playerWin(){
        updateScore("player")
        return new GameModalBuilder("gameOver", "player");
    } // player win
    
// ai win    
    function aiWin(){
        updateScore("ai")
        return new GameModalBuilder("gameOver", "ai");
    } // ai win
    
    
    // ai \\

    ai = new AiPlayer(data);
ai.setSeed(seed === "o" ? "x" : "o");
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

}
    
    // check to see if there's been a winner
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
    
    
}; // game builder

// == reset the session === \\

function resetSession(){
    // alert the user to confirm reset
    // if reset than clear the modal, reset the game and the scores
    var resetConfirm = confirm("Do you want to Start Over?");
    if(resetConfirm){
        updateScore("reset");
        resetGame();
        gameModal.modal('toggle');
    }
    
    newSession = true;
    // else, return to the modal
}

// ====== new game ===== \\


// rest the game
function resetGame(seed, turn){
    newGame = new GameBuilder();
    gameView.html(newGame.generateBoard());
    tileSize();
    newGame.initTiles();
    newGame.setSeed(seed);
    newGame.setOppSeed();
    newGame.setTurn(turn);
    
    // check to see if ai starts
    if(gloabalTurn == "ai"){
        newGame.aiInitPlay(globalPlayer == 'x' ? 'o' : 'x');
        }
    
}
    

    
 // get tile size
    function tileSize(){
        // get the average width of a tile
        var width = $("#tile-1").width();
        $(".tiles").css("height", width);
    }; // get tile size

//auto resize of the tiles
$(window).resize(function(){
        if(newGame){
            tileSize();
        }
    });



// ======= Modals for game ======= \\
var gameModal = $("#gameModal"), 
    gameModalTitle = $("#gameModalTitle"),
    gameModalFooter = $("#gameModalFooter"),
    gameModalContent = $("#gameModalContent");

// game Setup  
    
    var GameModalBuilder = function(type, winner){
        
        // setup game
        if(type == "setup"){
            gameModalTitle.html("Tic-Tac-Toe");
            gameModalFooter.html('<button type="button" class="btn btn-default" data-dismiss="modal">Close</button><button type="button" class="btn btn-primary" id="play">Play!</button>');
            gameModalContent.html('<div class="col-xs-12 text-center"><h2>You are <span id="setupUser"></span><br> <small><a href="#" id="setupSmall"></a></small></h2> </div>');
            
            var setupUser = $("#setupUser"),
                setupSmall = $("#setupSmall"),
                setupSmallPeice = $("#setupSmallPeice"),
                player = "x",
                turn = "player";
            
            
            function changeUser(){
                if(player == 'x') {
                    setupUser.html("'x', and it's your turn.");
                    setupSmall.html("Rahter go second?");
                } else {
                    setupUser.html("'o', and you will go second.");
                    setupSmall.html("Rather go first?");
                }
            } // change User
            
            function updateTurn(){
                turn = turn == "player" ? "ai" : "player";
            }
            
            // init setupUser and SetupSmall
                changeUser();
            
                setupSmall.on("click", function(){
                    player = player == 'x' ? 'o' : 'x';
                    changeUser();
                    updateTurn();
                });
            
           
            // play button
            $("#play").on('click', function(){
                gameModal.modal('hide');
                newSession = false;
                resetGame(player, turn); 
            }); // play
        
        gameModal.modal('toggle');
    }  else if(type == "gameOver") {
        gameModalTitle.html("Tic-Tac-Toe");
        gameModalFooter.html('<button type="button" class="btn btn-danger" id="newSessionButton">Rest Session</button><button type="button" class="btn btn-primary" id="newGameButton">New Game</button>');
        
        var message;
        if(winner == "tie"){
            message = "Well it apears we have matched wit!"
            if(tieScore > 1){
                message+= "We've tied " + tieScore + " times.";
            } else if (tieScore > 0) {
                message+= "We've tied " + tieScore + " time.";
            } else {
                message += "Our first tie.";
            }
        } else if (winner == "player"){
            message = "Well it looks like you won, I want a rematch.";
        } else {
            if(aiScore > 1){
                message = "I don't want to brag but I've won " + aiScore + " times.";
            } else {
                message = "Well it looks like I've one. ";
            }
        }
        
        gameModalContent.html('<h2 class="text-center">Game Over<br><small>'+ message +'</small></h2><p class="text-center">Shall we play again?</p>');
        
        // buttons
        
        // reset session
        $("#newSessionButton").on('click', function(){
           resetSession();
        });
        
        // new game
        $("#newGameButton").on('click', function(){
            resetGame();
        });
        
        gameModal.modal('toggle');
    } 
 
    }; // gameModalBuilder

// update score

function udateScoreView(){
    aiScoreView.html(aiScore);
    playerScoreView.html(playerScore);
    drawScore.html(drawScore);
}


function updateScore(winner){
    if(winner == "reset"){
        playerScore = aiScore = drawScore = 0;
        return updateScoreView();
    } else if(winner == "tie"){
        drawScore++;
    } else if(winner == "ai"){
        aiScore++;
    } else if (winner = "player") {
        playerScore++;
    }
    
    return udateScoreView();
    
}
    
    if(newSession){
        new GameModalBuilder('setup');
    }   
}); // doc ready     