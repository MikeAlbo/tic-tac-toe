$(document).ready(function(){
    
    var player = { peice: "x" };
    
    var gameTurn = 1;
    
    //container gameView div
    var gameView = $("#gameView");
    
    //function to init the start sequence upon "doc.ready"
    initStartupScreen();
    
    //function to init the screen with title and start message
    
    function initStartupScreen(){
        gameView.html('<div id="openSeqContainer" class="text-center jumbotron"></div>');
        
        var container = $("#openSeqContainer");
        container.html('<div id="titleContainer"><div>');
        
        var titleContainer = $("#titleContainer");

        var title = '<h1>Tic Tac Toe<br><small>you against the machine...</small></h1>';
        var button = '<button class="btn btn-lg btn-primary" id="startGameButton">Start</button>';
        titleContainer.html(title + button);
        
        startGameSetup(container, titleContainer);
   
    }
    
    //event function to listen for "start" (make can make a general event listener with params)
    
    function startGameSetup(container, titleContainer){
        $("#startGameButton").on("click", function(){
            clearScreen(container, titleContainer);
            selectGamePeice(container);    
        });
        
        function clearScreen(container, titleContainer){  // mod to animation
            container.html(''); // clear after animation
            titleContainer.html(''); // change to animate out
        }
        
          // function to ask user to select player
        
        function selectGamePeice(container){
            
            container.html('<div id="gamePeiceContainer"></div>');
            var gamePeiceContainer = $("#gamePeiceContainer");
            var question = '<h3>Select your game peice.</h3>';
            var button = '<div class="btn-group" role="group" aria-label="..."><button type="button" class="btn btn-default" id="selectX"> &nbsp; X &nbsp; </button><button type="button" class="btn btn-default" id="selectO">&nbsp; O &nbsp;</button></div>';
            
            gamePeiceContainer.html(question + button);
            
            $("#selectX").on("click", function(){player.peice = "x"; selectTurn(container, gamePeiceContainer);});
            $("#selectO").on("click", function(){player.peice = "o"; selectTurn(container, gamePeiceContainer);});
            
            
            
        } // select game peice
        
        
           //function to ask user if they'd like to go first
        
        function selectTurn(container, gamePeiceContainer){
            
            clearGamePeiceScreen(container, gamePeiceContainer);
            askForTurn(container);
            
            //clear gamePeiceContainer
            function clearGamePeiceScreen(container, gamePeiceContainer, turnContainer){ // animation
                gamePeiceContainer.html(''); // animate out
                
                container.html(''); //clear after animation
                
            } //clear
            
            //ask for turn
            function askForTurn(container){
                
                container.html('<div id="turnContainer"></div>');
                var turnContainer = $("#turnContainer");
                
                var title = '<h3>Who Should Start?</h3>';
                var button = '<div class="btn-group" role="group" aria-label="..."><button type="button" class="btn btn-default" id="selectMe"> &nbsp; Me &nbsp; </button><button type="button" class="btn btn-default" id="selectComputer">&nbsp; Computer &nbsp;</button></div>';
                
                turnContainer.html(title + button);
                
                $("#selectMe").on("click", function(){gameTurn = 1; initGame();});
                $("#selectComputer").on("click", function(){gameTurn = 0; initGame();});
                
                function initGame(){
                    clearGamePeiceScreen(container,gamePeiceContainer, turnContainer);
                    buildGame(container);
                }
                
                
            } // ask for turn
            
        } // select turn
        
    } // start game setup
    
    //function to build gameboard
    
    function buildGame(container){
        var width = 3;
        var viewWidth = container.width();
        var gameBoard = gameBoardConstructor(container);
        gameBoard.html(addTiles(width,gameBoard, tileConstructor));
        gameBoard.css(gameBoardCssContructor(width, viewWidth));
        $(".tile").css(tileCssConstructor(width, viewWidth));
    }
    
    
    function gameBoardConstructor(container){
        container.html('<div id="gameBoard"></div>');
        
        return $("#gameBoard");
    }
    
    //function to build tile
    
    function tileConstructor(tileNumber){
        
            var tile = '<div class="tile" id="tile' + tileNumber + '"></div>';
            return tile;
    }
    
    //function to add tiles to gameboard
    
    function addTiles(boardWidth, gameBoard, tileConstructor){
        var tiles = '';
        for(var i = 1; i <= boardWidth * boardWidth; i++ ) {
                tiles += tileConstructor(i);
        }
        return tiles;
    }
    
    //css for gameboard
    
    function gameBoardCssContructor(width, viewWidth){
        
        var w = (viewWidth / (width + 2));
        var boardWidth = w * width ;
        var boardCSS = {"left": w +'px', "height": boardWidth +'px', "width" : boardWidth +'px'}; 
        return boardCSS;
    }
    
    // css for tiles
    
    function tileCssConstructor(width, viewWidth){
        
        var w = (viewWidth / (width + 2));

        var tileCSS = {"width" : w + "px", "height" : w + "px", "background-color" : "rgba(100,150,250,.3)"};
        return tileCSS;
    }
    
    
    //setup event listeners
    
    //function to call gameboard setup
   
    
    
}); // document ready




