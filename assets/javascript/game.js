var valueTally = 0;
var targetNumber;
var wins = 0;
var losses = 0;
var stopGame = false;

//-------------------------------

newCrystalValues();
newTargetNumber();
$("#target-number").text(targetNumber)

$(".crystal").on("click", function(){
    if(stopGame == true){
        return false;
    }
    
    var currentCrystalValue = parseInt($(this).val());
    console.log("crystal value: ", currentCrystalValue);
    valueTally = valueTally + currentCrystalValue;
    console.log("value tally: ", valueTally);
    $("#value-tally").text(valueTally);

    if(valueTally == targetNumber){
        console.log("you win")
        wins++;
        stopGame = true;
        newGame();
    }else if(valueTally > targetNumber){
        console.log("you lose")
        losses--;
        stopGame = true;
        newGame();
    }

});

function newGame(){
    stopGame = false;
    valueTally = 0;
    $("#value-tally").text(valueTally);
    newTargetNumber();
    newCrystalValues();
}


function newTargetNumber(){
    targetNumber = Math.floor(Math.random()*102)+19;
    $("#target-number").text(targetNumber);
}

function newCrystalValues(){
    for(var i=1; i < 5; i++){
        console.log("before: " + $("#crystal-"+i).val());
        var newNumber = Math.floor(Math.random()*12)+1;
        $("#crystal-"+i).val(newNumber);
        console.log("after: " + $("#crystal-"+i).val())
    }
}

