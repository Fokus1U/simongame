

var buttonColors = ["red", "blue", "green", "yellow"]
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;





$(document).keypress(function() {
    if (!started) {
  
      
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });



$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
  
   //pushed die Usereingabe in einen Array 
    userClickedPattern.push(userChosenColour);
  
    
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
  });




function nextSequence() {

    userClickedPattern = [];

// erhöht den Level, jedes mal, wenn nextSequence ausgelöst wird
  level++;

 
  $("#level-title").text("Level " + level);

    var randomNumber = Math.random();
    randomNumber = randomNumber*4;
    randomNumber = Math.floor(randomNumber);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+ randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColour);
    animatePress(randomChosenColour);

    
}

function playSound(name){
    var audio = new Audio ("./sounds/"+name+".mp3");
    audio.play();
}

//1. Create a new function called animatePress(), it should take a single input parameter called currentColour.
function animatePress(currentColor) {

    //2. Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
    $("#" + currentColor).addClass("pressed");
  
    //3. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }

  function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

        var audio = new Audio ("./sounds/wrong.mp3")
        audio.play();
        $("body").addClass("game-over");
        
        setTimeout(function () {
            $("body").removeClass("game-over");
        },200);
      console.log("wrong");
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();

    }

}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}


