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
    drawScore = 0,
    ai,
    tiles; // for css animations

    
    // ======================================================
    
     // game constructor
    
    var GameBuilder = function(){ 
    var data = [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
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
       // console.log("change turn");
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
    data = [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined];
};

// update data
    this.updateData = function(index, value){
        data[index] = value;
    };
    
// update count 
    this.updateCount = function(reset){
            if(reset){
               return count = 0;
            }
            count++;

            if(count == 9){
                 gameOver("tie");     
            }
        }    
    
 
// ai init play
    this.aiInitPlay = function(x){
        var randomNumber = Math.floor(Math.random()  * 10);
        data[randomNumber] = x;
        aiMoveAnimation('#tile-' + (randomNumber + 1))
        addPieceToTile(randomNumber + 1, x);
        turn = "player";
        count = 1;
        
    };
    
        // init the .tiles listener
    this.initTiles = function(){
        
        tiles = $(".tiles");
        
        $(tiles).on('click', function(){
            var id = parseInt(this.id.match(/[1-9]/));
            playerMove(id);
            id = null;
        });
    }
    
    // init mouse listeners
    
    this.initMouseListeners = function(){
        $(tiles).mousedown(function(){
            var id = this.id;
            playerMouseDown('#' + id);
        });
        
        $(tiles).mouseup(function(){
            var id = this.id;
            if(data[parseInt(id.match(/[1-9]/) - 1)]){
                playerBadClick('#' + id);
            } else {
                playerMouseUp('#' + id);
            }
        });
    }
    
    } // gameBuilder
    
    // ai constructor ====================================

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
    
    this.getOppSeed = function(){
        return oppSeed;
    }
    
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
    
    // modal constructor ====================================    
    // modal vars
    var gameModal = $("#gameModal"), 
    gameModalTitle = $("#gameModalTitle"),
    gameModalFooter = $("#gameModalFooter"),
    gameModalContent = $("#gameModalContent");
 
    
    var GameModalBuilder = function(type, winner){
        
        // setup game
        if(type == "setup"){
            gameModalTitle.html("Tic-Tac-Toe");
            gameModalFooter.html('<button type="button" class="btn btn-default" id="setupCloseButton" data-dismiss="modal">Close</button><button type="button" class="btn btn-primary" id="play">Play!</button>');
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
               // aiGlobal.turn = aiGlobal.turn == false ? true : false;
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
                //gameModal.modal('hide');
                newSession = false;
                initGame(player, turn); 
                gameModal.modal('toggle');
            }); // play
            
            // modal close (x)
        
        $("#modalX").on('click', function(){
            loadDefaultContent();
        });
            
            $("#setupCloseButton").on('click', function(){
            loadDefaultContent();
        });
            
            
        
        
    }  else if(type == "gameOver") {
        gameModalTitle.html("Tic-Tac-Toe");
        gameModalFooter.html('<button type="button" class="btn btn-danger" id="newSessionButton">Rest Session</button><button type="button" class="btn btn-primary" id="newGameButton">New Game</button>');
        
        var message;
        console.log("modal winner var: " + winner);
        if(winner == "tie"){
            message = "Well it apears we have matched wit!"
            if(drawScore > 1){
                message+= " We've tied " + drawScore + " times.";
            } else if (drawScore > 0) {
                message+= " We've tied " + drawScore + " time. ";
            } else {
                message += " Our first tie.";
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
            initGame(newGame.getSeed(), newGame.getTurn());
            gameModal.modal('toggle');
        });
        
        // modal close (x)
        
        $("#modalX").on('click', function(){
            initGame(newGame.getSeed(), newGame.getTurn());
        });
        
        //gameModal.modal('toggle');
    } 
 
    }; // gameModalBuilder


    

    
    // ======================================================
    
    // game play
    
    // init the game (reset)
        function initGame(player, turn){
            newGame = new GameBuilder();
            gameView.html(newGame.generateBoard());
            newGame.setSeed(player);
            tileSize();
            newGame.setOppSeed();
            newGame.setTurn(turn);
            newGame.initTiles();
            newGame.initMouseListeners();
            ai = new AiPlayer(newGame.getData());
            ai.setSeed(newGame.getSeed());
            
            if( newGame.getTurn() == "ai"){
                newGame.aiInitPlay(newGame.getOppSeed());

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
  
    
    // reset the session
    
    function resetSession(){
    var resetConfirm = confirm("Do you want to Start Over?");
    if(resetConfirm){
        resetGameBoard();
        updateScore("reset");
        //aiGlobal.turn = false;
        gameModal.modal('toggle');
        setTimeout(function(){
             setupModal();
        }, 500);
        
    }
    
    newSession = true;
    // else, return to the modal
}
    
    // launch setup modal
    function setupModal(){
        var modal = new GameModalBuilder("setup");
        gameModal.modal('toggle');
    }
    // launch gamr over modal
    
    function gameOverModal(winner){
        var modal = new GameModalBuilder("gameOver", winner);
        gameModal.modal('toggle');
    }
    
    // player makes a move
    
         function playerMove(tile){
        if(newGame.getTurn() == "player"){
            data = newGame.getData();
            var seed = newGame.getSeed();
            if(data[tile - 1 ]){
            // alert the user that the tile is taken
            } else{
                //data[tile - 1 ] = seed;
                newGame.updateData(tile - 1, seed);
                data = newGame.getData();
               // console.log(data);
                addPieceToTile(tile, seed);
                newGame.updateCount();
                //play the added tile success animation
                if(hasWon(data, seed)){
                    return gameOver("player");
                } else {
                    //console.log("player moved");
                    newGame.changeTurn();
                    aiMove();
                }
            }
        } else {
            // alert the user that it's not their turn
            console.log("not turn");
        }
    }; // playerMove
    
    // ai makes a move
    
    function aiMove(){
        var move = ai.move();
        var aiPiece = newGame.getOppSeed();
        
        var timeOutdelay = Math.floor(Math.random() * 750); 
        
        setTimeout(function(){
            aiMoveAnimation('#tile-' + (move + 1));
            addPieceToTile(move + 1, aiPiece );
            // ai move animation
        newGame.updateData(move, aiPiece);
        if(hasWon(newGame.getData(), aiPiece)){
            return gameOver("ai");
        }
        newGame.updateCount();
        newGame.changeTurn();
        }, timeOutdelay);
        
        
    }
        
        
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
        return gameOverModal("tie");
    } // tie
    
// player win
    function playerWin(){
        updateScore("player")
        return gameOverModal("player");
    } // player win
    
// ai win    
    function aiWin(){
        updateScore("ai")
        return gameOverModal("ai");
    } // ai win
     
    
    // update score

function udateScoreView(){
    aiScoreView.html(aiScore);
    playerScoreView.html(playerScore);
    drawScoreView.html(drawScore);
}


function updateScore(winner){
    if(winner == "reset"){
        console.log("reset scores");
        playerScore = aiScore = drawScore = 0;
    } else if(winner == "tie"){
        drawScore++;
    } else if(winner == "ai"){
        aiScore++;
    } else if (winner = "player") {
        playerScore++;
    }
    
    return udateScoreView();
    
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
    
    
    // init the starting modal
    if(newSession){
        setupModal();
    } 
    
    
    //gameView content if the game is not init by the player
    
    function loadDefaultContent(){
        var defaultMessage = '<div class="jumbotron text-center col-xs-12 col-md-10 col-md-offset-1">';
    defaultMessage += '<h1><small>welcome</small><br>Tic-Tac-Toe </h1>';
    defaultMessage += '<div class="col-xs-12 col-md-6 col-md-offset-3 defaultButtons">';
    defaultMessage += '<p>Start a new game or visit the GutHub repo</p>';
    defaultMessage += '<button type="button" class="btn btn-primary btn-block" id="defaultStartButton"> Start New Game </button>';
    defaultMessage += '<a href="https://github.com/MikeAlbo/tic-tac-toe" target="_blank" class="btn btn-primary btn-block" id="defaultGithubButton"> Visit Github Repo </a>';
    defaultMessage += '</div>' // default buttons
    defaultMessage += '</div>'; // end jumbtron
        
         $(gameView).html(defaultMessage);
        
        // button listeners
        
        $("#defaultStartButton").on("click", function(){
            setupModal();
        });
        
        
    } // load default content
    
   
    
    
    
}); // doc ready