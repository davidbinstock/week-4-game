
//=======================================================================================
// Global Variables
//=======================================================================================
var valueTally = 0;
var targetNumber;
var wins = 0;
var losses = 0;
var stopGame = false;
var instructionsHidden = false;
var collections = {
    list: ["peanuts","loonyToons", "scoobyDoo","flintstones", "jetsons", "spongebob", "heyArnold" ],
    peanuts: ["peanuts_charlie_brown.png", "peanuts_franklin.png", "peanuts_linus.gif", "peanuts_lucy.gif", "peanuts_marcie.png", "peanuts_pigpen.png", "peanuts_sally.png", "peanuts_schroeder.png", "peanuts_snoopy.png", "peanuts_woodstock.png", "peanuts_peppermint_patty.png" ],
    loonyToons: ["loony_bugs_bunny.png", "loony_daffy_duck.png", "loony_elmer_fudd.png", "loony_foghorn_leghorn.png", "loony_marvin_the_martian.png", "loony_porky_pig.png", "loony_road_runner.png", "loony_sylvester_cat.png", "loony_tweety.png", "loony_wile_e_cayote.gif", "loony_yosemite_sam.png"],
    scoobyDoo:["scooby_daphne.png","scooby_doo.png","scooby_fred.png", "scooby_shaggy.png", "scooby_velma.png"],
    flintstones: ["flintstone_bam.gif", "flintstone_barney.png", "flintstone_betty.png", "flintstone_dino.gif", "flintstone_fred.png", "flintstone_pebble.png", "flintstone_wilma.png"],
    jetsons: ["jetsons_astro.png", "jetsons_elroy.png", "jetsons_george.png", "jetsons_judy.png", "jetsons_jane.gif", "jetsons_rosie.png"],
    spongebob: ["spongebob sandy.png", "spongebob_larry.png", "spongebob_mrkrabs.png", "spongebob_patrick.png", "spongebob_plankton.png", "spongebob_spongebob.png", "spongebob_squidward.png"],
    heyArnold: ["arnold_arnold.png", "arnold_gerald.png", "arnold_grandma.png", "arnold_grandpa.png", "arnold_helga.png", "arnold_pheobe.png" ]
};
var collectionIndex = 0;


//=======================================================================================
// Initialize Game
//=======================================================================================

newGame();
newItems();
$("#wins-display").html(wins) 
$("#losses-display").html(losses) 

//=======================================================================================
// Game-play
//=======================================================================================

$(".crystal").on("click", function(){
    if(stopGame == true){
        return false;
    }
    
    var currentCrystalValue = parseInt($(this).val());
    console.log("crystal value: ", currentCrystalValue);
    valueTally = valueTally + currentCrystalValue;
    console.log("value tally: ", valueTally);
    $("#value-tally").html(valueTally);

    if(valueTally == targetNumber){
        console.log("you win")
        $("#message-text").html("You Win!")
        wins++;
        console.log("your win total: ", wins)
        $("#wins-display").html(wins) 
        stopGame = true;
        newGame();
        newItems();
    }else if(valueTally > targetNumber){
        console.log("you lose")
        $("#message-text").html("You Lose!")
        losses++;
        console.log("your loss total: ", losses)
        $("#losses-display").html(losses) 
        stopGame = true;
        newGame();
        newItems();
    }

});

//=======================================================================================
// Functions
//=======================================================================================

function newGame(){
    console.log("---newGame function invoked---")
    stopGame = false;
    valueTally = 0;
    $("#value-tally").html(valueTally);
    newTargetNumber();
    newCrystalValues();
    console.log("---End of newGame function---")
}


function newTargetNumber(){
    console.log("---newTargetNumber function invoked---")
    targetNumber = Math.floor(Math.random()*102)+19;
    $("#target-number").html(targetNumber);
    console.log("new target number: ", targetNumber)
    console.log("---End of newTargetNumber function---")
}

function newCrystalValues(){
    console.log("---newCrystalValues function invoked---")
    for(var i=1; i < 5; i++){
        console.log("crysal-"+i+" value before: " + $("#crystal-"+i).val());
        var newNumber = Math.floor(Math.random()*12)+1;
        $("#crystal-"+i).val(newNumber);
        console.log("crystal-"+i+" value after: " + $("#crystal-"+i).val())
    }
    console.log("---End of newCrystalValues function---")
}

//=======================================================================================
// hiding and unhiding the instructions
//=======================================================================================
$("#instruction-hide-btn").on("click", function(){
    console.log("hide instruction button was clicked")
    //change state of flag boolean
    instructionsHidden = !instructionsHidden;
    if(instructionsHidden){
        $(".hide-instruction-toggle").hide();
        $("#instruction-hide-btn").html("Wait...what were the instructions again...?");
    }else{
        $(".hide-instruction-toggle").show();
        $("#instruction-hide-btn").html("Ok, I got it. Hide the stupid instructions");
        
    }

})
//=======================================================================================
// Changing the item pictures
//=======================================================================================

//generate four (different) random numbers, between 0 and (1-# of items in array)

function fourRandomNumbers(arrayLength){
    console.log("---fourRandomNumbers function invoked---")
    var numberHolder = [];
    for(var i=0 ; i < 4 ; i++){
        var newNumber = Math.floor(Math.random()*arrayLength);
        if(numberHolder.includes(newNumber)){
            i--;
        }else{
            numberHolder.push(newNumber);
        }  
    }
    return numberHolder;
    console.log("---End of fourRandomNumbers function---")
}

// go to the next collection and choose four random items from that array
function newItems(){
    console.log("---newItems function invoked---")
    //if we're at the end of the list of collections, start over
    if(collectionIndex >= collections.list.length){
        collectionIndex = 0;
    }
    
    //access next collection list
    var newCollectionName = collections.list[collectionIndex];
    var newCollectionArray = collections[newCollectionName];
    console.log("New Collection Chosen:")
    console.log(newCollectionArray)
    //now retrieve 4 random items from collection
    var randomNumbers = fourRandomNumbers(newCollectionArray.length);
    console.log("New Items:")
    for(var i=0; i<randomNumbers.length; i++){
        var newItem = newCollectionArray[randomNumbers[i]];
        console.log(newItem);
        $("#crystal-"+(i+1)+" img").attr("src", "./assets/images/" + newItem);
    }
    collectionIndex++;
    console.log("---End of newItem function---")
}
