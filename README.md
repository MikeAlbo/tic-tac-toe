# Tic Tac Toe
ReadMe file

## things to consider

1. The game should be made into a factory function?? i.e. new Game();
2. whena  new game is created, it should automatically reset the data and the ui


## gameLogic

### global vars
1. globalPlayer
    a. stores the player's piece throughout the session
    b. can be updated game by game by the player
2. globalTurn
    a. stores starting turn of the game throughout the session
    b. can be updated game by game by the player
3. newGame
    a. stores the current game being played
    b. is init empty until the first game is created
    c. is re initalized for each new game
    

### jQuery selections
1. gameView == #gameView
    a. the main view of the game
    
### GameBuilder
    The main constructor for the game
    
#### Local vars
1. data
    a. initally an empty array
    b. where the game pieces are stored
2. turn
    a. stores the current turn
        i. 'player' or 'ai'
3. seed
    a. stores the players current piece
        i. 'x' or 'o'
4. oppSeed
    a. stores the ai piece
5. count
    a. init to 0
    b. tracks play count
    
#### tileModel
a private function that generates the tile div and assigns the id

#### tileSize
A public function that captures the width of #tile-1. The function takes that dimension and applies it to the .tiles class, making the tiles square. 

#### generateBoard
A public function that creates an empty string then += a new tileModel, passing it the index for the tile's id.

#### setSeed
A public function that takes an optional argument. If argument, set the seed to that argument. Else, set seed to globalPlayer or 'x'.

#### getSeed
A public function that returns the seed.

#### setOppSeed
A public function that sets the oppSeed var.

#### getOppSeed
A public function that returns the oppSeed var.

#### setTurn
A public function that takes an optional argument. If argument, set the turn var to the argument, else 'player'.

#### changeTurn
A public function that updates to turn var depending on the current  value. 

#### getTurn
A public function that returns the turn var.

#### getData
A public function that returns the data var.

#### clearData
A pub function that resets the data var back to an empty array.

#### updateData
A public var that takes 2 arguments, index and value. The function applies the value to the data var at the index provided.

#### updateCount
A private function that takes the optional argument, reset. If reset, than resets the count to 0. Else, updates the count. If the count reaches 9, calls checkWin on "player", "ai", and "tie".

#### updateGameBoard
A private function that takes 2 args, tile, piece. Using jQuery, the function applies the piece to the tile via the tile's id. 

#### clearGameboard
A private function that resets the game board via a for loop, clearing the jQuery .html value.

#### playerMove

#### aiMove

#### aiInitPlay

#### gameOver

#### tie

#### playerWin

#### aiWin

### Modals for game

#### jQuery selectors
1. gameModal
2. gameModalTitle
3. gameModalFooter
4. gameModalContent

#### GameModalBuilder
...

##### jQuery Selectors

##### changeUser


