// animations


// stagger tile loading

//function loadStaggerInAnimation(){
//    var tiles  = $('.tiles');
//
//    TweenLite.to(tiles, 1 {opacity: 1});
//}
// clicked on taken tile

function playerBadClick(tile){
    TweenLite.to(tile, ".02", {boxShadow: "0"});
    TweenLite.to(tile, ".05", {backgroundColor: "rgba(250,50,75,.3)"});
    TweenLite.to(tile, ".3", {backgroundColor: "transparent",  delay: ".1"});
}

// player good click

// ai makes move

function aiMoveAnimation(tile){
    TweenLite.to(tile, ".05", {backgroundColor: "rgba(50,75,250,.3)"});
    TweenLite.to(tile, ".3", {backgroundColor: "transparent",  delay: ".1"});
}

// mouse down event

function playerMouseDown(tile){
    TweenLite.to(tile, ".02", {boxShadow: "inset 0 0 10px rgba(50,50,50,.5)"});
}

// mouse up event

function playerMouseUp(tile){
    TweenLite.to(tile, ".02", {boxShadow: "0"});
    TweenLite.to(tile, ".05", {backgroundColor: "rgba(50,250,75,.3)"});
    TweenLite.to(tile, ".3", {backgroundColor: "transparent",  delay: ".1"});
}