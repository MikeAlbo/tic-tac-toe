$(document).ready(function(){

// global vars    
var gameView = $("#gameView"), user = "X", computer = "O", turn = "your", newSession = true, viewEdit = false, count = 0;
    

//score output
var userScore = $("#yourScore");
var computerScore = $("#computerScore");
var drawScore = $("#drawScore");
    


//gamesetup
    
    if(newSession){
        $("#gameSetup").modal("show");
    }
    
    var gameSetuph2 = $("#gameSetuph2");
    var gameSetupTurn = $("#gameSetupTurn");
    var gameSetupPiece = $("#gameSetupPiece");
    
    function updateView(){
        gameSetuph2.html("It's " + turn + " turn, and you are &quot;" + user + "&quot;") ;
        gameSetupTurn.html(turn == "your" ? "computer" : "yours");
        gameSetupPiece.html(user == "X" ? "O" : "X");
    }
    
    updateView();
    
    function changeTurn(){
        turn = turn == "your" ? "computer" : "your";
        //alert(turn);
    }
    
    function changePiece(){
        user = user == "X" ? "O" : "X";
        computer = computer == "X" ? "O" : "X";
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
        t += 'id="tile-'+id+'" ';
        //t += 'onclick="clickedTile("tile-'+id+'")"';
        t += '></div>';
        
        return t;
        
    }
    
    
    // generate board
    
    function generateBoard(){
        
    
        
        var board = '';
        for(var i = 1; i < 10; i++){
           // board += '<div class="col-xs-4 tiles" id= "tile-' + i + '"></div> ';
            board += tile(i);
        }   
        
        board += "</div>";
        
        gameView.html(board);
        tileSize();
    }
    
    generateBoard();   // move to game setup
    
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
    
    
    // displaying the payers peice on the tile
    
    // onclick function
    $(".tiles").on('click', function(){
       var id = this.id;
        addPieceToTile(id, "X");
    });
    
    // add players peice to tile
    
    function addPieceToTile(tile, peice){
        $("#" + tile).html('<p class="tileText">' + peice + '</p>');
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
    
    
    
});  // doc ready


