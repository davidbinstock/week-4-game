
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
    }, 
    obiWanKenobi: {
        name: "Obi-Wan Kenobi",
        id: "#obi-wan-card",
        health: 120,
        userBasePower: 5,
        opponentPower: 20,
    }, 
    maceWindu: {
        name: "Mace Win mndu",
        id: "#mace-windu-card",
        health: 150,
        userBasePower: 3,
        opponentPower: 15,
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
        console.log("you have chosen " + opponentCharacter.name + " as your opponent");
        $(this).detach().appendTo($("#opponent-field"));
        opponentChosen = true;
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
    }else if(opponentCharacter.health <= 0){
        $("#message-text").html("You Win!");
        stopGame = true;
    }

});


