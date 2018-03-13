
//=========================================================
//====================Variables============================
//=========================================================

var characterChosen = false;
var opponentChosen = false;

var characterList = {
    yoda: {
        name: "Yoda",
        id: "#yoda-card",
        health: 180,
        userBasePower: 8,
        opponentPower: 25,
        defeated: false,
    }, 
    obiWanKenobi: {
        name: "Obi-Wan Kenobi",
        id: "#obi-wan-card",
        health: 120,
        userBasePower: 5,
        opponentPower: 20,
        defeated: false,
    }, 
    maceWindu: {
        name: "Mace Win mndu",
        id: "#mace-windu-card",
        health: 150,
        userBasePower: 3,
        opponentPower: 15,
        defeated: false,
    }, 
}

//var userCharacter;
var opponentCharacter;
var userCharacter;
var attackIntesity = 1;
var stopGame = false;

//=========================================================
//====================Game Play============================
//=========================================================


//==========Choose Character and Opponent==================
$(".character-card").on("click", function(){
    
    if(characterChosen == false){
        userCharacter = characterList[$(this).attr("value")];
        console.log("you have chosen " + userCharacter.name + " as your character");
        $(this).detach().appendTo($("#user-character-field"));
        characterChosen = true;
    }else if(opponentChosen == false){
        
        opponentCharacter = characterList[$(this).attr("value")];
        
        if(opponentCharacter.name == userCharacter.name ){
            console.log("can't fight yourself");
            return;
        }
        if(opponentCharacter.defeated){
            console.log("this player is already defeated")
            return;
        }
        console.log("you have chosen " + opponentCharacter.name + " as your opponent");
        $(this).detach().appendTo($("#opponent-field"));
        opponentChosen = true;
        //setting stopgame to false to allow attack click/function below
        stopGame = false;
    }
    
});

//=====================Attack==============================
$("#attack-button").on("click", function(){

    if(stopGame){
        return;
    }

    if(!characterChosen||!opponentChosen){
        console.log("pick a user and opponent");
        return;
    }

    console.log("attack!")
    //decrease user health by oppponent power
    userCharacter.health -= opponentCharacter.opponentPower
    console.log("your health: " + userCharacter.health);
    $(userCharacter.id+">.card-body>.health-display").html(userCharacter.health);
    $("#damage-sustained").html(opponentCharacter.opponentPower);
    
    //multiply user power by intensity and subtract from opponent health
    var damageInflicted = userCharacter.userBasePower * attackIntesity;
    opponentCharacter.health -= damageInflicted;
    console.log("opponents health: " + opponentCharacter.health);
    $(opponentCharacter.id+">.card-body>.health-display").html(opponentCharacter.health);
    $("#damage-inflicted").html(damageInflicted);
    attackIntesity++;    

    if(userCharacter.health <= 0){
        $("#message-text").html("You Lose!");
        stopGame = true;
        showEndGameScreen("You Lose!", "you have lost this battle. Click ok to continue and try again or exit the browser to walk away in shame.")
    }else if(opponentCharacter.health <= 0){
        $("#message-text").html("You Win!");
        stopGame = true;
        $(opponentCharacter.id).detach().appendTo($("#defeated-field"));
        //set defeated value for opponent to true
        opponentCharacter.defeated = true;
        // setting opponent chosen flag to false to enable selection click/function above
        opponentChosen = false;
        showEndGameScreen("you Win!", "nice job, you won this battle. Click ok to continue and choose your next opponent!");
    }

});

//closing the game end screen
$("#game-end-ok-btn").on("click", function(){
    $(".game-end-card").hide();
    //reset game....
});

function showEndGameScreen(mainMessage, subMessage) {
    $("#game-end-title").html(mainMessage);
    $("#game-end-text").html(subMessage);
    $(".game-end-card").show();
}

