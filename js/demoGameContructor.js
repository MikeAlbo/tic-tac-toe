
// global vars
var globalPlayer,
    gloabalTurn, 
    newGame,
    gameView = $("#gameView");

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
    
    // get tile size
    this.tileSize = function(){
        // get the average width of a tile
        var width = $("#tile-1").width();
        $(".tiles").css("height", width);
    }; // get tile size
    
    
    // generate the game board
    this.generateBoard = function(){
        var board = '';
        for(var i = 1; i < 10; i++){
           // board += '<div class="col-xs-4 tiles" id= "' + i + '"></div> ';
            board += tile(i);
        }   
        
        board += "</div>";
        
        
        this.tileSize();
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
                count = 0;
            }
            count++;

            if(count == 9){
                // checkWin("player");
                // checkWin("ai");
                // gameOver("tie");     
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
    
     this.playerMove = function(tile){
        if(turn == "player"){
            if(data[tile - 1 ]){
            // alert the user that the tile is taken
            } else{
                data[tile - 1 ] = seed;
                console.log(data);
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
}   ;
    
    
// game over functions
    
// gameOver
    
// tie 
    
// player win
    
// ai win    

}; // game builder

// == reset the session === \\


// ====== new game ===== \\


// rest the game
function resetGame(){
    newGame = new GameBuilder();
    gameView.html(newGame.generateBoard());
    
    // check to see if ai starts
    if(gloabalTurn == "ai"){
        newGame.aiInitPlay(globalPlayer == 'x' ? 'o' : 'x');
        }
    
}

//auto resize of the tiles
$(window).resize(function(){
        if(newGame){
            newGame.tileSize();
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
                setupSmallPeice = $("#setupSmallPeice");
            
            
            function changeUser(){
                if(player == 'x') {
                    setupUser.html("'x', and it's your turn.");
                    setupSmall.html("Rahter go second?");
                } else {
                    setupUser.html("'o', and you will go second.");
                    setupSmall.html("Rather go first?");
                }
            } // change User
            
            // init setupUser and SetupSmall
                changeUser();
            
                setupSmall.on("click", function(){
                    player = player == 'x' ? 'o' : 'x';
                    changeUser();
                    changeTurn();
                });
            
           
            // play button
            $("#play").on('click', function(){
                gameModal.modal('hide');
                resetGame();
                
                    // displaying the payers peice on the tile
                    initGame();  
            }); // play
        
        gameModal.modal('toggle');
    } //setupSessionModal
            
        } // setup
    }; // gameModalBuilder
    
        